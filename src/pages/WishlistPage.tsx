import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
    const { properties, wishlist } = useProperties();
    const { isLoggedIn } = useAuth();

    const wishlistedProperties = properties.filter(property => wishlist.includes(property.id));

    return (
        <div className="min-h-screen font-display bg-white dark:bg-dark-bg transition-colors flex flex-col">
            <Navbar />

            <div className="flex-grow pt-28 pb-20">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    {!isLoggedIn ? (
                        <div className="text-center py-20 flex flex-col items-center">
                            <h1 className="text-3xl font-bold text-primary-black dark:text-white mb-3">Sign in to view your wishlist</h1>
                            <p className="text-neutral-grey leading-relaxed mb-10 max-w-sm mx-auto">
                                Save your favorite properties and access them anytime from your private collection.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                                <Link
                                    to="/signin?from=/wishlist"
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary-black dark:bg-gold text-white dark:text-black py-3.5 rounded-xl font-bold hover:bg-neutral-grey dark:hover:bg-gold-hover transition-colors group"
                                >
                                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/signup?from=/wishlist"
                                    className="flex-1 flex items-center justify-center border border-light-grey dark:border-dark-border text-primary-black dark:text-white py-3.5 rounded-xl font-bold hover:border-primary-black dark:hover:border-gold transition-colors"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                                    <Heart size={20} fill="currentColor" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-primary-black dark:text-white">Your Wishlist</h1>
                            </div>

                            {wishlistedProperties.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {wishlistedProperties.map(property => (
                                        <PropertyCard
                                            key={property.id}
                                            id={property.id}
                                            price={property.price}
                                            address={property.address}
                                            rooms={property.rooms}
                                            baths={property.baths}
                                            area={property.area}
                                            image={property.image}
                                            isExclusive={property.isExclusive}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-light-grey/20 dark:bg-dark-surface rounded-3xl">
                                    <div className="w-16 h-16 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-neutral-grey dark:text-gold">
                                        <Heart size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-primary-black dark:text-white mb-2">No saved properties yet</h2>
                                    <p className="text-neutral-grey mb-8">Start exploring and save properties you love.</p>
                                    <Link
                                        to="/search"
                                        className="inline-block bg-primary-black dark:bg-gold text-white dark:text-black px-8 py-3 rounded-full font-bold hover:bg-neutral-grey dark:hover:bg-gold-hover transition-colors"
                                    >
                                        Browse Properties
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default WishlistPage;
