import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogSection from '../components/BlogSection';
import { ToastContainer, useToast } from '../components/common/Toast';

const BlogPage = () => {
    const [email, setEmail] = useState('');
    const { toasts, dismiss, toast } = useToast();

    const handleSubscribe = () => {
        const trimmed = email.trim();
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            toast.error('Invalid email', 'Please enter a valid email address.');
            return;
        }
        toast.success('Subscribed! 🎉', 'You\'ll receive the latest articles in your inbox.');
        setEmail('');
    };

    return (
        <div className="min-h-screen font-display bg-white dark:bg-dark-bg transition-colors">
            <Navbar />
            <div className="pt-10 pb-20">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-primary-black dark:text-white mb-6">The Bricklane Journal</h1>
                    <p className="text-xl text-neutral-grey max-w-2xl mx-auto">
                        Stories, interviews, and deep dives into the world of modern living, architecture, and design.
                    </p>
                </div>

                <BlogSection showAll={true} />

                {/* Newsletter */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-20">
                    <div className="bg-primary-black dark:bg-dark-surface text-white rounded-std p-12 md:p-20 text-center border dark:border-dark-border">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-gold">Subscribe to our newsletter</h2>
                        <p className="text-lg text-neutral-grey dark:text-neutral-grey/60 mb-8 max-w-xl mx-auto">Get the latest articles and property insights delivered straight to your inbox.</p>
                        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 rounded-std text-primary-black dark:text-white bg-white dark:bg-dark-bg border border-transparent dark:border-dark-border focus:outline-none focus:border-primary-black dark:focus:border-gold transition-colors"
                            />
                            <button
                                onClick={handleSubscribe}
                                className="bg-white dark:bg-gold text-primary-black px-8 py-3 rounded-std font-bold hover:bg-light-grey dark:hover:bg-gold-hover transition-colors active:scale-95"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </div>
    );
};

export default BlogPage;
