import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Predefined Q&A Logic
const chatbotData = [
    {
        id: 'start',
        message: "Hi there! 👋 Welcome to Bricklane co. How can I help you today?",
        options: [
            { label: "Buying a Property", nextId: 'buying' },
            { label: "Selling my Home", nextId: 'selling' },
            { label: "Renting options", nextId: 'renting' },
            { label: "Contact Support", nextId: 'support' },
        ]
    },
    {
        id: 'buying',
        message: "Great! Buying a home is an exciting journey. What are you looking for?",
        options: [
            { label: "View Listings", action: '/search' },
            { label: "Mortgage Info", nextId: 'mortgage' },
            { label: "Back to menu", nextId: 'start' },
        ]
    },
    {
        id: 'selling',
        message: "We'd love to help you get the best price for your home. Would you like a free valuation?",
        options: [
            { label: "Yes, get valuation", action: '/services' },
            { label: "How it works", nextId: 'selling_process' },
            { label: "Back to menu", nextId: 'start' },
        ]
    },
    {
        id: 'renting',
        message: "Looking for a rental? We have the most up-to-date listings in top cities.",
        options: [
            { label: "Browse Rentals", action: '/search?type=rent' }, // Mock action
            { label: "Tenant FAQs", action: '/help' },
            { label: "Back to menu", nextId: 'start' },
        ]
    },
    {
        id: 'support',
        message: "Our support team is available 24/7. You can reach us at support@bricklane.co or call +91 98765 43210.",
        options: [
            { label: "Back to menu", nextId: 'start' },
        ]
    },
    {
        id: 'mortgage',
        message: "We partner with top banks to offer competitive mortgage rates starting at 8.5%.",
        options: [
            { label: "Check Eligibility", action: '/services' },
            { label: "Back to menu", nextId: 'start' },
        ]
    },
    {
        id: 'selling_process',
        message: "Our selling process is simple: 1. Valuation 2. Listing & Marketing 3. Viewings 4. Closing. We handle everything!",
        options: [
            { label: "Start Now", action: '/services' },
            { label: "Back to menu", nextId: 'start' },
        ]
    }
];

type Message = {
    text: string;
    sender: 'bot' | 'user';
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<Message[]>([]);
    const [currentStep, setCurrentStep] = useState(chatbotData[0]);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Initial greeting
    useEffect(() => {
        if (isOpen && history.length === 0) {
            setHistory([{ text: currentStep.message, sender: 'bot' }]);
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isOpen]);

    const handleOptionClick = (option: { label: string, nextId?: string, action?: string }) => {
        // Add user response
        setHistory(prev => [...prev, { text: option.label, sender: 'user' }]);

        // Handle navigation or next step
        if (option.action) {
            setTimeout(() => {
                setHistory(prev => [...prev, { text: `Redirecting you to ${option.label}...`, sender: 'bot' }]);
                setTimeout(() => {
                    window.location.href = option.action!;
                }, 1000);
            }, 500);
            return;
        }

        if (option.nextId) {
            const nextStep = chatbotData.find(step => step.id === option.nextId);
            if (nextStep) {
                setCurrentStep(nextStep);
                setTimeout(() => {
                    setHistory(prev => [...prev, { text: nextStep.message, sender: 'bot' }]);
                }, 600);
            }
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] max-h-[500px] h-[70vh] bg-white rounded-2xl shadow-2xl border border-light-grey flex flex-col overflow-hidden font-display"
                    >
                        {/* Header */}
                        <div className="bg-primary-black text-white p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <MessageCircle size={16} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Bricklane Assistant</h3>
                                <p className="text-xs text-white/70 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-light-grey/10">
                            {history.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-primary-black text-white rounded-tr-none'
                                            : 'bg-white text-primary-black border border-light-grey rounded-tl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Options / Input Area */}
                        <div className="p-4 bg-white border-t border-light-grey">
                            <div className="flex flex-wrap gap-2">
                                {currentStep.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(option)}
                                        className="text-xs font-bold px-3 py-2 bg-light-grey/20 text-primary-black rounded-full hover:bg-primary-black hover:text-white transition-colors border border-transparent hover:border-black"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
