import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import {
    Plus, Edit, Trash2, LogOut, Search,
    LayoutDashboard, Home, Users, Settings,
    TrendingUp, Mail, Phone, Bell, Shield, Key
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { properties, deleteProperty } = useProperties();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    // Mock Agents Data
    const [agents] = useState([
        { id: 1, name: 'Sarah Wilson', role: 'Senior Agent', sales: 24, rating: 4.8, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', email: 'sarah@bricklane.co', phone: '+1 234 567 890' },
        { id: 2, name: 'James Rodriquez', role: 'Sales Associate', sales: 18, rating: 4.6, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', email: 'james@bricklane.co', phone: '+1 234 567 891' },
        { id: 3, name: 'Emily Chen', role: 'Property Manager', sales: 42, rating: 4.9, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200', email: 'emily@bricklane.co', phone: '+1 234 567 892' },
        { id: 4, name: 'Michael Ross', role: 'Junior Agent', sales: 8, rating: 4.2, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', email: 'michael@bricklane.co', phone: '+1 234 567 893' },
    ]);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin');
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            deleteProperty(id);
        }
    };

    // Filter Logic
    const filteredProperties = properties.filter(p =>
        p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAgents = agents.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate stats
    const totalValue = properties.reduce((acc, curr) => acc + parseFloat(curr.price), 0).toFixed(1);
    const avgPrice = (parseFloat(totalValue) / (properties.length || 1)).toFixed(1);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
            case 'listings':
                return (
                    <div className="space-y-10">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <StatCard title="Total Properties" value={properties.length.toString()} icon={<Home size={24} />} trend="+12%" />
                                <StatCard title="Portfolio Value" value={`₹${totalValue} Cr`} icon={<TrendingUp size={24} />} trend="+5.4%" />
                                <StatCard title="Active Views" value="2.4k" icon={<Users size={24} />} trend="+18%" />
                                <StatCard title="Avg. Price" value={`₹${avgPrice} Cr`} icon={<LayoutDashboard size={24} />} trend="-2.1%" negative />
                            </div>
                        )}

                        <div className="bg-white rounded-3xl shadow-sm border border-light-grey overflow-hidden">
                            <div className="p-8 border-b border-light-grey flex flex-col md:flex-row justify-between items-center gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary-black">Property Listings</h2>
                                    <p className="text-neutral-grey text-base mt-2">Manage and update your property inventory</p>
                                </div>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64 lg:hidden">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-grey" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Filter..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-3 bg-light-grey rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary-black transition-all text-base"
                                        />
                                    </div>
                                    <Link to="/admin/property/new" className="bg-primary-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 text-base">
                                        <Plus size={20} /> <span className="hidden sm:inline">Add New Property</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-light-grey/30 text-neutral-grey text-xs uppercase tracking-wider font-bold">
                                            <th className="p-8">Property</th>
                                            <th className="p-8">Status</th>
                                            <th className="p-8">Price</th>
                                            <th className="p-8">Performance</th>
                                            <th className="p-8 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-light-grey">
                                        {filteredProperties.map((property) => (
                                            <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={property.id} className="hover:bg-neutral-50 transition-colors group">
                                                <td className="p-8">
                                                    <div className="flex items-center gap-6 min-w-[350px]">
                                                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-light-grey">
                                                            <img src={property.image} alt={property.type} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-primary-black text-lg">{property.address}</div>
                                                            <div className="text-sm text-neutral-grey mt-1 truncate max-w-[280px]">{property.description.substring(0, 50)}...</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-8">
                                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${property.type === 'Commercial' ? 'bg-purple-100 text-purple-800' : property.type === 'Houses' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                        {property.type}
                                                    </span>
                                                </td>
                                                <td className="p-8 text-xl font-bold text-primary-black">₹{property.price} Cr</td>
                                                <td className="p-8">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="w-32 h-2.5 bg-light-grey rounded-full overflow-hidden">
                                                            <div className="bg-primary-black h-full rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                                                        </div>
                                                        <span className="text-xs text-neutral-grey font-bold">{Math.floor(Math.random() * 500)} views</span>
                                                    </div>
                                                </td>
                                                <td className="p-8 text-right">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Link to={`/admin/property/edit/${property.id}`} className="p-3 text-neutral-grey hover:text-primary-black hover:bg-white rounded-full transition-all border border-transparent hover:border-light-grey hover:shadow-md" title="Edit">
                                                            <Edit size={20} />
                                                        </Link>
                                                        <button onClick={() => handleDelete(property.id)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all" title="Delete">
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredProperties.length === 0 && (
                                    <div className="p-20 text-center flex flex-col items-center">
                                        <div className="w-20 h-20 bg-light-grey rounded-full flex items-center justify-center mb-6 text-neutral-grey"><Search size={32} /></div>
                                        <h3 className="text-xl font-bold text-primary-black mb-2">No properties found</h3>
                                        <p className="text-neutral-grey text-base">Try adjusting your search or add a new property.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'agents':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAgents.map(agent => (
                            <div key={agent.id} className="bg-white rounded-3xl p-6 border border-light-grey shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden">
                                        <img src={agent.image} alt={agent.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <button className="p-2 text-neutral-grey hover:text-primary-black hover:bg-light-grey rounded-full transition-colors">
                                        <Edit size={18} />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-primary-black mb-1">{agent.name}</h3>
                                <p className="text-neutral-grey text-sm font-medium mb-4">{agent.role}</p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-primary-black">
                                        <Mail size={16} className="text-neutral-grey" />
                                        {agent.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-primary-black">
                                        <Phone size={16} className="text-neutral-grey" />
                                        {agent.phone}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-light-grey pt-4">
                                    <div className="text-center">
                                        <p className="text-xs text-neutral-grey uppercase font-bold">Sales</p>
                                        <p className="text-lg font-bold text-primary-black">{agent.sales}</p>
                                    </div>
                                    <div className="w-px h-8 bg-light-grey"></div>
                                    <div className="text-center">
                                        <p className="text-xs text-neutral-grey uppercase font-bold">Rating</p>
                                        <p className="text-lg font-bold text-primary-black flex items-center gap-1">
                                            {agent.rating} <span className="text-yellow-400 text-sm">★</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'analytics':
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-3xl border border-light-grey shadow-sm">
                                <h3 className="text-xl font-bold text-primary-black mb-6">Revenue Overview</h3>
                                <div className="h-64 flex items-end justify-between gap-2">
                                    {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 95].map((h, i) => (
                                        <div key={i} className="w-full bg-light-grey rounded-t-lg relative group overflow-hidden">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ duration: 1, delay: i * 0.05 }}
                                                className="absolute bottom-0 w-full bg-primary-black group-hover:bg-neutral-grey transition-colors"
                                            ></motion.div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 text-xs font-bold text-neutral-grey uppercase">
                                    <span>Jan</span><span>Dec</span>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-light-grey shadow-sm">
                                <h3 className="text-xl font-bold text-primary-black mb-6">Traffic Sources</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Direct', val: 40, color: 'bg-primary-black' },
                                        { label: 'Social Media', val: 25, color: 'bg-neutral-grey' },
                                        { label: 'Referral', val: 20, color: 'bg-gray-400' },
                                        { label: 'Organic Search', val: 15, color: 'bg-gray-300' }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm font-bold text-primary-black mb-2">
                                                <span>{item.label}</span>
                                                <span>{item.val}%</span>
                                            </div>
                                            <div className="h-3 w-full bg-light-grey rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.val}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                    className={`h-full ${item.color}`}
                                                ></motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-light-grey shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-light-grey">
                            <h3 className="text-2xl font-bold text-primary-black">Account Settings</h3>
                            <p className="text-neutral-grey mt-1">Manage your profile and preferences</p>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-light-grey">
                                    <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <button className="bg-primary-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">Change Avatar</button>
                                    <p className="text-xs text-neutral-grey mt-2">JPG, GIF or PNG. Max size 800K</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-primary-black flex items-center gap-2">
                                    <Users size={18} /> Personal Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-grey mb-1 uppercase">First Name</label>
                                        <input type="text" defaultValue="Admin" className="w-full bg-light-grey px-4 py-3 rounded-xl font-bold text-primary-black focus:outline-none focus:ring-2 focus:ring-primary-black" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-grey mb-1 uppercase">Last Name</label>
                                        <input type="text" defaultValue="User" className="w-full bg-light-grey px-4 py-3 rounded-xl font-bold text-primary-black focus:outline-none focus:ring-2 focus:ring-primary-black" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold text-neutral-grey mb-1 uppercase">Email Address</label>
                                        <input type="email" defaultValue="admin@bricklane.co" className="w-full bg-light-grey px-4 py-3 rounded-xl font-bold text-primary-black focus:outline-none focus:ring-2 focus:ring-primary-black" />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-light-grey pt-8 space-y-4">
                                <h4 className="font-bold text-primary-black flex items-center gap-2">
                                    <Shield size={18} /> Security
                                </h4>
                                <button className="w-full flex items-center justify-between p-4 bg-light-grey rounded-xl hover:bg-neutral-200 transition-colors group">
                                    <span className="font-bold text-primary-black flex items-center gap-3">
                                        <Key size={18} /> Change Password
                                    </span>
                                    <span className="text-xs font-bold bg-white px-2 py-1 rounded text-neutral-grey">Update</span>
                                </button>
                                <button className="w-full flex items-center justify-between p-4 bg-light-grey rounded-xl hover:bg-neutral-200 transition-colors group">
                                    <span className="font-bold text-primary-black flex items-center gap-3">
                                        <Bell size={18} /> Notifications
                                    </span>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">On</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F7] font-display flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-light-grey hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-8 pb-4">
                    <Link to="/" className="text-3xl font-bold tracking-tight text-primary-black flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-primary-black rounded-xl text-white flex items-center justify-center text-xl shadow-md shrink-0">B</div>
                        BRICKLANE<span className="font-normal text-neutral-grey text-xl">co.</span>
                    </Link>
                </div>

                <nav className="flex-1 px-6 space-y-3 pt-4">
                    <NavItem icon={<LayoutDashboard size={22} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <NavItem icon={<Home size={22} />} label="Listings" active={activeTab === 'listings'} onClick={() => setActiveTab('listings')} />
                    <NavItem icon={<Users size={22} />} label="Agents" active={activeTab === 'agents'} onClick={() => setActiveTab('agents')} />
                    <NavItem icon={<TrendingUp size={22} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
                    <NavItem icon={<Settings size={22} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </nav>

                <div className="p-6 border-t border-light-grey">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-6 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl w-full transition-colors text-base"
                    >
                        <LogOut size={22} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 py-5 border-b border-light-grey flex justify-between items-center shadow-sm">
                    <h1 className="text-3xl font-bold text-primary-black capitalize">{activeTab}</h1>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center bg-white border border-light-grey px-5 py-3 rounded-full w-80 shadow-sm focus-within:ring-2 focus-within:ring-primary-black transition-all">
                            <Search size={20} className="text-neutral-grey" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none ml-3 text-base w-full placeholder-neutral-grey font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-3 pl-6 border-l border-light-grey">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-primary-black">Admin User</p>
                                <p className="text-xs text-neutral-grey font-medium">Super Admin</p>
                            </div>
                            <div className="w-12 h-12 bg-primary-black rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform">
                                <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

// Subcomponents
const NavItem = ({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl w-full text-base font-bold transition-all ${active
            ? 'bg-primary-black text-white shadow-lg scale-[1.02]'
            : 'text-neutral-grey hover:bg-light-grey hover:text-primary-black'
            }`}
    >
        {icon}
        {label}
    </button>
);

const StatCard = ({ title, value, icon, trend, negative = false }: any) => (
    <div className="bg-white p-8 rounded-3xl border border-light-grey shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${negative ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                {icon}
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${negative ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                {trend}
            </span>
        </div>
        <h3 className="text-neutral-grey text-base font-bold mb-2 uppercase tracking-wide opacity-70">{title}</h3>
        <p className="text-4xl font-bold text-primary-black tracking-tight">{value}</p>
    </div>
);

export default AdminDashboard;
