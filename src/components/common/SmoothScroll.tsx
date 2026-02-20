import { useRef, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

interface SmoothScrollProps {
    children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
    const lenisRef = useRef<Lenis | null>(null);
    const location = useLocation();

    useEffect(() => {
        // Disable Lenis on pages with their own scroll management (like search or dashboard)
        if (location.pathname.includes('/search') || location.pathname.includes('/admin/dashboard')) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [location.pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
