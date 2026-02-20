
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen bg-white font-display text-primary-black">
            <Navbar />

            <main className="container mx-auto px-6 py-32 max-w-4xl">
                <div className="mb-20">
                    <span className="text-sm font-bold text-neutral-grey uppercase tracking-wider block mb-4">Legal</span>
                    <h1 className="text-5xl font-bold mb-8">Terms of Service.</h1>
                    <p className="text-xl text-neutral-grey">These terms govern your use of the Bricklane platform. By accessing our services, you agree to comply with them.</p>
                </div>

                <div className="prose prose-lg prose-neutral max-w-none">
                    <h2 className="text-2xl font-bold mt-12 mb-6">1. Acceptance of Terms</h2>
                    <p className="text-neutral-grey mb-6">
                        By accessing or using our websites, mobile applications, or other products or services, you agree to be bound by these Terms of Service and all terms incorporated by reference. If you do not agree to all of these terms, do not use our services.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6">2. Use of Services</h2>
                    <p className="text-neutral-grey mb-6">
                        You may use our services for lawful purposes only. You agree not to use our services:
                    </p>
                    <ul className="list-disc pl-6 mb-6 text-neutral-grey space-y-2">
                        <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                        <li>To exploit, harm, or attempt to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.</li>
                        <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
                        <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-12 mb-6">3. Intellectual Property Rights</h2>
                    <p className="text-neutral-grey mb-6">
                        The services and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6">4. User Accounts</h2>
                    <p className="text-neutral-grey mb-6">
                        To access some features of the service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6">5. Listings and Accuracy</h2>
                    <p className="text-neutral-grey mb-6">
                        While we strive to provide accurate information regarding property listings, we do not guarantee the accuracy, completeness, or reliability of any listing information. All property information is subject to change without notice. Verify all details independently.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6">6. Limitation of Liability</h2>
                    <p className="text-neutral-grey mb-6">
                        In no event will the Company, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the services, any websites linked to it, any content on the services or such other websites, including any direct, indirect, special, incidental, consequential, or punitive damages.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6">7. Governing Law</h2>
                    <p className="text-neutral-grey mb-6">
                        All matters relating to the services and these Terms of Service, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed in accordance with the internal laws of the jurisdiction in which the Company is headquartered, without giving effect to any choice or conflict of law provision or rule.
                    </p>

                    <div className="mt-16 pt-8 border-t border-light-grey text-sm text-neutral-grey">
                        <p>Last updated: February 20, 2026</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfServicePage;
