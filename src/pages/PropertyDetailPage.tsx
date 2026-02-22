import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Heart, Share2, Check, ArrowLeft, Copy, Link2, PlayCircle, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '../data/properties';
import { useAuth } from '../context/AuthContext';
import AuthGateModal from '../components/common/AuthGateModal';
import VirtualTourModal from '../components/common/VirtualTourModal';

const PropertyDetailPage = () => {
    const { id } = useParams();
    const [isSaved, setIsSaved] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showAuthGate, setShowAuthGate] = useState(false);
    const [authGateMessage, setAuthGateMessage] = useState('');
    const [showTour, setShowTour] = useState(false);
    const { isLoggedIn } = useAuth();

    const requireAuth = (message: string, action: () => void) => {
        if (!isLoggedIn) {
            setAuthGateMessage(message);
            setShowAuthGate(true);
        } else {
            action();
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    const propertyId = id ? parseInt(id) : 1;
    const property = properties.find(p => p.id === propertyId) || properties[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const images = [
        property.image,
        property.kitchen_image || "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000"
    ];

    const amenities = [
        "Equipped kitchen", "Wi-Fi", "City view",
        "Free parking", "Swimming pool", "Light",
        "Air conditioning", "Gym"
    ];

    // Full-page gate for exclusive properties
    if (property.isExclusive && !isLoggedIn) {
        return (
            <div className="font-display min-h-screen bg-white">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                    <div className="max-w-md">
                        <div className="w-16 h-16 rounded-2xl bg-primary-black flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Lock size={28} className="text-white" />
                        </div>
                        <span className="inline-block bg-amber-400 text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-4">
                            Exclusive Listing
                        </span>
                        <h1 className="text-3xl font-bold text-primary-black mb-3">Sign in to view this property</h1>
                        <p className="text-neutral-grey leading-relaxed mb-8">
                            This is a members-only listing. Create a free account or sign in to unlock full details, photos, pricing and agent contact.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                to={`/signin?from=${encodeURIComponent(`/property/${property.id}`)}`}
                                className="flex-1 flex items-center justify-center gap-2 bg-primary-black text-white py-3.5 rounded-xl font-bold hover:bg-neutral-grey transition-colors group"
                            >
                                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to={`/signup?from=${encodeURIComponent(`/property/${property.id}`)}`}
                                className="flex-1 flex items-center justify-center border border-light-grey text-primary-black py-3.5 rounded-xl font-bold hover:border-primary-black transition-colors"
                            >
                                Create Account
                            </Link>
                        </div>
                        <Link to="/search" className="inline-block mt-6 text-sm text-neutral-grey hover:text-primary-black font-medium transition-colors">
                            ← Back to search
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="font-display min-h-screen bg-white pb-20">
            <Navbar />

            {/* Virtual Tour Modal */}
            <VirtualTourModal
                isOpen={showTour}
                onClose={() => setShowTour(false)}
                images={images}
                address={property.address}
            />

            {/* Auth Gate Modal */}
            <AuthGateModal
                isOpen={showAuthGate}
                onClose={() => setShowAuthGate(false)}
                message={authGateMessage}
            />

            <AnimatePresence>
                {showShareModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                        onClick={() => setShowShareModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 font-display"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-primary-black mb-2">Share this property</h3>
                            <p className="text-neutral-grey mb-8 text-sm">Copy the link below or share directly.</p>

                            <div className="flex items-center gap-3 border border-light-grey rounded-std p-3 mb-6 bg-light-grey/20">
                                <Link2 size={16} className="text-neutral-grey shrink-0" />
                                <span className="text-sm text-neutral-grey truncate flex-1">{window.location.href}</span>
                                <button
                                    onClick={handleCopyLink}
                                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary-black text-white hover:bg-neutral-grey'
                                        }`}
                                >
                                    {copied ? <Check size={13} /> : <Copy size={13} />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-full py-3 border border-light-grey rounded-std text-sm font-bold text-neutral-grey hover:bg-light-grey/30 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-6 md:pt-10">
                <Link to="/search" className="inline-flex items-center gap-2 text-neutral-grey hover:text-primary-black mb-6 font-bold transition-colors">
                    <ArrowLeft size={20} /> Back to Search
                </Link>

                {/* Image Gallery Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[500px] mb-8 md:mb-12 relative">
                    <div className="md:col-span-2 md:row-span-2 rounded-std overflow-hidden relative group h-64 md:h-auto">
                        <img src={images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <button
                            onClick={() => setShowTour(true)}
                            className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg group/btn"
                        >
                            <PlayCircle size={18} className="text-white group-hover/btn:animate-pulse" />
                            Virtual Tour
                            <span className="bg-white/20 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">360°</span>
                        </button>
                    </div>
                    <div className="hidden md:block md:col-span-1 md:row-span-1 rounded-std overflow-hidden relative group">
                        <img src={images[1]} alt="Kitchen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="hidden md:block md:col-span-1 md:row-span-1 rounded-std overflow-hidden relative group">
                        <img src={images[2]} alt="Living Room" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="hidden md:block md:col-span-2 md:row-span-1 rounded-std overflow-hidden relative group">
                        <img src={images[3]} alt="Patio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-primary-black">₹{property.price} Cr</h1>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => requireAuth(
                                        "Sign in to save this property and access it anytime from your wishlist.",
                                        () => setIsSaved(!isSaved)
                                    )}
                                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 border rounded-std font-medium transition-colors ${isSaved ? 'bg-primary-black text-white border-primary-black' : 'border-light-grey hover:border-primary-black'}`}
                                >
                                    <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                                    {isSaved ? 'Saved' : 'Save'}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 border border-light-grey rounded-std font-medium hover:border-primary-black transition-colors"
                                >
                                    <Share2 size={18} />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Quick Specs */}
                        <div className="grid grid-cols-4 gap-4 mb-12 py-6 border-y border-light-grey">
                            <div className="flex flex-col items-center justify-center border-r border-light-grey last:border-0 p-2">
                                <span className="text-lg md:text-xl font-bold text-primary-black">{property.area} m²</span>
                                <span className="text-xs md:text-sm text-neutral-grey font-medium">Area</span>
                            </div>
                            <div className="flex flex-col items-center justify-center border-r border-light-grey last:border-0 p-2">
                                <span className="text-lg md:text-xl font-bold text-primary-black">{property.rooms}</span>
                                <span className="text-xs md:text-sm text-neutral-grey font-medium">Beds</span>
                            </div>
                            <div className="flex flex-col items-center justify-center border-r border-light-grey last:border-0 p-2">
                                <span className="text-lg md:text-xl font-bold text-primary-black">{property.baths}</span>
                                <span className="text-xs md:text-sm text-neutral-grey font-medium">Baths</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <span className="text-lg md:text-xl font-bold text-primary-black">{Math.floor(Math.random() * 20) + 1}</span>
                                <span className="text-xs md:text-sm text-neutral-grey font-medium">Floor</span>
                            </div>
                        </div>

                        {/* Description / Address */}
                        <div className="mb-12">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Location</h2>
                                <p className="text-neutral-grey text-lg">{property.address}, India</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4">About this home</h2>
                                <p className="text-neutral-grey text-lg leading-relaxed">
                                    {property.description}
                                </p>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                                {amenities.map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-light-grey/30 rounded-full flex items-center justify-center">
                                            <Check size={14} className="text-primary-black" />
                                        </div>
                                        <span className="font-medium text-primary-black">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        {(property as any).reviews && (property as any).reviews.length > 0 && (
                            <div className="mb-12 border-t border-light-grey pt-12">
                                <h2 className="text-2xl font-bold mb-8">Reviews ({(property as any).reviews.length})</h2>
                                <div className="space-y-8">
                                    {(property as any).reviews.map((review: any) => (
                                        <div key={review.id} className="border-b border-light-grey pb-8 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary-black text-white flex items-center justify-center font-bold">
                                                        {review.user.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-primary-black">{review.user}</h4>
                                                        <span className="text-sm text-neutral-grey">{review.date}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`text-sm ${i < Math.floor(review.rating) ? 'text-primary-black' : 'text-light-grey'}`}>★</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-neutral-grey leading-relaxed">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Agent Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-light-grey rounded-std p-6 sticky top-24 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <img src={property.agent.image} alt={property.agent.name} className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <h3 className="text-lg font-bold text-primary-black">{property.agent.name}</h3>
                                    <p className="text-sm text-neutral-grey font-medium">Real Estate Agent</p>
                                </div>
                            </div>

                            <button
                                onClick={() => requireAuth(
                                    "Sign in to send a request to the agent and start your property journey.",
                                    () => { }
                                )}
                                className="w-full bg-primary-black text-white py-3 rounded-std font-bold hover:bg-neutral-grey transition-colors mb-4"
                            >
                                Send a request
                            </button>
                            <button
                                onClick={() => requireAuth(
                                    "Sign in to schedule a viewing with the agent.",
                                    () => { }
                                )}
                                className="w-full border border-light-grey text-primary-black py-3 rounded-std font-bold hover:border-primary-black transition-colors"
                            >
                                Call Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
