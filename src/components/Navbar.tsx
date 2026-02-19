import { useState, useEffect } from 'react';
import { Menu, X, User, Search, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { wishlist } = useProperties();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => setIsOpen(false), [location.pathname]);

    const isLanding = location.pathname === '/';
    const isTransparent = isLanding && !scrolled;

    const navLinks = [
        { to: '/search', label: 'Find Home' },
        { to: '/services', label: 'Services' },
        { to: '/about', label: 'About' },
        { to: '/blog', label: 'Blog' },
        { to: '/help', label: 'Help' },
    ];

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-500 ${isTransparent
                    ? 'bg-transparent'
                    : 'bg-white/80 backdrop-blur-xl border-b border-light-grey shadow-sm'
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-20 flex items-center justify-between gap-6">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg shadow-md transition-all group-hover:scale-110 duration-300 ${isTransparent ? 'bg-white text-primary-black' : 'bg-primary-black text-white'}`}>
                        B
                    </div>
                    <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-primary-black'}`}>
                        BRICKLANE<span className={`font-normal ${isTransparent ? 'text-white/70' : 'text-neutral-grey'}`}>co.</span>
                    </span>
                </Link>

                {/* Desktop Center Pills Nav */}
                <div className={`hidden md:flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${isTransparent ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-light-grey'}`}>
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${location.pathname === link.to
                                    ? (isTransparent ? 'bg-white text-primary-black' : 'bg-white text-primary-black shadow-sm')
                                    : (isTransparent ? 'text-white/90 hover:bg-white/20' : 'text-neutral-grey hover:text-primary-black hover:bg-white/80')
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-3 shrink-0">
                    {/* Wishlist */}
                    <Link
                        to="/search"
                        className={`relative p-2.5 rounded-full transition-all duration-200 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-primary-black hover:bg-light-grey'}`}
                        title="Wishlist"
                    >
                        <Heart size={20} />
                        {wishlist.length > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    {/* Search */}
                    <Link
                        to="/search"
                        className={`p-2.5 rounded-full transition-all duration-200 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-primary-black hover:bg-light-grey'}`}
                        title="Search"
                    >
                        <Search size={20} />
                    </Link>

                    <div className={`h-6 w-px mx-1 ${isTransparent ? 'bg-white/30' : 'bg-light-grey'}`} />

                    <Link
                        to="/admin"
                        className={`text-sm font-bold px-3 py-2 rounded-full transition-all duration-200 ${isTransparent ? 'text-white/80 hover:text-white hover:bg-white/20' : 'text-neutral-grey hover:text-primary-black hover:bg-light-grey'}`}
                    >
                        Admin
                    </Link>
                    <button className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95 duration-200 ${isTransparent ? 'bg-white text-primary-black hover:bg-white/90' : 'bg-primary-black text-white hover:bg-neutral-grey'}`}>
                        <User size={16} />
                        Sign In
                    </button>
                </div>

                {/* Mobile Actions */}
                <div className="md:hidden flex items-center gap-2">
                    <Link to="/search" className={`relative p-2 rounded-full transition-colors ${isTransparent ? 'text-white' : 'text-primary-black'}`}>
                        <Heart size={20} />
                        {wishlist.length > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>
                    <button
                        className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/20' : 'text-primary-black hover:bg-light-grey'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-light-grey p-6 flex flex-col gap-2 shadow-2xl z-40">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-lg font-bold p-3 hover:bg-light-grey rounded-xl transition-colors text-primary-black"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/admin"
                        className="text-lg font-bold p-3 hover:bg-light-grey rounded-xl transition-colors text-primary-black"
                        onClick={() => setIsOpen(false)}
                    >
                        Admin Portal
                    </Link>
                    <div className="mt-4 pt-4 border-t border-light-grey">
                        <button className="flex items-center justify-center gap-2 bg-primary-black text-white px-5 py-4 rounded-full text-lg font-bold w-full shadow-lg active:scale-95 transition-transform">
                            <User size={20} />
                            Sign In / Register
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
