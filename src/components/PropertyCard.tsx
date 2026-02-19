import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';

interface PropertyCardProps {
    id: number;
    price: number | string;
    address: string;
    rooms: number;
    baths: number;
    area: number;
    image: string;
}


const PropertyCard = ({ id, price, address, rooms, baths, area, image }: PropertyCardProps) => {
    const { wishlist, toggleWishlist } = useProperties();
    const isWishlisted = wishlist.includes(id);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group block bg-white rounded-std overflow-hidden border border-transparent hover:border-light-grey hover:shadow-lg transition-all duration-300 transform-gpu"
        >
            <div className="relative">
                <Link to={`/property/${id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-light-grey">
                        <img src={image} alt={address} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    </div>
                </Link>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 shadow-sm ${isWishlisted
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white/90 text-primary-black hover:bg-primary-black hover:text-white'
                        }`}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <div className="absolute bottom-3 left-3 bg-primary-black/95 text-white px-3 py-1.5 rounded-sm text-sm font-bold backdrop-blur-sm pointer-events-none">
                    ₹{price}
                </div>
            </div>
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
        </motion.div>
    );
};

export default PropertyCard;
