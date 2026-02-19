import { useState } from 'react';
import { ArrowRight, Home, Key, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RevealText from './common/RevealText';

const services = [
    {
        id: 1,
        icon: <Home size={32} />,
        title: "Buy a Home",
        description: "Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.",
        link: "Browse homes",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070"
    },
    {
        id: 2,
        icon: <Key size={32} />,
        title: "Rent a Home",
        description: "We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
        link: "Find rentals",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2053"
    },
    {
        id: 3,
        icon: <Receipt size={32} />,
        title: "Sell a Home",
        description: "No matter what path you take to sell your home, we can help you navigate a successful sale.",
        link: "See your options",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2096"
    }
];

const ServicesSection = () => {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                    <div className="max-w-xl">
                        <span className="text-xs font-bold tracking-widest text-neutral-grey uppercase mb-2 block">Our Expertise</span>
                        <RevealText as="h2" className="text-4xl md:text-5xl font-bold text-primary-black mb-4">
                            Real Estate Made Simple.
                        </RevealText>
                        <RevealText as="p" className="text-neutral-grey text-lg leading-relaxed" delay={0.2}>
                            Navigate the market with confidence. Whether you're buying, selling, or renting, we provide the tools and guidance you need.
                        </RevealText>
                    </div>
                </div>

                {/* Interactive Expandable Cards */}
                <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px]">
                    {services.map((service) => {
                        const isActive = activeId === service.id;

                        return (
                            <motion.div
                                key={service.id}
                                onHoverStart={() => setActiveId(service.id)}
                                onHoverEnd={() => setActiveId(null)}
                                className={`relative overflow-hidden rounded-std cursor-pointer group transition-all duration-500 ease-out ${isActive ? 'md:flex-[2.5]' : 'md:flex-1'
                                    } flex flex-col min-h-[300px] md:min-h-0 border border-transparent`}
                            >
                                {/* Background Image (Always Visible) with Gradient Overlay for Text Readability */}
                                <div className={`absolute inset-0 bg-black/40 transition-colors duration-500 z-10 ${isActive ? 'bg-black/50' : 'group-hover:bg-black/50'}`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                                <motion.img
                                    src={service.image}
                                    alt={service.title}
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${isActive ? 'scale-105' : 'scale-100'}`}
                                />

                                {/* Content Layer */}
                                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 text-white">
                                            {service.title}
                                        </h3>

                                        <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-48' : 'max-h-0 md:max-h-24'}`}>
                                            <p className="text-base mb-6 leading-relaxed text-white/90">
                                                {service.description}
                                            </p>

                                            <Link
                                                to="/search"
                                                className="flex items-center gap-2 font-bold transition-colors text-white hover:text-white/80"
                                            >
                                                {service.link}
                                                <motion.span
                                                    animate={{ x: isActive ? 5 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ArrowRight size={18} />
                                                </motion.span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
