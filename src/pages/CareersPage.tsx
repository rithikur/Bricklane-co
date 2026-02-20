
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CareersPage = () => {
    return (
        <div className="min-h-screen bg-white font-display flex flex-col text-primary-black">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6 container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-24"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Join the Architects of Luxury.</h1>
                    <p className="text-xl md:text-2xl text-neutral-grey leading-relaxed">
                        We are building the future of premium real estate. We are looking for visionaries, innovators, and creators to help us reshape how the world discovers extraordinary homes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border border-light-grey rounded-std hover:border-primary-black transition-colors group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Engineering</span>
                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Senior Frontend Engineer</h3>
                        <p className="text-neutral-grey mb-6">Mumbai • Remote Friendly</p>
                        <p className="text-primary-black/80">Lead the development of our core property discovery platform using React, TypeScript, and modern web technologies.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border border-light-grey rounded-std hover:border-primary-black transition-colors group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Design</span>
                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Product Designer</h3>
                        <p className="text-neutral-grey mb-6">Mumbai • Remote Friendly</p>
                        <p className="text-primary-black/80">Shape the visual language of Bricklane and create intuitive, beautiful experiences for discerning clients.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border border-light-grey rounded-std hover:border-primary-black transition-colors group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Sales</span>
                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Luxury Property Consultant</h3>
                        <p className="text-neutral-grey mb-6">Mumbai • On-site</p>
                        <p className="text-primary-black/80">Work directly with high-net-worth individuals to help them find their dream properties in South Mumbai.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 border border-light-grey rounded-std hover:border-primary-black transition-colors group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Marketing</span>
                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Brand Manager</h3>
                        <p className="text-neutral-grey mb-6">Mumbai • Hybrid</p>
                        <p className="text-primary-black/80">Define and execute our brand strategy to maintain Bricklane's position as the premier luxury real estate platform.</p>
                    </motion.div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Don't see your role?</h2>
                    <p className="text-neutral-grey mb-8">We are always looking for exceptional talent. Send your portfolio to careers@bricklane.co</p>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default CareersPage;
