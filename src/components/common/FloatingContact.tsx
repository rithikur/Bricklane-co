import { Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col gap-3">
                        <motion.a
                            initial={{ opacity: 0, x: -20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noreferrer"
                            className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            title="WhatsApp Us"
                        >
                            <MessageSquare size={20} />
                        </motion.a>
                        <motion.a
                            initial={{ opacity: 0, x: -20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            transition={{ delay: 0.1 }}
                            href="tel:+919876543210"
                            className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            title="Call Us"
                        >
                            <Phone size={20} />
                        </motion.a>
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-primary-black dark:bg-gold text-white dark:text-black' : 'bg-white dark:bg-dark-surface text-primary-black dark:text-gold border border-light-grey dark:border-dark-border'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Phone size={24} className={isOpen ? 'rotate-[135deg] transition-transform duration-300' : 'transition-transform duration-300'} />
            </motion.button>
        </div>
    );
};

export default FloatingContact;
