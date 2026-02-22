import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ToastContainer, useToast } from '../components/common/Toast';

const ContactSupportPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const { toasts, dismiss, toast } = useToast();

    const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(prev => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) { toast.error('Name required', 'Please enter your name.'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error('Invalid email', 'Please enter a valid email address.'); return; }
        if (!form.message.trim()) { toast.error('Message required', 'Please write a message before sending.'); return; }

        setLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        toast.success('Message sent!', 'We\'ll get back to you within 24 hours.');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg font-display text-primary-black dark:text-white transition-colors">
            <Navbar />

            <main className="container mx-auto px-6 py-32 max-w-6xl">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider block mb-4">Support</span>
                    <h1 className="text-5xl font-bold mb-8">Get in Touch.</h1>
                    <p className="text-xl text-neutral-grey">Whether you have a question about a property, need assistance with our platform, or just want to say hello, we're here to help.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    <div className="bg-light-grey/30 dark:bg-dark-surface p-12 rounded-std border border-light-grey dark:border-dark-border">
                        <h2 className="text-3xl font-bold mb-8 dark:text-gold">Send us a message</h2>
                        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                            <div>
                                <label className="block text-sm font-bold mb-2 ml-1">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={update('name')}
                                    className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-grey dark:border-dark-border rounded-std focus:outline-none focus:border-primary-black dark:focus:border-gold transition-colors text-primary-black dark:text-white"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 ml-1">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={update('email')}
                                    className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-grey dark:border-dark-border rounded-std focus:outline-none focus:border-primary-black dark:focus:border-gold transition-colors text-primary-black dark:text-white"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 ml-1">Message</label>
                                <textarea
                                    value={form.message}
                                    onChange={update('message')}
                                    className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-light-grey dark:border-dark-border rounded-std focus:outline-none focus:border-primary-black dark:focus:border-gold transition-colors h-32 resize-none text-primary-black dark:text-white"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary-black dark:bg-gold text-white dark:text-black font-bold py-4 rounded-std hover:bg-neutral-grey dark:hover:bg-gold-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Sending…
                                    </>
                                ) : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col justify-center space-y-12">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary-black dark:bg-gold text-white dark:text-black rounded-full"><Mail size={20} /></div>
                                <h3 className="text-xl font-bold">Email Us</h3>
                            </div>
                            <p className="text-neutral-grey ml-14 mb-1">General Inquiries</p>
                            <a href="mailto:hello@bricklane.co" className="text-lg font-bold ml-14 hover:underline">hello@bricklane.co</a>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary-black dark:bg-gold text-white dark:text-black rounded-full"><Phone size={20} /></div>
                                <h3 className="text-xl font-bold">Call Us</h3>
                            </div>
                            <p className="text-neutral-grey ml-14 mb-1">Mon-Fri from 9am to 6pm</p>
                            <a href="tel:+912212345678" className="text-lg font-bold ml-14 hover:underline">+91 22 1234 5678</a>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary-black dark:bg-gold text-white dark:text-black rounded-full"><MapPin size={20} /></div>
                                <h3 className="text-xl font-bold">Visit Us</h3>
                            </div>
                            <p className="text-neutral-grey ml-14 max-w-xs leading-relaxed">
                                42, Bricklane House, Worli Sea Face,<br />
                                Mumbai, Maharashtra 400030
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </div>
    );
};

export default ContactSupportPage;
