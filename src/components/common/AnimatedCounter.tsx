import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
    value: string;       // e.g. "10k+", "98%", "15+"
    className?: string;
}

const AnimatedCounter = ({ value, className = '' }: AnimatedCounterProps) => {
    // Parse the number and suffix (k+, %, +)
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
    const target = match ? parseFloat(match[1]) : 0;
    const suffix = match ? match[2] : '';

    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    useEffect(() => {
        if (!isInView) return;

        const duration = 1800; // ms
        const steps = 60;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            // Ease out cubic
            const progress = 1 - Math.pow(1 - step / steps, 3);
            current = target * progress;

            if (step >= steps) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, target]);

    const displayValue = target % 1 !== 0 ? count.toFixed(1) : count.toString();

    return (
        <span ref={ref} className={className}>
            {displayValue}{suffix}
        </span>
    );
};

export default AnimatedCounter;
