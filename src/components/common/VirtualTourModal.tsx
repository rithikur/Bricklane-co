import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Play, Eye } from 'lucide-react';

interface VirtualTourModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    address: string;
}

const roomLabels = ['Living Room', 'Master Bedroom', 'Kitchen', 'Outdoor / Patio'];

const VirtualTourModal = ({ isOpen, onClose, images, address }: VirtualTourModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [direction, setDirection] = useState(1);

    const go = (dir: number) => {
        setDirection(dir);
        setCurrentIndex(prev => (prev + dir + images.length) % images.length);
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className={`relative font-display bg-black rounded-2xl overflow-hidden flex flex-col ${isFullscreen ? 'w-screen h-screen rounded-none' : 'w-full max-w-4xl mx-4 h-[85vh] max-h-[700px]'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/70 to-transparent">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 bg-gold rounded-full animate-pulse shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                                    <span className="text-gold text-xs font-bold uppercase tracking-widest">Virtual Tour</span>
                                </div>
                                <p className="text-white/70 text-sm font-medium truncate max-w-xs">{address}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-gold/20 text-white hover:text-gold transition-colors"
                                    title="Toggle Fullscreen"
                                >
                                    <Maximize2 size={18} />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-white/10 hover:bg-gold/20 text-white hover:text-gold transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Image Slider */}
                        <div className="flex-1 relative overflow-hidden">
                            <AnimatePresence custom={direction} mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt={roomLabels[currentIndex]}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* 360° overlay badge */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
                                <div className="w-40 h-40 border-4 border-gold/40 rounded-full flex items-center justify-center">
                                    <div className="text-gold/40 text-center">
                                        <Eye size={28} className="mx-auto mb-1" />
                                        <span className="text-xs font-bold uppercase tracking-widest">360°</span>
                                    </div>
                                </div>
                            </div>

                            {/* Prev / Next */}
                            <button
                                onClick={() => go(-1)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-gold/20 text-white hover:text-gold rounded-full transition-all hover:scale-110"
                            >
                                <ChevronLeft size={22} />
                            </button>
                            <button
                                onClick={() => go(1)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-gold/20 text-white hover:text-gold rounded-full transition-all hover:scale-110"
                            >
                                <ChevronRight size={22} />
                            </button>
                        </div>

                        {/* Bottom: room strip + counter */}
                        <div className="bg-black/90 backdrop-blur-md px-6 py-4 flex items-center justify-between gap-4 border-t border-white/5">
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                                        className={`flex-shrink-0 flex flex-col items-center gap-1.5 group`}
                                    >
                                        <div className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === currentIndex ? 'border-gold scale-105' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                                            <img src={img} alt={roomLabels[i]} className="w-full h-full object-cover" />
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${i === currentIndex ? 'text-gold' : 'text-white/40 group-hover:text-white/60'}`}>
                                            {roomLabels[i] || `Room ${i + 1}`}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 shrink-0 text-white/60 text-xs font-bold uppercase tracking-widest">
                                <Play size={12} className="fill-current" />
                                {currentIndex + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VirtualTourModal;
