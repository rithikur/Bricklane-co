import { useRef } from 'react';
import { Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import RevealText from './common/RevealText';

const reviews = [
    {
        id: 1,
        name: "Aarav Patel",
        role: "Homeowner",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        content: "Finding a home with Bricklane was an absolute dream. Their attention to detail and curated listings saved me so much time. Highly recommended!"
    },
    {
        id: 2,
        name: "Simran Kaur",
        role: "Interior Designer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        content: "As a designer, I appreciate aesthetics and functionality. Bricklane's platform reflects these values perfectly. A seamless experience from start to finish."
    },
    {
        id: 3,
        name: "Vikram Singh",
        role: "Investor",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        rating: 4.5,
        content: "The market insights provided by the team were invaluable. They helped me find a property with great potential for appreciation. Professional and trustworthy."
    },
    {
        id: 4,
        name: "Priya Sharma",
        role: "Tenant",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        content: "I needed a place in Bangalore on short notice. The team understood my requirements perfectly and found me a beautiful apartment in Indiranagar within days."
    },
    {
        id: 5,
        name: "Rahul Deshmukh",
        role: "Expat",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        rating: 4.8,
        content: "Relocating to Mumbai was daunting, but Bricklane made the rental process smooth and transparent. No hidden fees or surprises."
    },
    {
        id: 6,
        name: "Ananya Gupta",
        role: "Student",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        content: "Found the perfect shared flat near my university. The virtual tours were super helpful efficiently narrowing down my choices."
    }
];

const ReviewSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section id="reviews" ref={ref} className="py-20 bg-light-grey/30 dark:bg-dark-bg/50 transition-colors">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold tracking-widest text-neutral-grey dark:text-gold uppercase mb-4 block">Testimonials</span>
                    <RevealText as="h2" className="text-3xl md:text-5xl font-bold text-primary-black dark:text-white mb-6">
                        Loved by Our Clients
                    </RevealText>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.slice(0, 3).map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-white dark:bg-dark-surface p-8 rounded-std border border-light-grey dark:border-dark-border shadow-sm hover:shadow-lg transition-all duration-300 relative group"
                        >
                            <Quote className="absolute top-8 right-8 text-light-grey/50 dark:text-white/5 group-hover:text-primary-black/10 dark:group-hover:text-gold/10 transition-colors" size={40} />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-light-grey dark:border-dark-border">
                                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary-black dark:text-white text-lg">{review.name}</h4>
                                    <p className="text-sm text-neutral-grey dark:text-neutral-grey/60 font-medium">{review.role}</p>
                                </div>
                            </div>

                            <div className="mb-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-xl ${i < Math.floor(review.rating) ? 'text-primary-black dark:text-gold' : 'text-light-grey dark:text-dark-border'}`}>★</span>
                                ))}
                            </div>

                            <p className="text-neutral-grey dark:text-neutral-grey/80 leading-relaxed text-lg italic">"{review.content}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
