import { useState } from 'react';
import { Search, Star, MapPin, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RevealText from './common/RevealText';

const Hero = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search?location=${searchQuery}`);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
    };

    const item = {
        hidden: { y: 30, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: 'easeOut' as const } }
    };

    const popularLocations = ['Bandra', 'Juhu', 'Powai', 'Worli', 'Andheri'];

    return (
        <section className="relative h-[calc(100vh-80px)] min-h-[720px] w-full overflow-hidden -mt-20">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2053"
                    alt="Premium Real Estate"
                    className="w-full h-full object-cover scale-105"
                    style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }}
                />
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Content */}
            <div className="relative h-full flex items-center min-h-screen pt-24 md:pt-20 pb-10">
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Text */}
                    <motion.div variants={container} initial="hidden" animate="show" className="text-white pt-10 md:pt-0">
                        <motion.div variants={item}>
                            <span className="inline-flex items-center gap-2 bg-white/10 dark:bg-gold/10 backdrop-blur-sm border border-white/20 dark:border-gold/30 text-white/90 dark:text-gold text-[10px] md:text-xs font-bold tracking-widest px-3 md:px-4 py-2 rounded-full mb-6">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                PREMIUM REAL ESTATE MARKETPLACE
                            </span>
                        </motion.div>

                        <div className="mb-6">
                            <RevealText as="h1" className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-white" delay={0.1}>
                                FIND YOUR DREAM HOME
                            </RevealText>
                        </div>

                        <RevealText as="p" className="text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-md mb-8" delay={0.4}>
                            Discover over 12,000+ premium properties in the most exclusive neighborhoods across India.
                        </RevealText>
                        {/* Search Bar - Redesigned for a unique floating glass look */}
                        <motion.form
                            variants={item}
                            onSubmit={handleSearch}
                            className="relative w-[92%] sm:w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-row items-center p-2 mb-10 gap-2 group transition-all duration-500 hover:bg-white/15 focus-within:bg-white/20 focus-within:border-white/40"
                        >
                            <div className="flex items-center gap-2 pl-3 pr-2 border-r border-white/20 shrink-0">
                                <MapPin size={18} className="text-gold" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search city or area..."
                                className="flex-1 h-12 px-2 text-white placeholder-white/50 focus:outline-none text-base font-medium bg-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-white dark:bg-gold text-primary-black h-12 px-6 rounded-xl flex items-center justify-center font-bold hover:bg-gold dark:hover:bg-gold-hover transition-all shrink-0 active:scale-95 duration-200"
                            >
                                <span className="hidden sm:inline mr-2">Search</span>
                                <Search size={18} />
                            </button>
                        </motion.form>

                        {/* Popular Searches */}
                        <motion.div variants={item} className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                            <span className="text-white/50 text-xs font-bold uppercase tracking-wider hidden sm:inline">Popular:</span>
                            {popularLocations.map(loc => (
                                <button
                                    key={loc}
                                    onClick={() => navigate(`/search?location=${loc}`)}
                                    className="text-xs font-bold text-white/80 hover:text-white bg-white/10 dark:bg-gold/10 hover:bg-white/20 dark:hover:bg-gold/20 border border-white/20 dark:border-gold/30 px-3 py-1.5 rounded-full transition-all"
                                >
                                    {loc}
                                </button>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right — Floating Stats Cards (Now visible on mobile with adjusted layout) */}
                    <div className="flex flex-col items-center lg:items-end gap-6 relative">
                        {/* Stats Strip */}
                        <motion.div
                            initial={{ x: 60, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap justify-center lg:justify-end gap-3 md:gap-4"
                        >
                            {[
                                { value: '12k+', label: 'Properties', icon: <MapPin size={16} /> },
                                { value: '8k+', label: 'Happy Clients', icon: <Star size={16} fill="currentColor" /> },
                                { value: '98%', label: 'Satisfaction', icon: <TrendingUp size={16} /> },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 md:px-6 py-3 md:py-4 rounded-std text-center min-w-[90px] md:min-w-[100px]"
                                >
                                    <div className="text-white/60 flex justify-center mb-1">{stat.icon}</div>
                                    <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                                    <p className="text-[10px] md:text-xs text-white/60 font-medium uppercase tracking-wide">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md p-5 rounded-std shadow-2xl max-w-[280px] sm:max-w-xs border border-white/50 dark:border-dark-border w-full"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-light-grey border-2 border-white overflow-hidden shadow">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={10} md:size={12} className="text-yellow-400" fill="currentColor" />
                                    ))}
                                    <span className="text-[10px] md:text-xs font-bold text-neutral-grey dark:text-neutral-grey/60 ml-1">4.9</span>
                                </div>
                            </div>
                            <p className="text-xs md:text-sm font-bold text-primary-black dark:text-white leading-relaxed">
                                "Found my dream penthouse in just 2 days. Best real estate experience!"
                            </p>
                            <p className="text-[10px] md:text-xs text-neutral-grey dark:text-neutral-grey/60 font-medium mt-2">— Priya S., Mumbai</p>
                        </motion.div>

                        {/* Trust Badge */}
                        <motion.div
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2.5 rounded-full text-[10px] md:text-xs font-bold"
                        >
                            <Shield size={14} className="text-green-400" />
                            Verified listings · No hidden fees
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Removed */}

            <style>{`
                @keyframes slowZoom {
                    from { transform: scale(1.05); }
                    to { transform: scale(1.12); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
