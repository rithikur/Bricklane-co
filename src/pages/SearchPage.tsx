import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import MapComponent from '../components/MapComponent';
import { Map, List, Search } from 'lucide-react';

import { properties as initialProperties } from '../data/properties';

const SearchPage = () => {
    const [showMapMobile, setShowMapMobile] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    // Sort State
    const [sortBy, setSortBy] = useState('Relevance');

    // Filters State
    const [listingType, setListingType] = useState('Buy');
    const [priceRange, setPriceRange] = useState([0, 20]); // In Crores
    const [propertyType, setPropertyType] = useState<string[]>(['Apartments', 'Condos', 'Houses', 'Commercial']);
    const [bedrooms, setBedrooms] = useState(1);
    const [view, setView] = useState('Any');

    const locationQuery = searchParams.get('location');

    // Filter Logic
    const filteredProperties = useMemo(() => {
        return initialProperties.filter(property => {
            // Location Filter (from URL)
            if (locationQuery && !property.address.toLowerCase().includes(locationQuery.toLowerCase())) {
                return false;
            }

            // Listing Type Filter (Currently all data is 'Buy')
            if (listingType === 'Rent') return false;

            // Price Filter (Simple numeric check assuming price is stored as string number '4.5')
            const price = parseFloat(property.price);
            if (price < priceRange[0] || price > priceRange[1]) return false;

            // Bedroom Filter (Exact match or greater)
            if (property.rooms < bedrooms) return false;

            // Property Type Filter
            if (propertyType.length > 0 && !propertyType.includes(property.type)) return false;

            // View Filter
            if (view !== 'Any' && property.view !== view) return false;

            return true;
        }).sort((a, b) => {
            if (sortBy === 'Price: Low to High') {
                return parseFloat(a.price) - parseFloat(b.price);
            } else if (sortBy === 'Price: High to Low') {
                return parseFloat(b.price) - parseFloat(a.price);
            }
            return 0; // Relevance (Default order)
        });
    }, [listingType, priceRange, bedrooms, propertyType, view, sortBy, locationQuery]);

    // Derived properties for display (adding Cr suffix)
    const displayProperties = filteredProperties.map(p => ({
        ...p,
        price: `${p.price} Cr`
    }));

    return (
        <div className="h-screen flex flex-col font-display overflow-hidden bg-white">
            <Navbar />
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Filters sidebar - passing props to control it */}
                <SearchFilters
                    listingType={listingType} setListingType={setListingType}
                    priceRange={priceRange} setPriceRange={setPriceRange}
                    propertyType={propertyType} setPropertyType={setPropertyType}
                    bedrooms={bedrooms} setBedrooms={setBedrooms}
                    view={view} setView={setView}
                    className="w-full"
                />

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">

                    {/* Property List */}
                    <div className={`flex-1 overflow-y-auto p-4 md:p-6 bg-white z-10 scrollbar-hide ${showMapMobile ? 'hidden md:block' : 'block'}`}>
                        <div className="mb-6">
                            <div className="flex items-center bg-light-grey px-5 py-3 rounded-full w-full shadow-sm border border-transparent focus-within:border-primary-black transition-all">
                                <Search size={20} className="text-neutral-grey" />
                                <input
                                    type="text"
                                    placeholder="Search by location..."
                                    value={searchParams.get('location') || ''}
                                    onChange={(e) => {
                                        const newParams = new URLSearchParams(searchParams);
                                        if (e.target.value) {
                                            newParams.set('location', e.target.value);
                                        } else {
                                            newParams.delete('location');
                                        }
                                        setSearchParams(newParams);
                                    }}
                                    className="bg-transparent border-none outline-none ml-3 text-base w-full font-bold text-primary-black placeholder-neutral-grey"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-primary-black">{filteredProperties.length} Properties Found</h2>
                            <div className="flex gap-4 items-center">
                                {/* Desktop Map Toggle */}
                                <button
                                    onClick={() => setShowMapMobile(!showMapMobile)}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 border border-light-grey rounded-full text-sm font-bold hover:bg-light-grey transition-colors"
                                >
                                    {showMapMobile ? (
                                        <>
                                            <List size={16} /> Show List
                                        </>
                                    ) : (
                                        <>
                                            <Map size={16} /> Show Map
                                        </>
                                    )}
                                </button>

                                <div className="flex gap-2 text-sm text-primary-black font-medium items-center">
                                    <span className="text-neutral-grey hidden sm:inline">Sort by:</span>
                                    <select
                                        className="bg-transparent font-bold cursor-pointer outline-none hover:underline"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option>Relevance</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {filteredProperties.length === 0 ? (
                            <div className="text-center py-20">
                                <h3 className="text-xl font-bold text-neutral-grey">No properties found matching your filters.</h3>
                                <button
                                    onClick={() => {
                                        setPriceRange([0, 20]);
                                        setBedrooms(1);
                                        setPropertyType(['Apartments', 'Condos', 'Houses', 'Commercial']);
                                        // Clear URL params
                                        window.history.pushState({}, '', '/search');
                                        // Force re-render/update
                                        window.location.reload();
                                    }}
                                    className="mt-4 text-primary-black font-bold underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className={`grid gap-6 pb-20 ${showMapMobile ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                                {displayProperties.map(p => (
                                    <PropertyCard key={p.id} {...p} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Map Area - Toggled on Desktop too now */}
                    {(showMapMobile) && (
                        <div className="w-full md:w-[45%] lg:w-[40%] bg-light-grey relative min-h-full border-l border-light-grey">
                            <MapComponent properties={displayProperties} />

                            {/* Mobile List Toggle (Overlay on Map) */}
                            <button
                                onClick={() => setShowMapMobile(false)}
                                className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-primary-black text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2"
                            >
                                <List size={20} /> Show List
                            </button>
                        </div>
                    )}

                    {/* Mobile Map Toggle Button (Floating) - Only visible when List is shown on mobile */}
                    {!showMapMobile && (
                        <div className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                            <button
                                onClick={() => setShowMapMobile(true)}
                                className="bg-primary-black text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                                <Map size={20} /> Show Map
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default SearchPage;
