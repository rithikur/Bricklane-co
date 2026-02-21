import Navbar from '../components/Navbar';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
    return (
        <div className="min-h-screen font-display bg-white">
            <Navbar />
            <div className="pt-10 pb-20">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-primary-black mb-6">Our Premium Services</h1>
                    <p className="text-xl text-neutral-grey max-w-3xl">
                        At Bricklane co., we go beyond traditional real estate. We offer a full suite of services designed to make your property journey seamless and successful.
                    </p>
                </div>

                <ServicesSection />

                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-primary-black mb-4">Concierge Service</h2>
                        <p className="text-neutral-grey text-lg leading-relaxed mb-6">
                            Our dedicated concierge team is here to assist you with every aspect of your move. From setting up utilities to finding the best local schools, we've got you covered.
                        </p>
                        <Link to="/contact" className="inline-block bg-primary-black text-white px-8 py-3 rounded-std font-bold hover:bg-neutral-grey transition-colors">
                            Contact Concierge
                        </Link>
                    </div>
                    <div className="h-96 rounded-std overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"
                            alt="Concierge"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ServicesPage;
