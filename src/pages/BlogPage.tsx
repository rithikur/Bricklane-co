import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogSection from '../components/BlogSection';

const BlogPage = () => {
    return (
        <div className="min-h-screen font-display bg-white">
            <Navbar />
            <div className="pt-10 pb-20">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-primary-black mb-6">The Bricklane Journal</h1>
                    <p className="text-xl text-neutral-grey max-w-2xl mx-auto">
                        Stories, interviews, and deep dives into the world of modern living, architecture, and design.
                    </p>
                </div>

                <BlogSection showAll={true} />

                {/* Additional Blog Content */}
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-20">
                    <div className="bg-primary-black text-white rounded-std p-12 md:p-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to our newsletter</h2>
                        <p className="text-lg text-neutral-grey mb-8 max-w-xl mx-auto">Get the latest articles and property insights delivered straight to your inbox.</p>
                        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                            <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-3 rounded-std text-primary-black focus:outline-none" />
                            <button className="bg-white text-primary-black px-8 py-3 rounded-std font-bold hover:bg-light-grey transition-colors">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogPage;
