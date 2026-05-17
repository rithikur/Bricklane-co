import { useCallback } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RevealText from './common/RevealText';
import { ToastContainer, useToast } from './common/Toast';
import { useProperties } from '../context/PropertyContext';

const FeaturedSection = () => {
    const { properties, wishlist, toggleWishlist } = useProperties();
    const { toasts, dismiss, toast } = useToast();

    const handleToggleWishlist = useCallback((e: React.MouseEvent, id: number, address: string) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id);
        if (!wishlist.includes(id)) toast.success('Saved!', `${address} added to your saved homes.`);
        else toast.info('Removed', `${address} removed from saved homes.`);
    }, [toggleWishlist, wishlist, toast]);

    // Show top 3 properties marked as exclusive, or just the first 3
    const featuredProperties = properties.filter(p => p.isExclusive).slice(0, 3).length > 0
        ? properties.filter(p => p.isExclusive).slice(0, 3)
        : properties.slice(0, 3);

    return (
        <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <RevealText as="h2" className="text-3xl md:text-5xl font-bold text-primary-black dark:text-white mb-4">
                            Featured Properties
                        </RevealText>
                        <RevealText as="p" className="text-neutral-grey dark:text-neutral-grey/60 text-base md:text-lg max-w-xl" delay={0.2}>
                            Explore our hand-picked selection of the most exclusive properties in the city.
                        </RevealText>
                    </div>
                    <Link to="/search" className="hidden md:flex items-center gap-2 font-bold text-primary-black dark:text-gold border-b-2 border-primary-black dark:border-gold pb-1 hover:text-neutral-grey hover:border-neutral-grey transition-colors shrink-0 ml-8">
                        View all <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredProperties.map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.6 }}
                            className="group"
                        >
                            <Link to={`/property/${p.id}`}>
                                <div className="relative aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-std mb-6 bg-light-grey dark:bg-dark-surface shadow-sm">
                                    <img src={p.image} alt={p.address} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                    <button
                                        onClick={(e) => handleToggleWishlist(e, p.id, p.address)}
                                        className={`absolute top-6 right-6 p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 active:scale-90 ${wishlist.includes(p.id) ? 'bg-white text-primary-black' : 'bg-white/20 text-white hover:bg-white hover:text-primary-black'}`}
                                        title={wishlist.includes(p.id) ? 'Remove from saved' : 'Save property'}
                                    >
                                        <Heart size={22} className={wishlist.includes(p.id) ? 'fill-current' : ''} />
                                    </button>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <span className="text-2xl font-bold text-white tracking-tight">₹{p.price} cr</span>
                                    </div>
                                    {p.isExclusive && (
                                        <div className="absolute top-6 left-6 bg-gold text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase shadow">
                                            Exclusive
                                        </div>
                                    )}
                                </div>
                                <div className="px-2">
                                    <h3 className="text-2xl md:text-xl font-bold text-primary-black dark:text-white mb-2 group-hover:text-neutral-grey dark:group-hover:text-gold transition-colors">{p.address}</h3>
                                    <p className="text-neutral-grey dark:text-neutral-grey/60 font-medium tracking-tight text-lg md:text-base">{p.rooms} Beds • {p.baths} Baths • {p.area} m²</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 md:hidden flex justify-center">
                    <Link to="/search" className="flex items-center gap-2 font-bold text-primary-black dark:text-gold border-b-2 border-primary-black dark:border-gold pb-1">
                        View all properties <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </section>
    );
};

export default FeaturedSection;
