import { useState, useEffect } from 'react';
import { Menu, X, User, Search, Heart, ArrowLeft, LogOut, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Magnetic from './common/Magnetic';
import ScrollProgress from './common/ScrollProgress';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();
    const { wishlist } = useProperties();
    const { isLoggedIn, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Detect active section
            const sections = ['services', 'about', 'reviews', 'blog', 'help'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= 0 && rect.top <= 300; // Trigger when section is near top
                }
                return false;
            });
            if (current) {
                setActiveSection(current);
            } else if (window.scrollY < 100) {
                setActiveSection('');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => setIsOpen(false), [location.pathname]);

    const isLanding = location.pathname === '/';
    const isTransparent = isLanding && !scrolled;

    const scrollToSection = (id: string) => {
        if (location.pathname === '/') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to home with hash
            // This requires handling hash on load in LandingPage or using a library, 
            // but for now we'll just navigate to home. 
            // A better approach is usually `useNavigate` then scroll.
            // Simplified for this context:
            window.location.href = `/#${id}`;
        }
        setIsOpen(false);
    };

    // Helper to determine active state
    const isActive = (to: string) => {
        if (to.startsWith('/#')) {
            const sectionId = to.replace('/#', '');
            return isLanding && activeSection === sectionId;
        }
        return location.pathname === to;
    };

    // Helper to determine if we should use Link or button
    const NavItem = ({ to, label, className }: { to: string, label: string, className?: string }) => {
        const isSection = to.startsWith('/#');
        const sectionId = to.replace('/#', '');
        const active = isActive(to);

        const content = (
            <span className="relative flex flex-col items-center">
                {label}
                {active && (
                    <motion.div
                        layoutId="navbar-indicator"
                        className={`absolute -bottom-1.5 w-5 h-1 rounded-full ${isTransparent ? 'bg-white' : 'bg-primary-black'}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                )}
            </span>
        );

        // Boxy Hover Effect + Base Layout
        // We remove the old CSS underline classes and add our own hover/layout classes
        const cleanClassName = className?.replace(/after:[\w\-\[\].\d]+/g, '').replace('relative', '').trim() || '';
        const hoverClasses = isTransparent
            ? 'hover:bg-white/10'
            : 'hover:bg-primary-black/5';

        const finalClassName = `${cleanClassName} relative flex items-center justify-center rounded-lg px-4 py-2 transition-colors duration-200 ${hoverClasses}`;

        if (isSection) {
            return (
                <button
                    onClick={() => scrollToSection(sectionId)}
                    className={finalClassName}
                >
                    {content}
                </button>
            );
        }

        return (
            <Link to={to} className={finalClassName} onClick={() => setIsOpen(false)}>
                {content}
            </Link>
        );
    };

    const navLinks = [
        { to: '/search', label: 'Find Home' },
        { to: '/#services', label: 'Services' },
        { to: '/#about', label: 'About' },
        { to: '/#reviews', label: 'Reviews' },
        { to: '/#blog', label: 'Blog' },
        { to: '/#help', label: 'Help' },
    ];

    return (
        <>
            <ScrollProgress />
            <nav
                className={`sticky top-0 z-50 transition-all duration-500 ${isTransparent
                    ? 'bg-transparent'
                    : 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-light-grey/50 dark:border-dark-border/50'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-20 flex items-center justify-between gap-6">

                    {/* Back Button (Absolute Top Left) */}
                    {!isLanding && (
                        <button
                            onClick={() => window.history.back()}
                            className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110 z-50 ${isTransparent ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-light-grey/30 text-primary-black dark:text-white hover:bg-light-grey/50 dark:hover:bg-dark-border'}`}
                            title="Go Back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group shrink-0 ml-10 md:ml-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg shadow-md transition-all group-hover:scale-110 duration-300 ${isTransparent ? 'bg-white text-primary-black' : 'bg-primary-black dark:bg-gold text-white dark:text-black'}`}>
                            B
                        </div>
                        <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-primary-black dark:text-white'}`}>
                            BRICKLANE<span className={`font-normal ml-1 ${isTransparent ? 'text-white/70' : 'text-neutral-grey dark:text-neutral-grey/80'}`}>co.</span>
                        </span>
                    </Link>

                    {/* Desktop Center Pills Nav */}
                    <div className="hidden md:flex items-center gap-1 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm">
                        {navLinks.map(link => (
                            <NavItem
                                key={link.to}
                                to={link.to}
                                label={link.label}
                                className={`px-4 py-2 text-base font-bold transition-all duration-200 ${isTransparent
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-neutral-grey hover:text-primary-black dark:hover:text-white hover:bg-light-grey/50 dark:hover:bg-white/5'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        {/* Wishlist */}
                        <Magnetic strength={0.4}>
                            <Link
                                to="/wishlist"
                                className={`relative p-2.5 rounded-full transition-all duration-200 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-primary-black dark:text-white hover:bg-light-grey dark:hover:bg-white/10'}`}
                                title="Wishlist"
                            >
                                <Heart size={20} />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>
                        </Magnetic>

                        {/* Search */}
                        <Magnetic strength={0.4}>
                            <Link
                                to="/search"
                                className={`p-2.5 rounded-full transition-all duration-200 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-primary-black dark:text-white hover:bg-light-grey dark:hover:bg-white/10'}`}
                                title="Search"
                            >
                                <Search size={20} />
                            </Link>
                        </Magnetic>

                        <div className={`h-6 w-px mx-1 ${isTransparent ? 'bg-white/30' : 'bg-light-grey dark:bg-dark-border/50'}`} />

                        {/* Theme Toggle */}
                        <Magnetic strength={0.4}>
                            <button
                                onClick={toggleTheme}
                                id="theme-toggle"
                                className={`p-2.5 rounded-full transition-all duration-200 ${isTransparent ? 'text-white hover:bg-white/20' : 'text-primary-black dark:text-white hover:bg-light-grey dark:hover:bg-white/10'}`}
                                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-gold" />}
                            </button>
                        </Magnetic>

                        <div className={`h-6 w-px mx-1 ${isTransparent ? 'bg-white/30' : 'bg-light-grey dark:bg-dark-border/50'}`} />

                        {/* Auth Button */}
                        {isLoggedIn ? (
                            <div className="flex items-center gap-5 ml-2">
                                <Link to="/wishlist" className={`text-sm font-bold transition-opacity hover:opacity-70 ${isTransparent ? 'text-white' : 'text-primary-black'}`}>
                                    Hello, {user?.name}
                                </Link>
                                <Magnetic strength={0.25}>
                                    <button
                                        onClick={logout}
                                        title="Sign Out"
                                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${isTransparent ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-light-grey dark:bg-dark-surface text-primary-black dark:text-white hover:bg-primary-black dark:hover:bg-gold hover:text-white dark:hover:text-black'}`}
                                    >
                                        <LogOut size={15} />
                                        Sign Out
                                    </button>
                                </Magnetic>
                            </div>
                        ) : (
                            <Magnetic strength={0.25}>
                                <Link to="/signin" className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95 duration-200 ${isTransparent ? 'bg-white text-primary-black hover:bg-white/90' : 'bg-primary-black dark:bg-gold text-white dark:text-black hover:bg-neutral-grey dark:hover:bg-gold-hover'}`}>
                                    <User size={16} />
                                    Sign In
                                </Link>
                            </Magnetic>
                        )}
                    </div>

                    {/* Mobile Actions */}
                    <div className="md:hidden flex items-center gap-2">
                        <Link to="/wishlist" className={`relative p-2 rounded-full transition-colors ${isTransparent ? 'text-white' : 'text-primary-black dark:text-white'}`}>
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
                    <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-b border-light-grey dark:border-dark-border p-6 flex flex-col gap-2 shadow-2xl z-40 h-[calc(100vh-80px)] overflow-y-auto">
                        {navLinks.map(link => (
                            <NavItem
                                key={link.to}
                                to={link.to}
                                label={link.label}
                                className="text-lg font-bold p-3 hover:bg-light-grey dark:hover:bg-white/5 rounded-xl transition-colors text-primary-black dark:text-white text-left w-full block"
                            />
                        ))}
                        <div className="mt-auto pt-4 border-t border-light-grey dark:border-dark-border pb-8 space-y-3">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-between w-full p-4 rounded-xl bg-light-grey/30 dark:bg-white/5 border border-light-grey dark:border-dark-border transition-colors mb-4"
                            >
                                <div className="flex items-center gap-3">
                                    {theme === 'light' ? <Moon size={20} className="text-primary-black" /> : <Sun size={20} className="text-gold" />}
                                    <span className="font-bold text-primary-black dark:text-white">
                                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                                    </span>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-gold' : 'bg-neutral-grey/30'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
                                </div>
                            </button>
                            {isLoggedIn ? (
                                <>
                                    <p className="text-center text-sm font-bold text-primary-black dark:text-white">Hello, <span className="text-neutral-grey dark:text-neutral-grey/60">{user?.name}</span></p>
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="flex items-center justify-center gap-2 border border-light-grey dark:border-dark-border text-primary-black dark:text-white px-5 py-4 rounded-full text-lg font-bold w-full hover:bg-light-grey dark:hover:bg-white/5 transition-colors"
                                    >
                                        <LogOut size={20} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link to="/signin" className="flex items-center justify-center gap-2 bg-primary-black dark:bg-gold text-white dark:text-black px-5 py-4 rounded-full text-lg font-bold w-full shadow-lg hvr-grow active:scale-95 transition-all" onClick={() => setIsOpen(false)}>
                                    <User size={20} />
                                    Sign In / Register
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
