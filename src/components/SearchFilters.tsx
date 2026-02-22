import { useState, type Dispatch, type SetStateAction, useRef, useEffect } from 'react';
import { ChevronDown, Filter, X, Check } from 'lucide-react';

interface SearchFiltersProps {
    listingType: string;
    setListingType: Dispatch<SetStateAction<string>>;
    priceRange: number[];
    setPriceRange: Dispatch<SetStateAction<number[]>>;
    propertyType: string[];
    setPropertyType: Dispatch<SetStateAction<string[]>>;
    bedrooms: number;
    setBedrooms: Dispatch<SetStateAction<number>>;
    view: string;
    setView: Dispatch<SetStateAction<string>>;
    className?: string;
}

const SearchFilters = ({
    listingType, setListingType,
    priceRange, setPriceRange,
    propertyType, setPropertyType,
    bedrooms, setBedrooms,
    view, setView,
    className
}: SearchFiltersProps) => {

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    const togglePropertyType = (type: string) => {
        if (propertyType.includes(type)) {
            setPropertyType(propertyType.filter(t => t !== type));
        } else {
            setPropertyType([...propertyType, type]);
        }
    };

    return (
        <div className={`${className} bg-white dark:bg-dark-bg border-b border-light-grey dark:border-dark-border transition-colors sticky top-0 z-30 px-6 py-4 flex items-center gap-4 shadow-sm w-full`} ref={dropdownRef}>

            {/* Mobile Filter Button (can be expanded later for full mobile filters) */}
            <div className="md:hidden">
                <button className="flex items-center gap-2 px-4 py-2 border border-light-grey dark:border-dark-border rounded-full font-bold text-sm dark:bg-dark-surface dark:text-white">
                    <Filter size={16} /> Filters
                </button>
            </div>

            {/* Desktop Filters Row */}
            <div className="hidden md:flex items-center gap-3 w-full scrollbar-hide">

                {/* Listing Type (Buy/Rent) */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('listingType')}
                        className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all ${activeDropdown === 'listingType' || listingType !== 'Buy' ? 'border-primary-black bg-primary-black dark:border-gold dark:bg-gold text-white dark:text-black' : 'border-light-grey dark:border-dark-border bg-white dark:bg-dark-surface text-primary-black dark:text-white hover:border-neutral-grey dark:hover:border-gold'}`}
                    >
                        {listingType} <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'listingType' ? 'rotate-180' : ''}`} />
                    </button>

                    {activeDropdown === 'listingType' && (
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-light-grey dark:border-dark-border p-2 animate-fade-in z-50">
                            <button
                                onClick={() => { setListingType('Buy'); setActiveDropdown(null); }}
                                className={`w-full text-left px-4 py-2 rounded-md font-medium text-sm hover:bg-light-grey dark:hover:bg-white/5 transition-colors ${listingType === 'Buy' ? 'text-primary-black dark:text-gold font-bold' : 'text-neutral-grey dark:text-neutral-grey/60'}`}
                            >
                                Buy
                            </button>
                            <button
                                onClick={() => { setListingType('Rent'); setActiveDropdown(null); }}
                                className={`w-full text-left px-4 py-2 rounded-md font-medium text-sm hover:bg-light-grey dark:hover:bg-white/5 transition-colors ${listingType === 'Rent' ? 'text-primary-black dark:text-gold font-bold' : 'text-neutral-grey dark:text-neutral-grey/60'}`}
                            >
                                Rent
                            </button>
                        </div>
                    )}
                </div>

                {/* Price Range */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('price')}
                        className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all ${activeDropdown === 'price' || priceRange[0] > 0 || priceRange[1] < 20 ? 'border-primary-black bg-primary-black dark:border-gold dark:bg-gold text-white dark:text-black' : 'border-light-grey dark:border-dark-border bg-white dark:bg-dark-surface text-primary-black dark:text-white hover:border-neutral-grey dark:hover:border-gold'}`}
                    >
                        Price: {priceRange[0]}Cr - {priceRange[1]}Cr <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'price' ? 'rotate-180' : ''}`} />
                    </button>

                    {activeDropdown === 'price' && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-light-grey dark:border-dark-border p-6 animate-fade-in z-50">
                            <h4 className="text-xs font-bold uppercase text-neutral-grey dark:text-neutral-grey/60 mb-4">Price Range (Cr)</h4>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                step="0.5"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                                className="w-full h-1 bg-light-grey dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-primary-black dark:accent-gold mb-6"
                            />
                            <div className="flex gap-3">
                                <div className="border border-light-grey dark:border-dark-border rounded-md px-3 py-2 flex-1">
                                    <span className="text-xs text-neutral-grey dark:text-neutral-grey/60 block">Min</span>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                                        className="w-full font-bold outline-none text-sm bg-transparent text-primary-black dark:text-white"
                                    />
                                </div>
                                <div className="border border-light-grey dark:border-dark-border rounded-md px-3 py-2 flex-1">
                                    <span className="text-xs text-neutral-grey dark:text-neutral-grey/60 block">Max</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                                        className="w-full font-bold outline-none text-sm bg-transparent text-primary-black dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Property Type */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('type')}
                        className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all ${activeDropdown === 'type' || propertyType.length > 0 ? 'border-primary-black bg-primary-black dark:border-gold dark:bg-gold text-white dark:text-black' : 'border-light-grey dark:border-dark-border bg-white dark:bg-dark-surface text-primary-black dark:text-white hover:border-neutral-grey dark:hover:border-gold'}`}
                    >
                        Type ({propertyType.length}) <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
                    </button>

                    {activeDropdown === 'type' && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-light-grey dark:border-dark-border p-4 animate-fade-in z-50">
                            <div className="flex flex-col gap-1">
                                {['Houses', 'Condos', 'Apartments', 'Commercial'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => togglePropertyType(type)}
                                        className="flex items-center gap-3 w-full text-left p-2 hover:bg-light-grey/50 dark:hover:bg-white/5 rounded-md group"
                                    >
                                        <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${propertyType.includes(type) ? 'bg-primary-black dark:bg-gold border-primary-black dark:border-gold' : 'border-neutral-grey dark:border-dark-border bg-white dark:bg-dark-surface group-hover:border-primary-black dark:group-hover:border-gold'}`}>
                                            {propertyType.includes(type) && <Check size={10} className="text-white dark:text-black" strokeWidth={3} />}
                                        </div>
                                        <span className={`text-sm font-medium ${propertyType.includes(type) ? 'text-primary-black dark:text-white' : 'text-neutral-grey dark:text-neutral-grey/60'}`}>{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bedrooms */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('bedrooms')}
                        className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all ${activeDropdown === 'bedrooms' || bedrooms > 1 ? 'border-primary-black bg-primary-black dark:border-gold dark:bg-gold text-white dark:text-black' : 'border-light-grey dark:border-dark-border bg-white dark:bg-dark-surface text-primary-black dark:text-white hover:border-neutral-grey dark:hover:border-gold'}`}
                    >
                        {bedrooms}+ Beds <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'bedrooms' ? 'rotate-180' : ''}`} />
                    </button>

                    {activeDropdown === 'bedrooms' && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-light-grey dark:border-dark-border p-4 animate-fade-in z-50">
                            <h4 className="text-xs font-bold uppercase text-neutral-grey dark:text-neutral-grey/60 mb-3">Minimum Bedrooms</h4>
                            <div className="flex gap-2 justify-between">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setBedrooms(num)}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-bold transition-all ${bedrooms === num ? 'bg-primary-black dark:bg-gold text-white dark:text-black border-primary-black dark:border-gold' : 'border-light-grey dark:border-dark-border text-neutral-grey dark:text-neutral-grey hover:border-primary-black dark:hover:border-gold hover:text-primary-black dark:hover:text-white'}`}
                                    >
                                        {num === 5 ? '5+' : num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* View */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('view')}
                        className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all ${activeDropdown === 'view' || view !== 'Any' ? 'border-primary-black bg-primary-black dark:border-gold dark:bg-gold text-white dark:text-black' : 'border-light-grey dark:border-dark-border bg-white dark:bg-dark-surface text-primary-black dark:text-white hover:border-neutral-grey dark:hover:border-gold'}`}
                    >
                        {view === 'Any' ? 'View' : view} <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'view' ? 'rotate-180' : ''}`} />
                    </button>

                    {activeDropdown === 'view' && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-light-grey dark:border-dark-border p-2 animate-fade-in z-50">
                            {['Any', 'Sea View', 'City View', 'Garden'].map((v) => (
                                <button
                                    key={v}
                                    onClick={() => { setView(v); setActiveDropdown(null); }}
                                    className={`w-full text-left px-4 py-2 rounded-md font-medium text-sm hover:bg-light-grey dark:hover:bg-white/5 transition-colors ${view === v ? 'text-primary-black dark:text-gold font-bold bg-light-grey/50 dark:bg-white/5' : 'text-neutral-grey dark:text-neutral-grey/60'}`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Clear Filters (only if filters are applied) */}
                {(priceRange[0] > 0 || priceRange[1] < 20 || bedrooms > 1 || view !== 'Any' || listingType === 'Rent' || propertyType.length > 0) && (
                    <button
                        onClick={() => {
                            setPriceRange([0, 20]);
                            setBedrooms(1);
                            setView('Any');
                            setListingType('Buy');
                            setPropertyType([]);
                        }}
                        className="ml-auto flex items-center gap-1 text-sm font-bold text-neutral-grey dark:text-neutral-grey/60 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                        <X size={14} /> Clear
                    </button>
                )}

            </div>
        </div>
    );
};

export default SearchFilters;
