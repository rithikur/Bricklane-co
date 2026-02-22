import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Loader } from 'lucide-react';

interface ParsedQuery {
    bedrooms?: number;
    maxPrice?: number;
    location?: string;
    type?: string;
    view?: string;
}

interface AISmartSearchProps {
    onApplyFilters: (parsed: ParsedQuery) => void;
}

// Simple NLP keyword matcher
const parseNaturalQuery = (query: string): ParsedQuery => {
    const q = query.toLowerCase();
    const result: ParsedQuery = {};

    // Bedrooms
    const bedroomMatch = q.match(/(\d+)\s*(?:bhk|bed(?:room)?s?)/);
    if (bedroomMatch) result.bedrooms = parseInt(bedroomMatch[1]);

    // Price in Cr
    const priceMatch = q.match(/(?:under|below|less than|within|upto?)\s*[₹rs]?\s*(\d+(?:\.\d+)?)\s*(?:cr(?:ore)?s?)?/i);
    if (priceMatch) result.maxPrice = parseFloat(priceMatch[1]);

    // Location keywords
    const locationKeywords = [
        'bandra', 'andheri', 'juhu', 'powai', 'worli', 'lower parel', 'goregaon', 'malad', 'borivali', 'thane', 'navi mumbai', 'pune', 'delhi', 'gurgaon', 'noida', 'bangalore', 'hyderabad',
        'ahmedabad', 'chandigarh', 'jaipur', 'kolkata', 'surat'
    ];
    for (const loc of locationKeywords) {
        if (q.includes(loc)) { result.location = loc; break; }
    }

    // Property type
    if (q.includes('apartment') || q.includes('flat')) result.type = 'Apartments';
    else if (q.includes('condo')) result.type = 'Condos';
    else if (q.includes('house') || q.includes('villa') || q.includes('bungalow')) result.type = 'Houses';
    else if (q.includes('commercial') || q.includes('office')) result.type = 'Commercial';

    // View
    if (q.includes('garden')) result.view = 'Garden';
    else if (q.includes('sea') || q.includes('ocean') || q.includes('beach')) result.view = 'Sea';
    else if (q.includes('city')) result.view = 'City';
    else if (q.includes('pool')) result.view = 'Pool';

    return result;
};

const SUGGESTIONS = [
    '3BHK under ₹2Cr with garden view near Bandra',
    'Luxury sea view apartment under ₹5Cr',
    '2 bedroom house in Powai under ₹1.5Cr',
    'Commercial office space in Andheri',
];

const AISmartSearch = ({ onApplyFilters }: AISmartSearchProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [parsed, setParsed] = useState<ParsedQuery | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (!query.trim()) return;
        setIsSearching(true);
        // Simulate AI "thinking" delay
        setTimeout(() => {
            const result = parseNaturalQuery(query);
            setParsed(result);
            setIsSearching(false);
        }, 900);
    };

    const handleApply = () => {
        if (!parsed) return;
        onApplyFilters(parsed);
        setIsOpen(false);
        setQuery('');
        setParsed(null);
    };

    const handleSuggestion = (s: string) => {
        setQuery(s);
        setParsed(null);
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full text-sm font-bold shadow-lg hover:shadow-amber-300/50 hover:scale-105 transition-all duration-200"
            >
                <Sparkles size={15} className="animate-pulse" />
                AI Search
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[990] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-20 px-4"
                        onClick={() => { setIsOpen(false); setParsed(null); setQuery(''); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -24, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -24, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="bg-white rounded-std shadow-2xl w-full max-w-xl font-display overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="px-6 pt-6 pb-4 border-b border-light-grey flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                                        <Sparkles size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary-black text-base leading-none">AI Smart Search</h3>
                                        <p className="text-xs text-neutral-grey mt-0.5">Describe your dream home in plain English</p>
                                    </div>
                                </div>
                                <button onClick={() => { setIsOpen(false); setParsed(null); setQuery(''); }} className="p-1.5 rounded-full hover:bg-light-grey transition-colors text-neutral-grey">
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Input */}
                            <div className="px-6 pt-5">
                                <div className="flex gap-3">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => { setQuery(e.target.value); setParsed(null); }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="e.g. 3BHK under ₹2Cr with garden view near Bandra"
                                        className="flex-1 bg-light-grey rounded-xl px-4 py-3 text-sm font-medium outline-none border border-transparent focus:border-amber-300 transition-all placeholder-neutral-grey"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        disabled={!query.trim() || isSearching}
                                        className="flex items-center gap-1.5 px-4 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-xl text-sm font-bold disabled:opacity-50 hover:opacity-90 transition-opacity"
                                    >
                                        {isSearching ? <Loader size={16} className="animate-spin" /> : <Sparkles size={16} />}
                                        {isSearching ? '' : 'Parse'}
                                    </button>
                                </div>
                            </div>

                            {/* AI Parsing Result */}
                            <AnimatePresence mode="wait">
                                {isSearching && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="px-6 pt-4"
                                    >
                                        <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                            <Loader size={18} className="text-amber-500 animate-spin" />
                                            <span className="text-sm font-medium text-amber-700">Analysing your search...</span>
                                        </div>
                                    </motion.div>
                                )}
                                {parsed && !isSearching && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="px-6 pt-4"
                                    >
                                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                            <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">✓ AI Understood</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {parsed.bedrooms && <span className="px-3 py-1 bg-white border border-green-200 text-green-800 text-xs font-bold rounded-full">{parsed.bedrooms} BHK</span>}
                                                {parsed.type && <span className="px-3 py-1 bg-white border border-green-200 text-green-800 text-xs font-bold rounded-full">{parsed.type}</span>}
                                                {parsed.maxPrice && <span className="px-3 py-1 bg-white border border-green-200 text-green-800 text-xs font-bold rounded-full">Under ₹{parsed.maxPrice} Cr</span>}
                                                {parsed.view && <span className="px-3 py-1 bg-white border border-green-200 text-green-800 text-xs font-bold rounded-full">{parsed.view} View</span>}
                                                {parsed.location && <span className="px-3 py-1 bg-white border border-green-200 text-green-800 text-xs font-bold rounded-full">Near {parsed.location}</span>}
                                                {Object.keys(parsed).length === 0 && <span className="text-sm text-neutral-grey">No specific filters detected — showing all results.</span>}
                                            </div>
                                            <button
                                                onClick={handleApply}
                                                className="w-full flex items-center justify-center gap-2 bg-primary-black text-white py-3 rounded-xl text-sm font-bold hover:bg-neutral-grey transition-colors"
                                            >
                                                Apply These Filters
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Suggestions */}
                            <div className="px-6 pt-4 pb-6">
                                <p className="text-xs font-bold text-neutral-grey uppercase tracking-wider mb-3">Try an example</p>
                                <div className="flex flex-col gap-2">
                                    {SUGGESTIONS.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSuggestion(s)}
                                            className="text-left text-sm text-neutral-grey hover:text-primary-black hover:bg-light-grey px-3 py-2 rounded-lg transition-colors font-medium"
                                        >
                                            "{s}"
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AISmartSearch;
export type { ParsedQuery };
