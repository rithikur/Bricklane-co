import { useState, useMemo } from 'react';
import { Calculator, Calendar } from 'lucide-react';

interface MortgageCalculatorProps {
    propertyPrice: number;
}

const MortgageCalculator = ({ propertyPrice }: MortgageCalculatorProps) => {
    // Inputs
    const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8); // 80% default
    const [interestRate, setInterestRate] = useState(8.5); // 8.5% default in India
    const [loanTerm, setLoanTerm] = useState(20); // 20 years default

    // Calculation logic
    const monthlyPayment = useMemo(() => {
        // Actually propertyPrice is in Cr. Let's work with Cr.
        const P = loanAmount * 10000000;
        const r = (interestRate / 100) / 12;
        const n = loanTerm * 12;

        if (r === 0) return P / n;

        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        return emi;
    }, [loanAmount, interestRate, loanTerm]);

    const formatCurrency = (amt: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amt);
    };

    return (
        <div className="bg-light-grey/20 dark:bg-dark-surface/50 rounded-std border border-light-grey dark:border-dark-border p-6 mt-12 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-black dark:bg-gold text-white dark:text-black rounded-lg">
                    <Calculator size={20} />
                </div>
                <h3 className="text-xl font-bold text-primary-black dark:text-white">Mortgage Calculator</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Loan Amount */}
                <div>
                    <label className="block text-xs font-bold text-neutral-grey dark:text-neutral-grey/60 uppercase tracking-wider mb-2">Loan Amount (Cr)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-grey">₹</span>
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2.5 bg-white dark:bg-dark-surface border border-light-grey dark:border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-primary-black dark:text-white font-bold transition-colors"
                            step="0.1"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={propertyPrice}
                        step="0.1"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full mt-2 accent-gold"
                    />
                </div>

                {/* Interest Rate */}
                <div>
                    <label className="block text-xs font-bold text-neutral-grey dark:text-neutral-grey/60 uppercase tracking-wider mb-2">Interest Rate (%)</label>
                    <div className="relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-grey">%</span>
                        <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full pl-3 pr-8 py-2.5 bg-white dark:bg-dark-surface border border-light-grey dark:border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-primary-black dark:text-white font-bold transition-colors"
                            step="0.1"
                        />
                    </div>
                </div>

                {/* Loan Term */}
                <div>
                    <label className="block text-xs font-bold text-neutral-grey dark:text-neutral-grey/60 uppercase tracking-wider mb-2">Duration (Years)</label>
                    <div className="relative">
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-grey" size={16} />
                        <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            className="w-full pl-3 pr-8 py-2.5 bg-white dark:bg-dark-surface border border-light-grey dark:border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-primary-black dark:text-white font-bold transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-primary-black dark:bg-gold text-white dark:text-black p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
                <div>
                    <p className="text-white/60 dark:text-black/60 text-xs font-bold uppercase tracking-[0.2em] mb-1">Estimated Monthly Payment</p>
                    <h4 className="text-3xl md:text-4xl font-bold tracking-tighter">{formatCurrency(monthlyPayment)}</h4>
                </div>
                <button className="bg-white dark:bg-primary-black text-primary-black dark:text-white px-6 py-3 rounded-std font-bold text-sm hover:bg-neutral-grey dark:hover:bg-dark-surface hover:text-white transition-all w-full md:w-auto">
                    Get Pre-Approved
                </button>
            </div>
            <p className="text-[10px] text-neutral-grey dark:text-neutral-grey/60 mt-4 text-center md:text-left italic">
                * This is an estimate. Actual rates may vary based on your credit score and bank policies.
            </p>
        </div>
    );
};

export default MortgageCalculator;
