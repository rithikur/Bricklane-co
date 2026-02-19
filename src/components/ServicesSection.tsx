import { ArrowRight, Home, Key, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
    {
        icon: <Home size={32} />,
        title: "Buy a Home",
        description: "Find your dream home with our immersive photo experience and advanced filters.",
        link: "Browse homes"
    },
    {
        icon: <Key size={32} />,
        title: "Rent a Home",
        description: "We have the most comprehensive and up-to-date listings for you to rent.",
        link: "Find rentals"
    },
    {
        icon: <Receipt size={32} />,
        title: "Sell a Home",
        description: "Get the best price for your property with our expert valuation and marketing.",
        link: "See your options"
    },
];

const ServicesSection = () => {
    return (
        <section className="py-20 bg-light-grey/10">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold text-primary-black mb-4">Our Services</h2>
                    <p className="text-neutral-grey text-lg">Whether you are buying, selling, or renting, we can help you move forward.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-std border border-light-grey hover:border-primary-black hover:shadow-lg transition-all group"
                        >
                            <div className="w-16 h-16 bg-light-grey/20 rounded-full flex items-center justify-center mb-6 text-primary-black group-hover:bg-primary-black group-hover:text-white transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-primary-black mb-3">{service.title}</h3>
                            <p className="text-neutral-grey mb-6 leading-relaxed">{service.description}</p>
                            <Link to="/search" className="flex items-center gap-2 font-bold text-primary-black hover:text-neutral-grey transition-colors">
                                {service.link} <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
