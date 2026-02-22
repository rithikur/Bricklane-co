import { motion } from 'framer-motion';
import AnimatedCounter from './common/AnimatedCounter';
import RevealText from './common/RevealText';

const stats = [
    { value: '10k+', label: 'Premium Listings', desc: 'Verified properties across India' },
    { value: '2k+', label: 'Monthly Sales', desc: 'Transactions processed monthly' },
    { value: '98%', label: 'Satisfaction', desc: 'Avg. rating from our clients' },
    { value: '15+', label: 'Years Experience', desc: 'In the real estate market' },
];

const StatsSection = () => {
    return (
        <section className="py-24 md:py-32 bg-primary-black dark:bg-dark-bg text-white overflow-hidden relative transition-colors">
            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative">
                {/* Section label */}
                <div className="mb-14 md:mb-20 text-center">
                    <RevealText as="p" className="text-neutral-grey dark:text-gold text-xs font-bold tracking-widest uppercase mb-3">
                        By The Numbers
                    </RevealText>
                    <RevealText as="h2" className="text-3xl md:text-5xl font-bold text-white" delay={0.1}>
                        Trusted by Thousands
                    </RevealText>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 dark:bg-dark-border rounded-std overflow-hidden">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="bg-primary-black dark:bg-dark-surface p-8 md:p-12 text-center flex flex-col items-center justify-center gap-2 group hover:bg-white/5 dark:hover:bg-dark-border transition-colors duration-300"
                        >
                            <AnimatedCounter
                                value={stat.value}
                                className="text-5xl md:text-7xl font-bold text-white dark:text-gold tabular-nums"
                            />
                            <p className="text-white font-bold text-base md:text-lg mt-1">{stat.label}</p>
                            <p className="text-neutral-grey dark:text-neutral-grey/60 text-sm hidden md:block">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
