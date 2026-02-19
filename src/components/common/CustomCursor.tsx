import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(true); // Default hidden until we know
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 22, stiffness: 320, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Check for pointer fine = mouse, coarse = touch
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        setIsTouchDevice(isTouch);
        if (isTouch) return;

        const onMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 10);
            mouseY.set(e.clientY - 10);
            setIsVisible(true);
        };

        const onMouseEnter = () => setIsHovered(true);
        const onMouseLeave = () => setIsHovered(false);

        const attachListeners = () => {
            document.querySelectorAll<HTMLElement>('a, button, input, [role="button"], .magnetic').forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        attachListeners();

        // Watch DOM for dynamic content
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
        };
    }, [mouseX, mouseY]);

    if (isTouchDevice) return null;

    return (
        <motion.div
            style={{ x: smoothX, y: smoothY }}
            animate={{
                scale: isHovered ? 3.5 : 1,
                opacity: isHovered ? 0.45 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`fixed top-0 left-0 w-5 h-5 bg-primary-black rounded-full pointer-events-none z-[999] mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        />
    );
};

export default CustomCursor;
