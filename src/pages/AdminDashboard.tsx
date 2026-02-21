import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import {
    Plus, Edit, Trash2, LogOut, Search, X,
    LayoutDashboard, Home, Users, Settings,
    TrendingUp, Mail, Phone, Bell, Shield, Key, MessageSquare, Star, ChevronDown, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { ToastContainer, useToast } from '../components/common/Toast';

const AdminDashboard = () => {
    const { properties, deleteProperty } = useProperties();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/150?u=admin');
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const { toasts, dismiss, toast } = useToast();

    // Settings state
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (ev.target?.result) setAvatarUrl(ev.target.result as string);
        };
        reader.readAsDataURL(file);
    };

    // Agents — stateful so we can add/edit/delete
    const [agents, setAgents] = useState([
        { id: 1, name: 'Sarah Wilson', role: 'Senior Agent', sales: 24, rating: 4.8, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', email: 'sarah@bricklane.co', phone: '+1 234 567 890' },
        { id: 2, name: 'James Rodriquez', role: 'Sales Associate', sales: 18, rating: 4.6, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', email: 'james@bricklane.co', phone: '+1 234 567 891' },
        { id: 3, name: 'Emily Chen', role: 'Property Manager', sales: 42, rating: 4.9, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200', email: 'emily@bricklane.co', phone: '+1 234 567 892' },
        { id: 4, name: 'Michael Ross', role: 'Junior Agent', sales: 8, rating: 4.2, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', email: 'michael@bricklane.co', phone: '+1 234 567 893' },
    ]);

    // Agent modal state
    const [agentModal, setAgentModal] = useState<{ open: boolean; agent: any | null }>({ open: false, agent: null });
    const openAddAgent = () => setAgentModal({ open: true, agent: null });
    const openEditAgent = (agent: any) => setAgentModal({ open: true, agent });
    const closeAgentModal = () => setAgentModal({ open: false, agent: null });
    const saveAgent = (data: any) => {
        if (data.id) {
            setAgents(prev => prev.map(a => a.id === data.id ? { ...a, ...data } : a));
        } else {
            setAgents(prev => [...prev, { ...data, id: Date.now(), sales: 0, rating: 0.0, image: `https://i.pravatar.cc/200?u=${Date.now()}` }]);
        }
        closeAgentModal();
    };
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const deleteAgent = (id: number) => {
        setAgents(prev => prev.filter(a => a.id !== id));
        setConfirmDeleteId(null);
    };

    // Mock Leads / Enquiries
    const [leads, setLeads] = useState([
        { id: 1, name: 'Aarav Mehta', email: 'aarav@gmail.com', property: 'Sea View Penthouse, Bandra', date: '2026-02-20', status: 'new', starred: false },
        { id: 2, name: 'Priya Sharma', email: 'priya.sharma@outlook.com', property: 'Premium 3BHK, Powai', date: '2026-02-19', status: 'contacted', starred: true },
        { id: 3, name: 'Rohit Verma', email: 'rohit.v@gmail.com', property: 'Studio Apartment, Andheri', date: '2026-02-18', status: 'viewing', starred: false },
        { id: 4, name: 'Neha Kapoor', email: 'neha.kapoor@yahoo.com', property: 'Garden Villa, Juhu', date: '2026-02-17', status: 'closed', starred: true },
        { id: 5, name: 'Arjun Singh', email: 'arjun.singh@corp.com', property: 'Commercial Office, Lower Parel', date: '2026-02-15', status: 'new', starred: false },
        { id: 6, name: 'Sneha Patel', email: 'sneha.p@gmail.com', property: 'Luxury Condo, Worli', date: '2026-02-14', status: 'contacted', starred: false },
    ]);

    const toggleLeadStar = (id: number) => setLeads(prev => prev.map(l => l.id === id ? { ...l, starred: !l.starred } : l));
    const updateLeadStatus = (id: number, status: string) => setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));

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
                    <div className="space-y-6">
                        {/* Header + Add button */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-primary-black">Agents</h2>
                                <p className="text-neutral-grey text-sm mt-1">{filteredAgents.length} team members</p>
                            </div>
                            <button
                                onClick={openAddAgent}
                                className="bg-primary-black text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md hover:shadow-lg active:scale-95"
                            >
                                <Plus size={18} /> Add Agent
                            </button>
                        </div>

                        {/* Agent Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAgents.map(agent => (
                                <motion.div
                                    key={agent.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative bg-white rounded-3xl p-6 border border-light-grey shadow-sm hover:shadow-md transition-all group overflow-hidden"
                                >
                                    {/* ── Inline delete confirmation overlay ── */}
                                    {confirmDeleteId === agent.id && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-3xl p-6"
                                        >
                                            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                                                <Trash2 size={22} className="text-red-500" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-primary-black text-base">Remove {agent.name}?</p>
                                                <p className="text-neutral-grey text-xs mt-1">This action cannot be undone.</p>
                                            </div>
                                            <div className="flex gap-2 w-full">
                                                <button
                                                    onClick={() => setConfirmDeleteId(null)}
                                                    className="flex-1 py-2.5 rounded-xl border border-light-grey text-primary-black font-bold text-sm hover:bg-light-grey transition-colors"
                                                >Keep</button>
                                                <button
                                                    onClick={() => deleteAgent(agent.id)}
                                                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
                                                >Remove</button>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                                            <img src={agent.image} alt={agent.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => openEditAgent(agent)}
                                                className="p-2 text-neutral-grey hover:text-primary-black hover:bg-light-grey rounded-full transition-colors"
                                                title="Edit Agent"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => setConfirmDeleteId(agent.id)}
                                                className="p-2 text-neutral-grey hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                title="Remove Agent"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-black mb-1">{agent.name}</h3>
                                    <p className="text-neutral-grey text-sm font-medium mb-4">{agent.role}</p>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-primary-black">
                                            <Mail size={16} className="text-neutral-grey shrink-0" />
                                            <span className="truncate">{agent.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-primary-black">
                                            <Phone size={16} className="text-neutral-grey shrink-0" />
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
                                </motion.div>
                            ))}
                        </div>

                        {/* Agent Edit / Add Modal */}
                        <AgentModal
                            isOpen={agentModal.open}
                            agent={agentModal.agent}
                            onClose={closeAgentModal}
                            onSave={saveAgent}
                        />
                    </div>
                );
            case 'analytics':
                const revenueData = [
                    { month: 'Jan', revenue: 2.1 }, { month: 'Feb', revenue: 3.4 },
                    { month: 'Mar', revenue: 2.8 }, { month: 'Apr', revenue: 4.2 },
                    { month: 'May', revenue: 5.1 }, { month: 'Jun', revenue: 4.7 },
                    { month: 'Jul', revenue: 6.3 }, { month: 'Aug', revenue: 7.0 },
                    { month: 'Sep', revenue: 6.1 }, { month: 'Oct', revenue: 8.4 },
                    { month: 'Nov', revenue: 7.9 }, { month: 'Dec', revenue: 9.2 },
                ];
                const typeData = [
                    { name: 'Apartments', value: properties.filter(p => p.type === 'Apartments').length || 6 },
                    { name: 'Houses', value: properties.filter(p => p.type === 'Houses').length || 4 },
                    { name: 'Condos', value: properties.filter(p => p.type === 'Condos').length || 3 },
                    { name: 'Commercial', value: properties.filter(p => p.type === 'Commercial').length || 2 },
                ];
                const PIE_COLORS = ['#0f0f0f', '#6b7280', '#d1d5db', '#f3f4f6'];
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Area Chart */}
                            <div className="bg-white p-8 rounded-3xl border border-light-grey shadow-sm">
                                <h3 className="text-xl font-bold text-primary-black mb-1">Revenue Overview</h3>
                                <p className="text-sm text-neutral-grey mb-6">Monthly revenue in ₹ Crores</p>
                                <ResponsiveContainer width="100%" height={220}>
                                    <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0f0f0f" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#0f0f0f" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: '1px solid #f0f0f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontFamily: 'inherit' }}
                                            formatter={(val: any) => [`₹${val} Cr`, 'Revenue']}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#0f0f0f" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5, fill: '#0f0f0f' }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Pie Chart */}
                            <div className="bg-white p-8 rounded-3xl border border-light-grey shadow-sm">
                                <h3 className="text-xl font-bold text-primary-black mb-1">Listings by Type</h3>
                                <p className="text-sm text-neutral-grey mb-2">Distribution of property categories</p>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie data={typeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                                            {typeData.map((_, i) => (
                                                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: '1px solid #f0f0f0', fontFamily: 'inherit' }}
                                            formatter={(val: any, name: any) => [val, name]}
                                        />
                                        <Legend iconType="circle" iconSize={8} formatter={(val) => <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{val}</span>} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Traffic Sources */}
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
                );
            case 'leads': {
                const STATUSES = [
                    { value: 'new', label: 'New', dot: 'bg-primary-black' },
                    { value: 'contacted', label: 'Contacted', dot: 'bg-neutral-grey' },
                    { value: 'viewing', label: 'Viewing', dot: 'bg-gray-400' },
                    { value: 'closed', label: 'Closed', dot: 'bg-gray-300' },
                ];
                const newCount = leads.filter(l => l.status === 'new').length;
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-primary-black">Enquiries & Leads</h2>
                                <p className="text-neutral-grey text-sm mt-1">{leads.length} total enquiries · <span className="text-blue-600 font-bold">{newCount} new</span></p>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl border border-light-grey shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-light-grey/40 text-neutral-grey text-xs uppercase tracking-wider font-bold border-b border-light-grey">
                                            <th className="px-6 py-4 w-8"></th>
                                            <th className="px-6 py-4">Contact</th>
                                            <th className="px-6 py-4">Property Interested In</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-light-grey">
                                        {leads.map(lead => (
                                            <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-neutral-50 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <button onClick={() => toggleLeadStar(lead.id)} className="transition-transform hover:scale-125">
                                                        <Star size={16} fill={lead.starred ? '#f59e0b' : 'none'} className={lead.starred ? 'text-yellow-400' : 'text-neutral-grey/40'} />
                                                    </button>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="font-bold text-primary-black">{lead.name}</p>
                                                    <p className="text-xs text-neutral-grey mt-0.5 flex items-center gap-1"><Mail size={11} />{lead.email}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-medium text-primary-black max-w-[220px] truncate">{lead.property}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-sm text-neutral-grey font-medium">{lead.date}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <LeadStatusDropdown
                                                        statuses={STATUSES}
                                                        value={lead.status}
                                                        onChange={(s) => updateLeadStatus(lead.id, s)}
                                                    />
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-primary-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-grey">
                                                        <Mail size={12} /> Reply
                                                    </a>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            }
            case 'settings':
                return (
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-light-grey shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-light-grey">
                            <h3 className="text-2xl font-bold text-primary-black">Account Settings</h3>
                            <p className="text-neutral-grey mt-1">Manage your profile and preferences</p>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-light-grey shrink-0">
                                    <img src={avatarUrl} alt="Admin" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    {/* Hidden real file input */}
                                    <input
                                        ref={avatarInputRef}
                                        type="file"
                                        accept="image/jpeg,image/gif,image/png"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                    <button
                                        onClick={() => avatarInputRef.current?.click()}
                                        className="bg-primary-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
                                    >
                                        Change Avatar
                                    </button>
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

                                {/* Change Password */}
                                <button
                                    onClick={() => setShowPasswordForm(v => !v)}
                                    className="w-full flex items-center justify-between p-4 bg-light-grey rounded-xl hover:bg-neutral-200 transition-colors group"
                                >
                                    <span className="font-bold text-primary-black flex items-center gap-3">
                                        <Key size={18} /> Change Password
                                    </span>
                                    <span className="text-xs font-bold bg-white px-2 py-1 rounded text-neutral-grey">{showPasswordForm ? 'Close' : 'Update'}</span>
                                </button>

                                <AnimatePresence>
                                    {showPasswordForm && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-light-grey/40 border border-light-grey rounded-xl p-5 space-y-3">
                                                {(['current', 'next', 'confirm'] as const).map(field => (
                                                    <div key={field}>
                                                        <label className="block text-xs font-bold text-neutral-grey uppercase mb-1">
                                                            {field === 'current' ? 'Current Password' : field === 'next' ? 'New Password' : 'Confirm Password'}
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={passwordForm[field]}
                                                            onChange={e => setPasswordForm(prev => ({ ...prev, [field]: e.target.value }))}
                                                            className="w-full bg-white border border-light-grey px-4 py-2.5 rounded-xl text-sm font-bold text-primary-black focus:outline-none focus:ring-2 focus:ring-primary-black"
                                                            placeholder={field === 'current' ? '••••••••' : field === 'next' ? 'Min 8 characters' : 'Re-enter new password'}
                                                        />
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => {
                                                        if (!passwordForm.current) { toast.error('Current password required'); return; }
                                                        if (passwordForm.next.length < 8) { toast.error('Too short', 'New password must be at least 8 characters.'); return; }
                                                        if (passwordForm.next !== passwordForm.confirm) { toast.error('Mismatch', 'New password and confirmation do not match.'); return; }
                                                        toast.success('Password updated!', 'Your password has been changed successfully.');
                                                        setPasswordForm({ current: '', next: '', confirm: '' });
                                                        setShowPasswordForm(false);
                                                    }}
                                                    className="w-full py-2.5 bg-primary-black text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                                                >Update Password</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Notifications toggle */}
                                <button
                                    onClick={() => {
                                        setNotificationsOn(v => !v);
                                        toast.info(!notificationsOn ? 'Notifications on' : 'Notifications off', !notificationsOn ? 'You will receive email & push alerts.' : 'You will no longer receive alerts.');
                                    }}
                                    className="w-full flex items-center justify-between p-4 bg-light-grey rounded-xl hover:bg-neutral-200 transition-colors group"
                                >
                                    <span className="font-bold text-primary-black flex items-center gap-3">
                                        <Bell size={18} /> Notifications
                                    </span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded transition-colors ${notificationsOn ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-grey'}`}>
                                        {notificationsOn ? 'On' : 'Off'}
                                    </span>
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
                    <NavItem icon={<MessageSquare size={22} />} label="Leads" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
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
                        <button
                            onClick={() => setActiveTab('settings')}
                            className="flex items-center gap-3 pl-6 border-l border-light-grey group"
                            title="Open Settings"
                        >
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-primary-black group-hover:text-neutral-grey transition-colors">Admin User</p>
                                <p className="text-xs text-neutral-grey font-medium">Super Admin</p>
                            </div>
                            <div className="w-12 h-12 bg-primary-black rounded-full overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform">
                                <img src={avatarUrl} alt="Admin" className="w-full h-full object-cover" />
                            </div>
                        </button>
                    </div>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </div>
    );
};

// ─── Subcomponents ───────────────────────────────────────────────────────────

const NavItem = ({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl w-full text-base font-bold transition-all ${active ? 'bg-primary-black text-white shadow-lg scale-[1.02]' : 'text-neutral-grey hover:bg-light-grey hover:text-primary-black'
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

// Custom themed status dropdown replacing native <select>
const LeadStatusDropdown = ({ statuses, value, onChange }: { statuses: { value: string; label: string; dot: string }[]; value: string; onChange: (s: string) => void }) => {
    const [open, setOpen] = useState(false);
    const current = statuses.find(s => s.value === value) || statuses[0];
    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-1.5 bg-light-grey hover:bg-neutral-200 rounded-full text-xs font-bold text-primary-black transition-colors"
            >
                <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
                {current.label}
                <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <>
                    {/* backdrop */}
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full mt-1.5 w-36 bg-white border border-light-grey rounded-2xl shadow-xl py-1.5 z-20 overflow-hidden">
                        {statuses.map(s => (
                            <button
                                key={s.value}
                                onClick={() => { onChange(s.value); setOpen(false); }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-primary-black hover:bg-light-grey transition-colors"
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                {s.label}
                                {s.value === value && <Check size={11} className="ml-auto text-primary-black" />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// Agent Add / Edit slide-in modal
const ROLES = ['Senior Agent', 'Sales Associate', 'Property Manager', 'Junior Agent', 'Team Lead'];
const AgentModal = ({ isOpen, agent, onClose, onSave }: { isOpen: boolean; agent: any; onClose: () => void; onSave: (d: any) => void }) => {
    const [form, setForm] = useState({ name: '', role: 'Sales Associate', email: '', phone: '', sales: 0, rating: 5.0 });
    useEffect(() => {
        if (agent) setForm({ name: agent.name, role: agent.role, email: agent.email, phone: agent.phone, sales: agent.sales, rating: agent.rating });
        else setForm({ name: '', role: 'Sales Associate', email: '', phone: '', sales: 0, rating: 5.0 });
    }, [agent, isOpen]);

    const field = (label: string, key: string, type = 'text') => (
        <div>
            <label className="block text-xs font-bold text-neutral-grey uppercase mb-1">{label}</label>
            <input
                type={type}
                value={(form as any)[key]}
                onChange={e => setForm(f => ({ ...f, [key]: type === 'number' ? parseFloat(e.target.value) : e.target.value }))}
                className="w-full bg-light-grey px-4 py-3 rounded-xl font-bold text-primary-black focus:outline-none focus:border focus:border-primary-black transition-all"
            />
        </div>
    );

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[999] flex justify-end">
            {/* dimmed backdrop */}
            <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col font-display"
            >
                {/* Header */}
                <div className="p-8 border-b border-light-grey flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-primary-black">{agent ? 'Edit Agent' : 'Add New Agent'}</h2>
                        <p className="text-neutral-grey text-sm mt-1">{agent ? 'Update agent details' : 'Fill in the details below'}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-light-grey rounded-full transition-colors"><X size={20} /></button>
                </div>

                {/* Form */}
                <div className="p-8 flex-1 space-y-5">
                    {field('Full Name', 'name')}
                    <div>
                        <label className="block text-xs font-bold text-neutral-grey uppercase mb-1">Role</label>
                        <select
                            value={form.role}
                            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                            className="w-full bg-light-grey px-4 py-3 rounded-xl font-bold text-primary-black focus:outline-none appearance-none cursor-pointer"
                        >
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    {field('Email Address', 'email', 'email')}
                    {field('Phone Number', 'phone', 'tel')}
                    <div className="grid grid-cols-2 gap-4">
                        {field('Sales Count', 'sales', 'number')}
                        {field('Rating (0–5)', 'rating', 'number')}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-light-grey flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-light-grey text-primary-black font-bold hover:bg-light-grey transition-colors">Cancel</button>
                    <button
                        onClick={() => onSave({ ...(agent ? { id: agent.id } : {}), ...form })}
                        disabled={!form.name || !form.email}
                        className="flex-1 py-3 rounded-xl bg-primary-black text-white font-bold hover:bg-neutral-grey transition-colors disabled:opacity-40"
                    >
                        {agent ? 'Save Changes' : 'Add Agent'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
