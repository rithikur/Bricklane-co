import { MapPin, Calendar, Globe, Award } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10">
                {/* Hero Section */}
                <div className="mb-12 md:mb-20 text-center">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-neutral-grey uppercase mb-4 block">Who We Are</span>
                    <h2 className="text-3xl md:text-6xl font-bold text-primary-black mb-6 md:mb-8">Rearranging Real Estate</h2>
                    <p className="text-lg md:text-xl text-neutral-grey max-w-4xl mx-auto leading-relaxed">
                        We are Bricklane co. A modern real estate agency that combines technology with a human touch to deliver an exceptional experience. We believe that finding a home should be an inspiring journey, not a stressful chore.
                    </p>
                </div>

                {/* Image Grid */}
                <div className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="h-[300px] md:h-[500px] rounded-3xl overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" alt="Office" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="h-auto md:h-[500px] rounded-3xl overflow-hidden flex flex-col justify-center bg-light-grey/30 p-8 md:p-12 hover:bg-light-grey/50 transition-colors">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-black">Our Mission</h3>
                        <p className="text-base md:text-lg text-neutral-grey leading-relaxed">
                            To empower people to find their perfect home through transparency, innovation, and design. We are committed to rebuilding the trust in the real estate market by providing verified listings and honest advice.
                        </p>
                    </div>
                </div>

                {/* Company Details Section replacing Team */}
                <div>
                    <h3 className="text-3xl font-bold text-primary-black mb-12 text-center">Company Overview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <MapPin size={32} />, title: "Headquarters", value: "Mumbai, India", desc: "Heart of the financial district" },
                            { icon: <Calendar size={32} />, title: "Founded", value: "2018", desc: "Redefining the market since day one" },
                            { icon: <Globe size={32} />, title: "Presence", value: "12 Cities", desc: "Across India and expanding globally" },
                            { icon: <Award size={32} />, title: "Recognition", value: "Best PropTech", desc: "Awarded by Real Estate Summit 2024" }
                        ].map((item, index) => (
                            <div key={index} className="bg-white border border-light-grey rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 group">
                                <div className="w-14 h-14 bg-primary-black text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h4 className="text-neutral-grey text-sm font-bold uppercase tracking-wider mb-2">{item.title}</h4>
                                <p className="text-2xl font-bold text-primary-black mb-1">{item.value}</p>
                                <p className="text-neutral-grey text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
