import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProperties, type Property } from '../context/PropertyContext';
import { ArrowLeft, Save, Upload, MapPin, DollarSign, Layout, Home } from 'lucide-react';

const AdminPropertyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addProperty, updateProperty, getProperty } = useProperties();

    // Initial State Template
    const initialState: Omit<Property, 'id'> = {
        address: '',
        price: '',
        type: 'Apartments',
        rooms: 1,
        baths: 1,
        area: 500,
        view: 'Any',
        description: '',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070',
        kitchen_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=2070',
        lat: 19.0760,
        lng: 72.8777,
        agent: {
            name: 'Admin User',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
        }
    };

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const isEditMode = !!id;

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) navigate('/admin');

        if (isEditMode && id) {
            const property = getProperty(parseInt(id));
            if (property) {
                const { id: _, ...rest } = property;
                setFormData({ ...initialState, ...rest });
            } else {
                navigate('/admin/dashboard');
            }
        }
    }, [id, isEditMode, navigate, getProperty]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 800));

        if (isEditMode && id) {
            updateProperty(parseInt(id), formData);
        } else {
            addProperty(formData);
        }

        setLoading(false);
        navigate('/admin/dashboard');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] font-display flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-light-grey sticky top-0 z-30 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="p-2 hover:bg-light-grey rounded-full transition-colors text-neutral-grey hover:text-primary-black">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-primary-black">{isEditMode ? 'Edit Property' : 'Create New Listing'}</h1>
                        <p className="text-xs text-neutral-grey font-medium">Step 1 of 1 • details</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        className="px-6 py-2.5 rounded-full text-sm font-bold text-neutral-grey hover:bg-light-grey transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-primary-black text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-neutral-grey transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : (
                            <>
                                <Save size={16} />
                                Save Property
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Visual Preview */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="sticky top-24 space-y-6">
                        <h3 className="text-sm font-bold text-neutral-grey uppercase tracking-wider">Live Preview</h3>

                        {/* Card Preview */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow border border-light-grey group cursor-default">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={formData.image || 'https://via.placeholder.com/400'}
                                    alt={formData.address}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-black shadow-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    {formData.type}
                                </div>
                                <div className="absolute bottom-4 left-4 bg-primary-black text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                                    ₹{formData.price || '0'} Cr
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-primary-black mb-1 line-clamp-1">
                                    {formData.address || 'Property Address'}
                                </h3>
                                <p className="text-neutral-grey text-sm mb-4 line-clamp-2">
                                    {formData.description || 'No description provided.'}
                                </p>
                                <div className="flex items-center gap-4 text-sm font-medium text-neutral-grey border-t border-light-grey pt-4">
                                    <div className="flex items-center gap-1">
                                        <Home size={16} /> {formData.rooms} Beds
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Layout size={16} /> {formData.area} sqft
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upload Hint */}
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                <Upload size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-800 text-sm">Pro Tip</h4>
                                <p className="text-blue-600 text-xs mt-1">High-quality images increase engagement by 40%. Use landscape orientation for best results.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Sections */}
                <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">

                    {/* Basic Info */}
                    <Section title="Basic Information" icon={<Home size={18} />}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-primary-black mb-2">Property Address / Title</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-neutral-grey" size={18} />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black transition-all"
                                        placeholder="e.g. Luxury Villa in Bandra"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-primary-black mb-2">Price (in Crores)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-3.5 text-neutral-grey" size={18} />
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black transition-all"
                                        placeholder="4.5"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-primary-black mb-2">Property Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Apartments">Apartments</option>
                                    <option value="Condos">Condos</option>
                                    <option value="Houses">Houses</option>
                                    <option value="Commercial">Commercial</option>
                                </select>
                            </div>
                        </div>
                    </Section>

                    {/* Details */}
                    <Section title="Property Details" icon={<Layout size={18} />}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-grey mb-1 uppercase">Bedrooms</label>
                                <input
                                    type="number"
                                    name="rooms"
                                    value={formData.rooms}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black font-bold text-center"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-grey mb-1 uppercase">Bathrooms</label>
                                <input
                                    type="number"
                                    name="baths"
                                    value={formData.baths}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black font-bold text-center"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-neutral-grey mb-1 uppercase">Area (Sqft)</label>
                                <input
                                    type="number"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black font-bold text-center"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-bold text-primary-black mb-2">View Type</label>
                            <div className="flex flex-wrap gap-2">
                                {['Any', 'Sea View', 'City View', 'Garden'].map((v) => (
                                    <button
                                        key={v}
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, view: v }))}
                                        className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${formData.view === v
                                            ? 'bg-primary-black text-white border-primary-black'
                                            : 'bg-white text-neutral-grey border-light-grey hover:border-primary-black'
                                            }`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Section>

                    {/* Media */}
                    <Section title="Media & Description" icon={<Upload size={18} />}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-primary-black mb-2">Main Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary-black mb-2">Kitchen/Interior Image URL</label>
                                <input
                                    type="text"
                                    name="kitchen_image"
                                    value={formData.kitchen_image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-primary-black mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black resize-none"
                                    placeholder="Describe the unique features of this property..."
                                />
                            </div>
                        </div>
                    </Section>

                </div>
            </div>
        </div>
    );
};

const Section = ({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-light-grey">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-light-grey">
            <div className="bg-light-grey p-2 rounded-lg text-primary-black">
                {icon}
            </div>
            <h2 className="text-lg font-bold text-primary-black">{title}</h2>
        </div>
        {children}
    </div>
);

export default AdminPropertyForm;
