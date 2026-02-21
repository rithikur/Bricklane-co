import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Simulating a slight delay for better UX feel
        setTimeout(() => {
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        }, 100);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-display">
            {/* Left Side - Image & Branding */}
            <div className="relative hidden lg:flex flex-col justify-end p-16 bg-primary-black overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=2070"
                        alt="Background"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl font-bold mb-4">Welcome Back.</h1>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            Manage your premium property portfolio with ease. Access detailed analytics, update listings, and connect with clients.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-8 bg-white relative">
                <div className="absolute top-8 right-8">
                    <button onClick={() => navigate('/')} className="text-neutral-grey hover:text-primary-black text-sm font-bold flex items-center gap-2 transition-colors">
                        Back to Site <ArrowRight size={16} />
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-black text-white mb-6 shadow-lg text-2xl font-bold">
                            B
                        </div>
                        <h2 className="text-3xl font-bold text-primary-black mb-2">Admin Portal</h2>
                        <p className="text-neutral-grey">Sign in to your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-primary-black mb-2 ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 text-neutral-grey group-focus-within:text-primary-black transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-light-grey rounded-xl outline-none border border-transparent focus:border-neutral-grey/50 focus:bg-white transition-all"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="block text-sm font-bold text-primary-black">Password</label>
                                <a href="#" className="text-xs text-neutral-grey hover:text-primary-black font-medium transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-neutral-grey group-focus-within:text-primary-black transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-light-grey rounded-xl outline-none border border-transparent focus:border-neutral-grey/50 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg flex items-center justify-center border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary-black text-white font-bold py-4 rounded-xl hover:bg-neutral-grey transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 duration-300 flex items-center justify-center gap-2 group"
                        >
                            <span>Sign In</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-neutral-grey text-sm">
                            Don't have an account? <span className="font-bold text-primary-black cursor-pointer hover:underline">Contact Support</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
