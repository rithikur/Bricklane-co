
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSupportPage = () => {
    return (
        <div className="min-h-screen bg-white font-display text-primary-black">
            <Navbar />

            <main className="container mx-auto px-6 py-32 max-w-6xl">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider block mb-4">Support</span>
                    <h1 className="text-5xl font-bold mb-8">Get in Touch.</h1>
                    <p className="text-xl text-neutral-grey">Whether you have a question about a property, need assistance with our platform, or just want to say hello, we're here to help.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    <div className="bg-light-grey/30 p-12 rounded-std border border-light-grey">
                        <h2 className="text-3xl font-bold mb-8">Send us a message</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 ml-1">Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-white border border-light-grey rounded-std focus:outline-none focus:border-primary-black transition-colors" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 ml-1">Email</label>
                                <input type="email" className="w-full px-4 py-3 bg-white border border-light-grey rounded-std focus:outline-none focus:border-primary-black transition-colors" placeholder="name@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 ml-1">Message</label>
                                <textarea className="w-full px-4 py-3 bg-white border border-light-grey rounded-std focus:outline-none focus:border-primary-black transition-colors h-32 resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-primary-black text-white font-bold py-4 rounded-std hover:bg-neutral-grey transition-colors">Send Message</button>
                        </form>
                    </div>

                    <div className="flex flex-col justify-center space-y-12">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary-black text-white rounded-full">
                                    <Mail size={20} />
                                </div>
                                <h3 className="text-xl font-bold">Email Us</h3>
                            </div>
                            <p className="text-neutral-grey ml-14 mb-1">General Inquiries</p>
                            <a href="mailto:hello@bricklane.co" className="text-lg font-bold ml-14 hover:underline">hello@bricklane.co</a>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary-black text-white rounded-full">
                                    <Phone size={20} />
                                </div>
                                <h3 className="text-xl font-bold">Call Us</h3>
                            </div>
                            <p className="text-neutral-grey ml-14 mb-1">Mon-Fri from 9am to 6pm</p>
                            <a href="tel:+912212345678" className="text-lg font-bold ml-14 hover:underline">+91 22 1234 5678</a>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary-black text-white rounded-full">
                                    <MapPin size={20} />
                                </div>
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
        </div>
    );
};

export default ContactSupportPage;
