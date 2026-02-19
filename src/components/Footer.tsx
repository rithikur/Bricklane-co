import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
                            <a href="#" className="w-10 h-10 rounded-full border border-light-grey flex items-center justify-center text-primary-black hover:bg-primary-black hover:text-white transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-light-grey flex items-center justify-center text-primary-black hover:bg-primary-black hover:text-white transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-light-grey flex items-center justify-center text-primary-black hover:bg-primary-black hover:text-white transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-light-grey flex items-center justify-center text-primary-black hover:bg-primary-black hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary-black">Company</h4>
                        <ul className="space-y-4 text-neutral-grey font-medium">
                            <li><a href="#" className="hover:text-primary-black transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-black transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-black transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary-black transition-colors">Press</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary-black">Resources</h4>
                        <ul className="space-y-4 text-neutral-grey font-medium">
                            <li><a href="#" className="hover:text-primary-black transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary-black transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-black transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary-black transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-primary-black">Newsletter</h4>
                        <p className="text-neutral-grey font-medium mb-4">Subscribe to our newsletter for the latest updates.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Your email" className="flex-1 border border-light-grey rounded-std px-4 py-2 focus:outline-none focus:border-primary-black bg-white" />
                            <button className="bg-primary-black text-white px-4 py-2 rounded-std hover:bg-neutral-grey transition-colors">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-light-grey pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-grey font-medium">
                    <p>&copy; 2026 Bricklane co. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-primary-black transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary-black transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary-black transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
