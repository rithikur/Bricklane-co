import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import RevealText from './common/RevealText';

const posts = [
    {
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
        category: "Interior Design",
        title: "Top 10 Trends for Modern Living Rooms in 2026",
        date: "Feb 18, 2026"
    },
    {
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2053",
        category: "Real Estate",
        title: "How to Choose the Right Neighborhood for Your Family",
        date: "Feb 15, 2026"
    },
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
        category: "Architecture",
        title: "Sustainable Architecture: The Future of Eco-Friendly Homes",
        date: "Feb 10, 2026"
    },
    {
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2070",
        category: "Market Watch",
        title: "Understanding Property Taxes: A Comprehensive Guide",
        date: "Feb 05, 2026"
    },
    {
        image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=2070",
        category: "Lifestyle",
        title: "Creating a Home Office That Boosts Productivity",
        date: "Jan 28, 2026"
    },
    {
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=2070",
        category: "Renovation",
        title: "5 Renovations That Add the Most Value to Your Home",
        date: "Jan 15, 2026"
    }
];

const BlogSection = ({ showAll = false }: { showAll?: boolean }) => {
    // Show only first 3 posts if showAll is false
    const displayPosts = showAll ? posts : posts.slice(0, 3);

    return (
        <section id="blog" className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <RevealText as="h2" className="text-3xl md:text-4xl font-bold text-primary-black mb-4">
                            {showAll ? "All Articles" : "Latest from Our Blog"}
                        </RevealText>
                        <RevealText as="p" className="text-neutral-grey text-base md:text-lg max-w-xl" delay={0.2}>
                            Insights, tips, and trends from the world of real estate and design.
                        </RevealText>
                    </div>
                    {!showAll && (
                        <Link to="/blog" className="hidden md:flex items-center gap-2 font-bold text-primary-black border-b-2 border-primary-black pb-1 hover:text-neutral-grey hover:border-neutral-grey transition-colors">
                            View all articles <ArrowRight size={20} />
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[3/2] overflow-hidden rounded-std mb-4 bg-light-grey">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-xs font-bold text-primary-black uppercase tracking-wider">{post.category}</span>
                                <span className="text-xs font-medium text-neutral-grey">{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-black leading-tight group-hover:underline decoration-2 underline-offset-4">{post.title}</h3>
                        </motion.div>
                    ))}
                </div>

                {!showAll && (
                    <div className="mt-12 md:hidden flex justify-center">
                        <Link to="/blog" className="flex items-center gap-2 font-bold text-primary-black border-b-2 border-primary-black pb-1">
                            View all articles <ArrowRight size={20} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
