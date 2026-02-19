import { MapPin, Globe, Award } from 'lucide-react';
import RevealText from './common/RevealText';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10">
                {/* Hero Section */}
                <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-neutral-grey uppercase mb-4 block">Who We Are</span>
                    <RevealText as="h2" className="text-3xl md:text-6xl font-bold text-primary-black mb-6 md:mb-8">
                        Rearranging Real Estate
                    </RevealText>
                    <RevealText as="p" className="text-lg md:text-xl text-neutral-grey max-w-4xl mx-auto leading-relaxed" delay={0.2}>
                        We are Bricklane co. A modern real estate agency that combines technology with a human touch to deliver an exceptional experience. We believe that finding a home should be an inspiring journey, not a stressful chore.
                    </RevealText>
                </div>

                {/* Image Grid */}
                <div className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="h-[300px] md:h-[500px] rounded-std overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" alt="Office" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="h-auto md:h-[500px] rounded-std overflow-hidden flex flex-col justify-center bg-light-grey/30 p-8 md:p-12 hover:bg-light-grey/50 transition-colors">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-black">Our Mission</h3>
                        <p className="text-base md:text-lg text-neutral-grey leading-relaxed">
                            To empower people to find their perfect home through transparency, innovation, and design. We are committed to rebuilding the trust in the real estate market by providing verified listings and honest advice.
                        </p>
                    </div>
                </div>

                {/* Bespoke Company Overview Section */}
                <div>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                        <div>
                            <span className="text-xs font-bold tracking-widest text-neutral-grey uppercase mb-2 block">Company Overview</span>
                            <RevealText as="h3" className="text-3xl md:text-5xl font-bold text-primary-black">
                                Built on Trust, Driven by Design.
                            </RevealText>
                        </div>
                        <p className="max-w-md text-neutral-grey text-lg leading-relaxed">
                            Since 2018, we've been rewriting the rules of Indian real estate, moving from a transaction-first model to a relationship-first approach.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
                        {/* Card 1: Headquarters (Large Dark Card) */}
                        <div className="bg-primary-black text-white p-8 md:p-10 rounded-std md:col-span-3 lg:col-span-4 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500">
                            <div>
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                    <MapPin size={24} />
                                </div>
                                <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Based In</h4>
                                <p className="text-3xl font-bold">Mumbai,<br />India</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-white/60 text-sm">Operating from the heart of BKC's financial district.</p>
                            </div>
                        </div>

                        {/* Card 2: Stats (Light/White Card) */}
                        <div className="bg-light-grey/30 p-8 md:p-10 rounded-std md:col-span-3 lg:col-span-4 flex flex-col justify-center items-center text-center hover:bg-light-grey/50 transition-colors duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-transparent to-black/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                            <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-6 text-primary-black">
                                <Globe size={28} />
                            </div>
                            <h4 className="text-4xl md:text-5xl font-bold text-primary-black mb-2">12+</h4>
                            <p className="text-neutral-grey font-medium uppercase tracking-wide text-sm">Major Cities Covered</p>
                            <p className="text-xs text-neutral-grey mt-4 max-w-[200px]">From Mumbai to Bangalore, we are expanding our footprint.</p>
                        </div>

                        {/* Card 3: Image Card (Visual Interest) */}
                        <div className="bg-gray-100 rounded-std md:col-span-6 lg:col-span-4 relative overflow-hidden group min-h-[300px]">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
                                alt="Modern Architecture"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 md:p-10 flex flex-col justify-end">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">Since 2018</p>
                                    <h4 className="text-white text-2xl font-bold leading-tight">Redefining modern living spaces.</h4>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Recognition (Wide Card) */}
                        <div className="border border-light-grey bg-white p-8 md:p-10 rounded-std md:col-span-6 lg:col-span-8 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg transition-all duration-500">
                            <div className="w-20 h-20 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
                                <Award size={40} />
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-3 mb-3">
                                    <span className="bg-primary-black text-white text-xs font-bold px-3 py-1 rounded-full">2024 WINNER</span>
                                    <span className="bg-light-grey text-neutral-grey text-xs font-bold px-3 py-1 rounded-full">PROPTECH</span>
                                </div>
                                <h4 className="text-2xl font-bold text-primary-black mb-2">Best Real Estate Tech Platform</h4>
                                <p className="text-neutral-grey text-lg">Recognized by the National Real Estate Summit for excellence in digital innovation and customer transparency.</p>
                            </div>
                        </div>

                        {/* Card 5: Culture (Small Card) */}
                        <div className="bg-primary-black text-white p-8 rounded-std md:col-span-6 lg:col-span-4 relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />
                            <h4 className="text-5xl font-bold mb-2">150+</h4>
                            <p className="text-white/60 font-medium mb-6">Expert Agents</p>
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary-black bg-neutral-grey overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Agent" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-primary-black bg-white text-primary-black flex items-center justify-center text-xs font-bold">
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
