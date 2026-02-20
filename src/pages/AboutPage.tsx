import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <div className="min-h-screen font-display bg-white">
            <Navbar />
            <div className="pt-20 pb-20">
                {/* Hero Section */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-20 flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-primary-black mb-8">Rearranging Real Estate</h1>
                    <p className="text-2xl text-neutral-grey max-w-4xl mx-auto leading-relaxed">
                        We are Bricklane co. A modern real estate agency that combines technology with a human touch to deliver an exceptional experience.
                    </p>
                </div>

                {/* Image Grid */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-[500px] rounded-std overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" alt="Office" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-[500px] rounded-std overflow-hidden flex flex-col justify-center bg-light-grey/20 p-12">
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg text-neutral-grey leading-relaxed">
                            To empower people to find their perfect home through transparency, innovation, and design. We believe that finding a home should be an inspiring journey, not a stressful chore.
                        </p>
                    </div>
                </div>

                {/* Our Story & Stats */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-24 flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-black">A Decade of Excellence</h2>
                        <p className="text-lg text-neutral-grey leading-relaxed mb-6">
                            Founded in 2016, Bricklane began with a simple idea: that finding a home should be as beautiful as the home itself. What started as a boutique agency in South Mumbai has grown into a premier real estate platform, connecting discerning buyers with exceptional properties across India's most vibrant cities.
                        </p>
                        <p className="text-lg text-neutral-grey leading-relaxed">
                            We've replaced the clutter of traditional listings with curated collections, high-fidelity imagery, and transparent data. Our team of architects, designers, and market analysts work together to ensure every property we represent meets our exacting standards.
                        </p>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-6">
                        <div className="p-8 bg-light-grey/30 rounded-std border border-light-grey text-center">
                            <span className="block text-4xl md:text-5xl font-bold text-primary-black mb-2">₹250Cr+</span>
                            <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Property Sold</span>
                        </div>
                        <div className="p-8 bg-light-grey/30 rounded-std border border-light-grey text-center">
                            <span className="block text-4xl md:text-5xl font-bold text-primary-black mb-2">1,200+</span>
                            <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Happy Families</span>
                        </div>
                        <div className="p-8 bg-light-grey/30 rounded-std border border-light-grey text-center">
                            <span className="block text-4xl md:text-5xl font-bold text-primary-black mb-2">15+</span>
                            <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Awards Won</span>
                        </div>
                        <div className="p-8 bg-light-grey/30 rounded-std border border-light-grey text-center">
                            <span className="block text-4xl md:text-5xl font-bold text-primary-black mb-2">4</span>
                            <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Cities</span>
                        </div>
                    </div>
                </div>

                {/* Our Values - New Section */}
                <div className="bg-primary-black py-24 mb-24 text-white">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="text-center md:text-left">
                                <span className="block text-7xl font-bold text-white/10 mb-6">01</span>
                                <h3 className="text-2xl font-bold mb-4">Design First</h3>
                                <p className="text-white/70 leading-relaxed">We believe aesthetics matter. From our digital platform to the properties we curate, design is at the heart of everything we do.</p>
                            </div>
                            <div className="text-center md:text-left">
                                <span className="block text-7xl font-bold text-white/10 mb-6">02</span>
                                <h3 className="text-2xl font-bold mb-4">Radical Transparency</h3>
                                <p className="text-white/70 leading-relaxed">No hidden fees, no ambiguous terms. We provide clear, data-backed insights to help you make informed decisions.</p>
                            </div>
                            <div className="text-center md:text-left">
                                <span className="block text-7xl font-bold text-white/10 mb-6">03</span>
                                <h3 className="text-2xl font-bold mb-4">Client Obsessed</h3>
                                <p className="text-white/70 leading-relaxed">We measure our success not by sales volume, but by the satisfaction of our clients. Your journey is our priority.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-primary-black mb-12 text-center">Meet the Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Jenkins", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" },
                            { name: "David Chen", role: "Head of Sales", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" },
                            { name: "Emily Rodriguez", role: "Design Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" }
                        ].map((member, index) => (
                            <div key={index} className="group">
                                <div className="aspect-[3/4] rounded-std overflow-hidden mb-4 bg-light-grey">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-black">{member.name}</h3>
                                <p className="text-neutral-grey font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;
