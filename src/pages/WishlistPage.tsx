import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
    const { properties, wishlist } = useProperties();

    const wishlistedProperties = properties.filter(property => wishlist.includes(property.id));

    return (
        <div className="min-h-screen font-display bg-white flex flex-col">
            <Navbar />

            <div className="flex-grow pt-28 pb-20">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                            <Heart size={20} fill="currentColor" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary-black">Your Wishlist</h1>
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
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-light-grey/20 rounded-3xl">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-neutral-grey">
                                <Heart size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-primary-black mb-2">No saved properties yet</h2>
                            <p className="text-neutral-grey mb-8">Start exploring and save properties you love.</p>
                            <Link
                                to="/search"
                                className="inline-block bg-primary-black text-white px-8 py-3 rounded-full font-bold hover:bg-neutral-grey transition-colors"
                            >
                                Browse Properties
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default WishlistPage;
