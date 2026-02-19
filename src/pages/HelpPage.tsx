import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "How do I schedule a viewing?",
        answer: "You can schedule a viewing directly from the property page by clicking the 'Send a request' button. Our agent will get back to you within 24 hours to confirm a time."
    },
    {
        question: "What documents do I need to rent an apartment?",
        answer: "Typically, you will need a valid ID, proof of income (such as pay stubs or an employment letter), and a completed rental application. Some properties may require a credit check."
    },
    {
        question: "Are pets allowed in the properties?",
        answer: "Pet policies vary by property. Look for the 'Pet Friendly' tag in the amenities section of the property listing, or use our search filters to find pet-friendly homes."
    },
    {
        question: "How does the buying process work?",
        answer: "Buying a home involves several steps: getting pre-approved for a mortgage, finding a property, making an offer, home inspection, and closing. Our agents guide you through every step."
    }
];

const HelpPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen font-display bg-white">
            <Navbar />
            <div className="pt-20 pb-20">
                <div className="max-w-[800px] mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-black mb-6 text-center">How can we help?</h1>
                    <p className="text-xl text-neutral-grey text-center mb-16">
                        Find answers to common questions about buying, renting, and selling with Bricklane co.
                    </p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-light-grey rounded-std overflow-hidden">
                                <button
                                    className="w-full flex justify-between items-center p-6 bg-white hover:bg-light-grey/10 transition-colors text-left"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className="font-bold text-lg text-primary-black">{faq.question}</span>
                                    {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {openIndex === index && (
                                    <div className="p-6 pt-0 text-neutral-grey leading-relaxed bg-white">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
                        <p className="text-neutral-grey mb-8">Our support team is available 24/7 to assist you.</p>
                        <button className="bg-primary-black text-white px-8 py-3 rounded-std font-bold hover:bg-neutral-grey transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HelpPage;
