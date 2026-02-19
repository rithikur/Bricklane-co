import React, { useRef, useState, useEffect, type ReactElement } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticProps {
    children: ReactElement;
    strength?: number;
}

const Magnetic = ({ children, strength = 0.3 }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(true);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        x.set((clientX - (left + width / 2)) * strength);
        y.set((clientY - (top + height / 2)) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // On touch devices simply render the child as-is
    if (isTouchDevice) return <>{children}</>;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className="inline-flex"
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
