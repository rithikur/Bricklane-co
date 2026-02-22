import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AuthGateModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const AuthGateModal = ({ isOpen, onClose, message = "Sign in to unlock this feature." }: AuthGateModalProps) => {
    const location = useLocation();
    const from = encodeURIComponent(location.pathname + location.search);
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 24 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] w-full max-w-sm p-8 relative font-display"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 rounded-full text-white/60 hover:bg-white/15 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <p className="text-white/80 mt-6 mb-8 leading-relaxed text-base pr-6">
                            {message}
                        </p>

                        <div className="flex flex-row gap-3">
                            <Link
                                to={`/signin?from=${from}`}
                                className="flex items-center justify-center gap-1.5 w-full bg-gold text-black py-3 rounded-lg text-sm font-bold hover:bg-gold-hover transition-colors shadow-lg group"
                                onClick={onClose}
                            >
                                Sign In
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to={`/signup?from=${from}`}
                                className="flex items-center justify-center w-full border border-white/30 text-white py-3 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors"
                                onClick={onClose}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthGateModal;
