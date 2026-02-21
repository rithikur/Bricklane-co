import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Premium real-estate lifestyle photos
const HERO_IMG = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=90&w=1600';
const SIDE_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900';
const ACCENT_IMG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600';

const stats = [
    { value: '₹250Cr+', label: 'Property Sold' },
    { value: '1,200+', label: 'Happy Families' },
    { value: '15+', label: 'Awards Won' },
    { value: '4', label: 'Cities' },
];

const values = [
    { num: '01', title: 'Design First', body: 'We believe aesthetics matter. From our digital platform to the properties we curate, design is at the heart of everything we do.' },
    { num: '02', title: 'Radical Transparency', body: 'No hidden fees, no ambiguous terms. We provide clear, data-backed insights so you can make confident decisions.' },
    { num: '03', title: 'Client Obsessed', body: 'We measure success by client satisfaction, not sales volume. Your journey is our priority, always.' },
];

const team = [
    { name: 'Sarah Jenkins', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' },
    { name: 'David Chen', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600' },
    { name: 'Emily Rodriguez', role: 'Design Director', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600' },
];

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: 'easeOut' as const, delay },
});

const AboutPage = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

    return (
        <div className="min-h-screen font-display bg-white overflow-x-hidden">
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section ref={heroRef} className="relative h-[92vh] min-h-[620px] flex items-end overflow-hidden">
                {/* Parallax background */}
                <motion.div style={{ y: heroY }} className="absolute inset-0 will-change-transform">
                    <img
                        src={HERO_IMG}
                        alt="Luxury property"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </motion.div>

                {/* Floating label */}
                <div className="absolute top-32 left-8 md:left-16 z-10">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">Who We Are</span>
                </div>

                {/* Hero text — bottom-left editorial */}
                <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16 pb-16 w-full">
                    <motion.h1
                        {...fade(0.1)}
                        className="text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.92] text-white tracking-tight mb-6"
                    >
                        Rear&shy;ranging<br />
                        <span className="italic font-light text-white/70">Real Estate</span>
                    </motion.h1>

                    <motion.div {...fade(0.25)} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
                        <p className="text-white/75 text-lg md:text-xl max-w-lg leading-relaxed">
                            We are Bricklane co. — a modern agency that fuses technology with a human touch to deliver an experience as beautiful as the homes we represent.
                        </p>

                        {/* Inline stats strip */}
                        <div className="flex gap-8 shrink-0">
                            {stats.slice(0, 2).map(s => (
                                <div key={s.label}>
                                    <p className="text-white text-3xl font-bold">{s.value}</p>
                                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Scroll cue */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute bottom-8 right-10 z-10 flex flex-col items-center gap-2"
                >
                    <div className="w-px h-12 bg-white/30 rounded-full" />
                    <span className="text-white/40 text-[10px] uppercase tracking-widest rotate-90 origin-center translate-x-4">scroll</span>
                </motion.div>
            </section>

            {/* ── STAT BAR ───────────────────────────────────────────── */}
            <section className="bg-primary-black py-10">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <motion.div key={s.label} {...fade(i * 0.08)} className="text-center md:text-left">
                            <p className="text-4xl font-bold text-white">{s.value}</p>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── STORY SECTION ──────────────────────────────────────── */}
            <section className="max-w-[1440px] mx-auto px-8 md:px-16 py-28 grid md:grid-cols-2 gap-16 items-center">
                {/* Left — stacked images */}
                <motion.div {...fade(0)} className="relative h-[520px]">
                    <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                        <img src={SIDE_IMG} alt="Luxury interior" className="w-full h-full object-cover" />
                    </div>
                    {/* Floating accent */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute -bottom-8 -right-8 w-52 h-52 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-2xl"
                    >
                        <img src={ACCENT_IMG} alt="Detail" className="w-full h-full object-cover" />
                    </motion.div>
                    {/* Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                        <span className="text-xs font-bold text-neutral-grey uppercase tracking-widest">Est. 2016</span>
                    </div>
                </motion.div>

                {/* Right — copy */}
                <div className="md:pl-8">
                    <motion.p {...fade(0)} className="text-xs font-bold text-neutral-grey uppercase tracking-[0.2em] mb-4">Our Story</motion.p>
                    <motion.h2 {...fade(0.1)} className="text-4xl md:text-5xl font-bold text-primary-black leading-tight mb-8">
                        A decade of<br /><span className="italic font-light text-neutral-grey">excellence</span>
                    </motion.h2>
                    <motion.p {...fade(0.18)} className="text-neutral-grey text-lg leading-relaxed mb-6">
                        Founded in Mumbai with a boutique philosophy, Bricklane began with a simple conviction: finding a home should feel as beautiful as the home itself.
                    </motion.p>
                    <motion.p {...fade(0.24)} className="text-neutral-grey text-lg leading-relaxed mb-8">
                        Today we're a premier platform connecting discerning buyers with exceptional properties across India's most vibrant cities — always with curated collections, high-fidelity imagery, and radical transparency.
                    </motion.p>
                    <motion.div {...fade(0.3)} className="flex items-center gap-4">
                        <div className="w-12 h-px bg-primary-black" />
                        <span className="text-sm font-bold text-primary-black uppercase tracking-widest">Bricklane co. 2016–present</span>
                    </motion.div>
                </div>
            </section>

            {/* ── MISSION CARD ───────────────────────────────────────── */}
            <section className="mx-8 md:mx-16 mb-24 rounded-[2.5rem] overflow-hidden relative">
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
                    alt="Mission"
                    className="w-full h-[420px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20">
                    <motion.p {...fade(0)} className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Mission</motion.p>
                    <motion.h2 {...fade(0.1)} className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
                        Empowering people to find their perfect home through transparency, innovation, and design.
                    </motion.h2>
                </div>
            </section>

            {/* ── VALUES ────────────────────────────────────────────── */}
            <section className="bg-primary-black py-28 mb-0">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16">
                    <motion.h2 {...fade()} className="text-4xl md:text-5xl font-bold text-white mb-20 text-center">
                        Core <span className="italic font-light text-white/50">Values</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.num}
                                {...fade(i * 0.1)}
                                className="group border border-white/10 p-10 hover:bg-white/5 transition-colors rounded-3xl"
                            >
                                <span className="block text-6xl font-bold text-white/8 mb-8 group-hover:text-white/15 transition-colors">{v.num}</span>
                                <h3 className="text-2xl font-bold text-white mb-4">{v.title}</h3>
                                <p className="text-white/55 leading-relaxed">{v.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEAM ──────────────────────────────────────────────── */}
            <section className="max-w-[1440px] mx-auto px-8 md:px-16 py-28">
                <motion.div {...fade()} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <p className="text-xs font-bold text-neutral-grey uppercase tracking-[0.2em] mb-3">The People</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary-black leading-tight">
                            Meet the<br /><span className="italic font-light text-neutral-grey">leadership</span>
                        </h2>
                    </div>
                    <p className="text-neutral-grey text-lg max-w-sm leading-relaxed">
                        A team of architects, designers, and market analysts committed to one mission.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((m, i) => (
                        <motion.div key={m.name} {...fade(i * 0.1)} className="group">
                            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-5 relative">
                                <img
                                    src={m.img}
                                    alt={m.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-white font-bold">{m.name}</p>
                                    <p className="text-white/70 text-sm">{m.role}</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary-black">{m.name}</h3>
                            <p className="text-neutral-grey font-medium text-sm mt-1">{m.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
