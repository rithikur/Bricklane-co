import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen font-display bg-white">
            <Navbar />
            <Hero />
            <FeaturedSection />
            <StatsSection />
            <ServicesSection />
            <BlogSection />
            <Footer />
        </div>
    );
};

export default LandingPage;
