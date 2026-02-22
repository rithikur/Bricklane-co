
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PressPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg font-display text-primary-black dark:text-white transition-colors">
            <Navbar />

            <main className="container mx-auto px-6 py-32 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center max-w-3xl mx-auto"
                >
                    <h1 className="text-6xl font-bold mb-8 dark:text-white">Bricklane in the News.</h1>
                    <p className="text-xl text-neutral-grey leading-relaxed">
                        Explore our latest features, company news, and insights into the future of luxury real estate as covered by leading publications.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="py-12 border-t border-light-grey dark:border-dark-border flex flex-col md:flex-row gap-8 group"
                    >
                        <div className="w-full md:w-1/3">
                            <span className="text-sm font-bold text-neutral-grey dark:text-neutral-grey/60 uppercase tracking-wider block mb-2">Architectural Digest</span>
                            <span className="text-primary-black dark:text-white/80 block text-sm">October 15, 2024</span>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl font-bold mb-4 group-hover:text-neutral-grey dark:group-hover:text-gold transition-colors flex items-center justify-between">
                                Redefining Mumbai's Skyline: The Bricklane Effect
                                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity dark:text-gold" />
                            </h2>
                            <p className="text-lg text-neutral-grey leading-relaxed">
                                How a new platform is bringing transparency and unparalleled curation to India's most expensive real estate market.
                            </p>
                        </div>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="py-12 border-t border-light-grey dark:border-dark-border flex flex-col md:flex-row gap-8 group"
                    >
                        <div className="w-full md:w-1/3">
                            <span className="text-sm font-bold text-neutral-grey dark:text-neutral-grey/60 uppercase tracking-wider block mb-2">Vogue India</span>
                            <span className="text-primary-black dark:text-white/80 block text-sm">September 02, 2024</span>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl font-bold mb-4 group-hover:text-neutral-grey dark:group-hover:text-gold transition-colors flex items-center justify-between">
                                Inside the Homes of Bollywood's Elite
                                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity dark:text-gold" />
                            </h2>
                            <p className="text-lg text-neutral-grey leading-relaxed">
                                An exclusive look at the most coveted properties listed on Bricklane, from sea-facing penthouses to heritage bungalows.
                            </p>
                        </div>
                    </motion.article>

                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="py-12 border-t border-light-grey dark:border-dark-border flex flex-col md:flex-row gap-8 group"
                    >
                        <div className="w-full md:w-1/3">
                            <span className="text-sm font-bold text-neutral-grey dark:text-neutral-grey/60 uppercase tracking-wider block mb-2">Forbes</span>
                            <span className="text-primary-black dark:text-white/80 block text-sm">August 10, 2024</span>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl font-bold mb-4 group-hover:text-neutral-grey dark:group-hover:text-gold transition-colors flex items-center justify-between">
                                The Billion Dollar Listing
                                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity dark:text-gold" />
                            </h2>
                            <p className="text-lg text-neutral-grey leading-relaxed">
                                Detailed analysis on the rise of digital-first luxury brokerages and why Bricklane is leading the charge in South Asia.
                            </p>
                        </div>
                    </motion.article>
                </div>

                <div className="mt-24 pt-12 border-t border-light-grey dark:border-dark-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Media Inquiries</h3>
                            <p className="text-neutral-grey">For interviews and press kits, contact our PR team.</p>
                        </div>
                        <a href="mailto:press@bricklane.co" className="px-8 py-4 bg-primary-black dark:bg-gold text-white dark:text-black font-bold rounded-std hover:bg-neutral-grey dark:hover:bg-gold-hover transition-colors flex items-center gap-2">
                            Contact PR Team <ArrowUpRight size={18} />
                        </a>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default PressPage;
