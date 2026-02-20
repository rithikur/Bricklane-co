import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import HelpSection from '../components/HelpSection';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ReviewSection from '../components/ReviewSection';

const LandingPage = () => {
    return (
        <div className="min-h-screen font-display bg-white">
            <Navbar />
            <Hero />
            <FeaturedSection />
            <StatsSection />
            <ServicesSection />
            <AboutSection />
            <ReviewSection />
            <BlogSection />
            <HelpSection />
            <Footer />
            <Chatbot />
        </div>
    );
};

export default LandingPage;
