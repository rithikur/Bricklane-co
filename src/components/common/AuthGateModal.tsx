import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthGateModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const AuthGateModal = ({ isOpen, onClose, message = "Sign in to unlock this feature." }: AuthGateModalProps) => {
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
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative font-display"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-grey hover:bg-light-grey transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Icon */}
                        <div className="w-14 h-14 bg-primary-black rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <Lock size={24} className="text-white" />
                        </div>

                        <h3 className="text-2xl font-bold text-primary-black mb-2">
                            Members Only
                        </h3>
                        <p className="text-neutral-grey mb-8 leading-relaxed">
                            {message}
                        </p>

                        <div className="flex flex-col gap-3">
                            <Link
                                to="/signin"
                                className="flex items-center justify-center gap-2 w-full bg-primary-black text-white py-3.5 rounded-xl font-bold hover:bg-neutral-grey transition-colors shadow-lg group"
                                onClick={onClose}
                            >
                                Sign In
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/signin"
                                className="flex items-center justify-center w-full border border-light-grey text-primary-black py-3.5 rounded-xl font-bold hover:border-primary-black transition-colors"
                                onClick={onClose}
                            >
                                Create an Account
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthGateModal;
