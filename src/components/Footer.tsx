import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToastContainer, useToast } from './common/Toast';

const Footer = () => {
    const [email, setEmail] = useState('');
    const { toasts, dismiss, toast } = useToast();

    const handleSubscribe = () => {
        const trimmed = email.trim();
        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            toast.error('Invalid email', 'Please enter a valid email address.');
            return;
        }
        toast.success('You\'re in! 🎉', 'Thanks for subscribing to the Bricklane newsletter.');
        setEmail('');
    };

    return (
        <footer className="bg-white border-t border-light-grey pt-20 pb-10">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold tracking-tight text-primary-black mb-6 block">
                            BRICKLANE<span className="font-normal text-neutral-grey">co.</span>
                        </Link>
                        <p className="text-neutral-grey font-medium leading-relaxed mb-6">
                            We help you find your dream home in the world's most beautiful cities. Luxury living starts here.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-light-grey flex items-center justify-center text-primary-black hover:bg-primary-black hover:text-white transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-light-grey flex items-center justify-center text-primary-black hover:bg-primary-black hover:text-white transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-light-grey flex items-center justify-center text-primary-black hover:bg-primary-black hover:text-white transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-light-grey flex items-center justify-center text-primary-black hover:bg-primary-black hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary-black">Company</h4>
                        <ul className="space-y-4 text-neutral-grey font-medium">
                            <li><Link to="/about" className="hover:text-primary-black transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary-black transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-primary-black transition-colors">Blog</Link></li>
                            <li><Link to="/press" className="hover:text-primary-black transition-colors">Press</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary-black">Resources</h4>
                        <ul className="space-y-4 text-neutral-grey font-medium">
                            <li><Link to="/help" className="hover:text-primary-black transition-colors">Help Center</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary-black transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary-black transition-colors">Terms of Service</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-black transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary-black">Newsletter</h4>
                        <p className="text-neutral-grey font-medium mb-4">Subscribe to our newsletter for the latest updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                                placeholder="Your email"
                                className="flex-1 border border-light-grey rounded-std px-4 py-2 focus:outline-none focus:border-primary-black bg-white"
                            />
                            <button
                                onClick={handleSubscribe}
                                className="bg-primary-black text-white px-4 py-2 rounded-std hover:bg-neutral-grey transition-colors active:scale-95"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-light-grey pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-grey font-medium">
                    <p>&copy; 2026 Bricklane co. All rights reserved. <span className="mx-2">|</span> Powered by LbxSuite</p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="hover:text-primary-black transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-primary-black transition-colors">Terms</Link>
                        <Link to="/sitemap" className="hover:text-primary-black transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </footer>
    );
};

export default Footer;
