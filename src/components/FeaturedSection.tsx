import { ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const properties = [
    { id: 1, price: '4.5 Cr', address: 'Worli Sea Face, Mumbai', rooms: 3, baths: 3, area: 1850, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=2070' },
    { id: 2, price: '2.1 Cr', address: 'Juhu Tara Road, Mumbai', rooms: 2, baths: 2, area: 1200, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2053' },
    { id: 3, price: '8.5 Cr', address: 'Bandra West, Mumbai', rooms: 5, baths: 5, area: 4500, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070' },
];

const FeaturedSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary-black mb-4">Featured Properties</h2>
                        <p className="text-neutral-grey text-base md:text-lg max-w-xl">Explore our hand-picked selection of the most exclusive properties in the city.</p>
                    </div>
                    <Link to="/search" className="hidden md:flex items-center gap-2 font-bold text-primary-black border-b-2 border-primary-black pb-1 hover:text-neutral-grey hover:border-neutral-grey transition-colors">
                        View all properties <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link to={`/property/${p.id}`}>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-std mb-4 bg-light-grey">
                                    <img src={p.image} alt={p.address} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-primary-black hover:bg-primary-black hover:text-white transition-colors shadow-sm">
                                        <Heart size={20} />
                                    </button>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-primary-black mb-1 group-hover:underline decoration-2 underline-offset-4">{p.address}</h3>
                                        <p className="text-neutral-grey font-medium">{p.rooms} Beds • {p.baths} Baths • {p.area} m²</p>
                                    </div>
                                    <span className="text-xl font-bold text-primary-black">₹{p.price}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 md:hidden flex justify-center">
                    <Link to="/search" className="flex items-center gap-2 font-bold text-primary-black border-b-2 border-primary-black pb-1">
                        View all properties <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
