import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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

    return (
        <section id="help" className="py-20 bg-light-grey/20">
            <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-primary-black mb-4 md:mb-6">How can we help?</h2>
                <p className="text-lg md:text-xl text-neutral-grey mb-12 md:mb-16">
                    Find answers to common questions about buying, renting, and selling with Bricklane co.
                </p>

                <div className="space-y-4 text-left">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-light-grey rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                            <button
                                className="w-full flex justify-between items-center p-6 bg-white hover:bg-light-grey/10 transition-colors text-left"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-bold text-lg text-primary-black">{faq.question}</span>
                                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-neutral-grey leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20">
                    <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
                    <p className="text-neutral-grey mb-8">Our support team is available 24/7 to assist you.</p>
                    <Link to="/contact" className="inline-block bg-primary-black text-white px-8 py-3 rounded-full font-bold hover:bg-neutral-grey transition-colors shadow-lg hover:shadow-xl active:scale-95 duration-200">
                        Contact Support
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HelpSection;
