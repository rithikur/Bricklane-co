import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
];

const BlogSection = () => {
    return (
        <section id="blog" className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-black mb-4">Latest from Our Blog</h2>
                        <p className="text-neutral-grey text-base md:text-lg max-w-xl">Insights, tips, and trends from the world of real estate and design.</p>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 font-bold text-primary-black border-b-2 border-primary-black pb-1 hover:text-neutral-grey hover:border-neutral-grey transition-colors">
                        View all articles <ArrowRight size={20} />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
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

                <div className="mt-12 md:hidden flex justify-center">
                    <a href="#" className="flex items-center gap-2 font-bold text-primary-black border-b-2 border-primary-black pb-1">
                        View all articles <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
