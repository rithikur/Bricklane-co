import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, User, Lock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            // Login Logic
            if (email === 'user@example.com' && password === 'password') {
                navigate('/');
            } else {
                setError('Invalid credentials. Try user@example.com / password');
            }
        } else {
            // Register Logic
            if (email && password && name) {
                // Determine if this is the first user (Admin) for demo purposes
                // Ideally this would be handled by a backend
                // For now, we simulate success
                localStorage.setItem('user', JSON.stringify({ name, email }));
                navigate('/');
            } else {
                setError('Please fill in all fields.');
            }
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-display">
            {/* Left Side - Image */}
            <div className="relative hidden lg:flex flex-col justify-end p-16 bg-primary-black overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070"
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
                        <h1 className="text-5xl font-bold mb-4">
                            {isLogin ? "Welcome Back." : "Join the Exclusive."}
                        </h1>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            {isLogin
                                ? "Access your saves, view exclusive listings, and manage your property journey."
                                : "Create an account to unlock premium features and personalized recommendations."}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-white relative">
                <div className="absolute top-8 right-8">
                    <Link to="/" className="text-neutral-grey hover:text-primary-black text-sm font-bold flex items-center gap-2 transition-colors">
                        Back to Site <ArrowRight size={16} />
                    </Link>
                </div>

                <motion.div
                    key={isLogin ? "login" : "register"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-black text-white mb-6 shadow-lg text-2xl font-bold">
                            B
                        </div>
                        <h2 className="text-3xl font-bold text-primary-black mb-2">
                            {isLogin ? "Sign In" : "Create Account"}
                        </h2>
                        <p className="text-neutral-grey">
                            {isLogin ? "Enter your details below" : "Start your journey with us"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode='popLayout'>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <label className="block text-sm font-bold text-primary-black mb-2 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 text-neutral-grey group-focus-within:text-primary-black transition-colors" size={20} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black transition-all border border-transparent focus:bg-white"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-sm font-bold text-primary-black mb-2 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-neutral-grey group-focus-within:text-primary-black transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black transition-all border border-transparent focus:bg-white"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="block text-sm font-bold text-primary-black">Password</label>
                                {isLogin && <a href="#" className="text-xs text-neutral-grey hover:text-primary-black font-medium transition-colors">Forgot password?</a>}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-neutral-grey group-focus-within:text-primary-black transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-light-grey rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-black transition-all border border-transparent focus:bg-white"
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
                            <span>{isLogin ? "Sign In" : "Create Account"}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-neutral-grey text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="font-bold text-primary-black cursor-pointer hover:underline"
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
