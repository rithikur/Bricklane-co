
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg font-display text-primary-black dark:text-white transition-colors">
            <Navbar />

            <main className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="mb-20">
                    <span className="text-sm font-bold text-neutral-grey dark:text-neutral-grey/60 uppercase tracking-wider block mb-4">Legal</span>
                    <h1 className="text-5xl font-bold mb-8 dark:text-white">Privacy Policy.</h1>
                    <p className="text-xl text-neutral-grey dark:text-neutral-grey/80">Your privacy is critically important to us. This policy outlines how we collect, use, and protect your personal information.</p>
                </div>

                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-gold">1. Information We Collect</h2>
                    <p className="text-neutral-grey dark:text-neutral-grey/80 mb-6">
                        We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, request property details, or contact customer support. This may include your name, email address, phone number, and preferences for property types and locations.
                    </p>
                    <p className="text-neutral-grey dark:text-neutral-grey/80 mb-6">
                        We also automatically collect certain information when you access our services, including your IP address, browser type, device information, and usage data through cookies and similar technologies.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-gold">2. How We Use Your Information</h2>
                    <p className="text-neutral-grey dark:text-neutral-grey/80 mb-6">
                        We use the information we collect to provide, maintain, and improve our services. Specifically, we use your data to:
                    </p>
                    <ul className="list-disc pl-6 mb-6 text-neutral-grey dark:text-neutral-grey/80 space-y-2">
                        <li>Process transactions and send related information.</li>
                        <li>Send you technical notices, updates, security alerts, and support messages.</li>
                        <li>Respond to your comments, questions, and requests.</li>
                        <li>Communicate with you about products, services, offers, promotions, and events.</li>
                        <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-gold">3. Sharing of Information</h2>
                    <p className="text-neutral-grey dark:text-neutral-grey/80 mb-6">
                        We do not share your personal information with third parties except as described in this privacy policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-gold">4. Data Security</h2>
                    <p className="text-neutral-grey dark:text-neutral-grey/80 mb-6">
                        We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is completely secure, and we cannot guarantee the absolute security of your data.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-gold">5. Your Choices</h2>
                    <p className="text-neutral-grey dark:text-neutral-grey/80 mb-6">
                        You may update, correct, or delete information about you at any time by logging into your online account or emailing us at privacy@bricklane.co. You may also opt out of receiving promotional communications from us by following the instructions in those messages.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-gold">6. Changes to this Policy</h2>
                    <p className="text-neutral-grey dark:text-neutral-grey/80 mb-6">
                        We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).
                    </p>

                    <div className="mt-16 pt-8 border-t border-light-grey dark:border-dark-border text-sm text-neutral-grey dark:text-neutral-grey/60">
                        <p>Last updated: February 20, 2026</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicyPage;
