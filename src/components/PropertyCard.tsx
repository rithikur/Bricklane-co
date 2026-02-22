import { Heart, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import AuthGateModal from './common/AuthGateModal';

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
                className="group block bg-white rounded-std overflow-hidden border border-transparent hover:border-light-grey hover:shadow-lg transition-all duration-300 transform-gpu"
            >
                <div className="relative">
                    {/* Image — blurred if locked */}
                    {isLocked ? (
                        <button onClick={handleLockedClick} className="w-full text-left">
                            <div className="relative aspect-[4/3] overflow-hidden bg-light-grey">
                                <img
                                    src={image}
                                    alt={address}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 blur-sm scale-105"
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
                                <div className="absolute top-3 left-3 bg-amber-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase shadow">
                                    Exclusive
                                </div>
                            </div>
                        </button>
                    ) : (
                        <Link to={`/property/${id}`}>
                            <div className="relative aspect-[4/3] overflow-hidden bg-light-grey">
                                <img src={image} alt={address} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                                {isExclusive && (
                                    <div className="absolute top-3 left-3 bg-amber-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase shadow">
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
                            : 'bg-white/90 text-primary-black hover:bg-primary-black hover:text-white'
                            }`}
                    >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* Price badge */}
                    <div className="absolute bottom-3 left-3 bg-primary-black/95 text-white px-3 py-1.5 rounded-sm text-sm font-bold backdrop-blur-sm pointer-events-none">
                        {isLocked ? '₹ ? ? ?' : `₹${price}`}
                    </div>
                </div>

                {/* Info — blurred text if locked */}
                {isLocked ? (
                    <button onClick={handleLockedClick} className="w-full text-left">
                        <div className="p-4 select-none">
                            <h3 className="text-lg font-bold text-primary-black truncate mb-1 blur-sm">{address}</h3>
                            <div className="flex items-center gap-4 text-neutral-grey text-sm font-medium mt-2 blur-sm">
                                <span>{rooms} Beds</span>
                                <span className="w-1 h-1 rounded-full bg-light-grey" />
                                <span>{baths} Baths</span>
                                <span className="w-1 h-1 rounded-full bg-light-grey" />
                                <span>{area} m²</span>
                            </div>
                        </div>
                    </button>
                ) : (
                    <Link to={`/property/${id}`}>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-primary-black truncate mb-1">{address}</h3>
                            <div className="flex items-center gap-4 text-neutral-grey text-sm font-medium mt-2">
                                <span className="flex items-center gap-1">{rooms} Beds</span>
                                <span className="w-1 h-1 rounded-full bg-light-grey" />
                                <span className="flex items-center gap-1">{baths} Baths</span>
                                <span className="w-1 h-1 rounded-full bg-light-grey" />
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
