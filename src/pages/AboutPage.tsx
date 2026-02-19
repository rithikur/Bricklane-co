import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <div className="min-h-screen font-display bg-white">
            <Navbar />
            <div className="pt-20 pb-20">
                {/* Hero Section */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-20 text-center">
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
