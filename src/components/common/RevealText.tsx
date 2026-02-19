import { useRef, type ReactNode } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface RevealTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const wordVariants: Variants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i: number) => ({
        y: '0%',
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 20,
            delay: i * 0.06,
        },
    }),
};

const RevealText = ({ children, className = '', delay = 0, as: Tag = 'div' }: RevealTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

    // Split text into words, handle non-string children gracefully
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ').filter(Boolean);

    if (!text) {
        // If children isn't a string, just do a simple fade+slide reveal
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <Tag ref={ref} className={`overflow-hidden ${className}`} style={{ display: 'block' }}>
            <span className="flex flex-wrap gap-x-[0.25em] gap-y-0">
                {words.map((word, i) => (
                    <span key={i} className="overflow-hidden inline-block" style={{ paddingBottom: '0.05em' }}>
                        <motion.span
                            custom={i + delay / 0.06}
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </span>
        </Tag>
    );
};

export default RevealText;
