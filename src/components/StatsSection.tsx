import { motion } from 'framer-motion';

const stats = [
    { value: '10k+', label: 'Premium Listings' },
    { value: '2k+', label: 'Monthly Sales' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '15+', label: 'Years Experience' },
];

const StatsSection = () => {
    return (
        <section className="py-20 bg-primary-black text-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</h3>
                            <p className="text-neutral-grey font-medium text-lg">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
