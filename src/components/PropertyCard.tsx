import { Heart, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import AuthGateModal from './common/AuthGateModal';
import Skeleton from './common/Skeleton';

interface PropertyCardProps {
    id: number;
    price: number | string;
    address: string;
    rooms: number;
    baths: number;
    area: number;
    image: string;
    isExclusive?: boolean;
}

const PropertyCard = ({ id, price, address, rooms, baths, area, image, isExclusive = false }: PropertyCardProps) => {
    const { wishlist, toggleWishlist } = useProperties();
    const { isLoggedIn } = useAuth();
    const isWishlisted = wishlist.includes(id);
    const [showAuthGate, setShowAuthGate] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    // Locked = exclusive property + not signed in
    const isLocked = isExclusive && !isLoggedIn;

    const handleLockedClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowAuthGate(true);
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="group block bg-white dark:bg-dark-surface rounded-std overflow-hidden border border-transparent hover:border-light-grey dark:hover:border-dark-border hover:shadow-lg transition-all duration-300 transform-gpu"
            >
                <div className="relative">
                    {/* Image — blurred if locked */}
                    {isLocked ? (
                        <button onClick={handleLockedClick} className="w-full text-left">
                            <div className="relative aspect-[4/3] overflow-hidden bg-light-grey dark:bg-dark-bg">
                                {imageLoading && <Skeleton className="absolute inset-0 z-10" />}
                                <img
                                    src={image}
                                    alt={address}
                                    onLoad={() => setImageLoading(false)}
                                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 blur-sm scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/40" />
                                {/* Lock icon only */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-11 h-11 rounded-full bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center shadow-lg">
                                        <Lock size={20} className="text-white" />
                                    </div>
                                </div>
                                {/* Exclusive badge */}
                                <div className="absolute top-3 left-3 bg-gold text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase shadow">
                                    Exclusive
                                </div>
                            </div>
                        </button>
                    ) : (
                        <Link to={`/property/${id}`}>
                            <div className="relative aspect-[4/3] overflow-hidden bg-light-grey dark:bg-dark-bg">
                                {imageLoading && <Skeleton className="absolute inset-0 z-10" />}
                                <img
                                    src={image}
                                    alt={address}
                                    onLoad={() => setImageLoading(false)}
                                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                                />
                                {isExclusive && (
                                    <div className="absolute top-3 left-3 bg-gold text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase shadow">
                                        Exclusive
                                    </div>
                                )}
                            </div>
                        </Link>
                    )}

                    {/* Heart button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!isLoggedIn) {
                                setShowAuthGate(true);
                            } else {
                                toggleWishlist(id);
                            }
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 shadow-sm ${isWishlisted
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-white dark:bg-dark-surface text-primary-black dark:text-gold hover:bg-primary-black dark:hover:bg-gold hover:text-white dark:hover:text-black border dark:border-dark-border'
                            }`}
                    >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* Price badge */}
                    <div className="absolute bottom-3 left-3 bg-primary-black/95 dark:bg-gold/90 text-white dark:text-black px-3 py-1.5 rounded-sm text-sm font-bold backdrop-blur-sm pointer-events-none">
                        {isLocked ? '₹ ? ? ?' : `₹${price}`}
                    </div>
                </div>

                {/* Info — blurred text if locked */}
                {isLocked ? (
                    <button onClick={handleLockedClick} className="w-full text-left">
                        <div className="p-4 select-none">
                            <h3 className="text-lg font-bold text-primary-black dark:text-white truncate mb-1 blur-sm">{address}</h3>
                            <div className="flex items-center gap-4 text-neutral-grey dark:text-neutral-grey/60 text-sm font-medium mt-2 blur-sm">
                                <span>{rooms} Beds</span>
                                <span className="w-1 h-1 rounded-full bg-light-grey dark:bg-dark-border" />
                                <span>{baths} Baths</span>
                                <span className="w-1 h-1 rounded-full bg-light-grey dark:bg-dark-border" />
                                <span>{area} m²</span>
                            </div>
                        </div>
                    </button>
                ) : (
                    <Link to={`/property/${id}`}>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-primary-black dark:text-white truncate mb-1 group-hover:text-neutral-grey dark:group-hover:text-gold transition-colors">{address}</h3>
                            <div className="flex items-center gap-4 text-neutral-grey dark:text-neutral-grey/60 text-sm font-medium mt-2">
                                <span className="flex items-center gap-1">{rooms} Beds</span>
                                <span className="w-1 h-1 rounded-full bg-light-grey dark:bg-dark-border" />
                                <span className="flex items-center gap-1">{baths} Baths</span>
                                <span className="w-1 h-1 rounded-full bg-light-grey dark:bg-dark-border" />
                                <span className="flex items-center gap-1">{area} m²</span>
                            </div>
                        </div>
                    </Link>
                )}
            </motion.div>

            <AuthGateModal
                isOpen={showAuthGate}
                onClose={() => setShowAuthGate(false)}
                message="Sign in to unlock exclusive properties and access full details."
            />
        </>
    );
};

export default PropertyCard;
