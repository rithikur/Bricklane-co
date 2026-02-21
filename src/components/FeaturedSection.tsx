import { useState, useCallback } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RevealText from './common/RevealText';
import { ToastContainer, useToast } from './common/Toast';

const properties = [
    { id: 1, price: '4.5 Cr', address: 'Worli Sea Face, Mumbai', rooms: 3, baths: 3, area: 1850, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=2070' },
    { id: 2, price: '2.1 Cr', address: 'Juhu Tara Road, Mumbai', rooms: 2, baths: 2, area: 1200, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2053' },
    { id: 3, price: '8.5 Cr', address: 'Bandra West, Mumbai', rooms: 5, baths: 5, area: 4500, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070' },
];

const getSaved = (): number[] => {
    try { return JSON.parse(localStorage.getItem('savedProperties') || '[]'); } catch { return []; }
};

const FeaturedSection = () => {
    const [saved, setSaved] = useState<number[]>(getSaved);
    const { toasts, dismiss, toast } = useToast();

    const toggleSave = useCallback((e: React.MouseEvent, id: number, address: string) => {
        e.preventDefault();
        e.stopPropagation();
        setSaved(prev => {
            const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
            localStorage.setItem('savedProperties', JSON.stringify(next));
            if (next.includes(id)) toast.success('Saved!', `${address} added to your saved homes.`);
            else toast.info('Removed', `${address} removed from saved homes.`);
            return next;
        });
    }, [toast]);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <RevealText as="h2" className="text-3xl md:text-5xl font-bold text-primary-black mb-4">
                            Featured Properties
                        </RevealText>
                        <RevealText as="p" className="text-neutral-grey text-base md:text-lg max-w-xl" delay={0.2}>
                            Explore our hand-picked selection of the most exclusive properties in the city.
                        </RevealText>
                    </div>
                    <Link to="/search" className="hidden md:flex items-center gap-2 font-bold text-primary-black border-b-2 border-primary-black pb-1 hover:text-neutral-grey hover:border-neutral-grey transition-colors shrink-0 ml-8">
                        View all <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="flex overflow-x-auto pb-12 -mx-4 px-4 gap-6 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible">
                    {properties.map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.6 }}
                            className="min-w-[85vw] md:min-w-0 snap-center group"
                        >
                            <Link to={`/property/${p.id}`}>
                                <div className="relative aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-[2rem] mb-6 bg-light-grey shadow-sm">
                                    <img src={p.image} alt={p.address} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                    <button
                                        onClick={(e) => toggleSave(e, p.id, p.address)}
                                        className={`absolute top-6 right-6 p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 active:scale-90 ${saved.includes(p.id) ? 'bg-white text-primary-black' : 'bg-white/20 text-white hover:bg-white hover:text-primary-black'}`}
                                        title={saved.includes(p.id) ? 'Remove from saved' : 'Save property'}
                                    >
                                        <Heart size={22} className={saved.includes(p.id) ? 'fill-current' : ''} />
                                    </button>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <span className="text-2xl font-bold text-white tracking-tight">₹{p.price}</span>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <h3 className="text-2xl md:text-xl font-bold text-primary-black mb-2 group-hover:text-neutral-grey transition-colors">{p.address}</h3>
                                    <p className="text-neutral-grey font-medium tracking-tight text-lg md:text-base">{p.rooms} Beds • {p.baths} Baths • {p.area} m²</p>
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
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </section>
    );
};

export default FeaturedSection;
