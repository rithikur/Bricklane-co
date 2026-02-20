
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const SitemapPage = () => {
    return (
        <div className="min-h-screen bg-white font-display text-primary-black">
            <Navbar />

            <main className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="mb-20">
                    <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider block mb-4">Resources</span>
                    <h1 className="text-5xl font-bold mb-8">Sitemap.</h1>
                    <p className="text-xl text-neutral-grey">Navigate to any section of Bricklane with ease.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h2 className="text-xl font-bold mb-6 border-b border-light-grey pb-4">Main</h2>
                        <ul className="space-y-4 text-neutral-grey">
                            <li><Link to="/" className="hover:text-primary-black transition-colors">Home</Link></li>
                            <li><Link to="/search" className="hover:text-primary-black transition-colors">Search Properties</Link></li>
                            <li><Link to="/services" className="hover:text-primary-black transition-colors">Services</Link></li>
                            <li><Link to="/blog" className="hover:text-primary-black transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-6 border-b border-light-grey pb-4">Company</h2>
                        <ul className="space-y-4 text-neutral-grey">
                            <li><Link to="/about" className="hover:text-primary-black transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary-black transition-colors">Careers</Link></li>
                            <li><Link to="/press" className="hover:text-primary-black transition-colors">Press</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-black transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-6 border-b border-light-grey pb-4">Legal & Support</h2>
                        <ul className="space-y-4 text-neutral-grey">
                            <li><Link to="/help" className="hover:text-primary-black transition-colors">Help Center</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary-black transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary-black transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SitemapPage;
