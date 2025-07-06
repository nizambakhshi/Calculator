import React, { useState, useEffect } from 'react';
import { FileText, Calculator } from 'lucide-react';

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState('1000000');
  const [regime, setRegime] = useState('new');
  const [deductions, setDeductions] = useState('150000');
  const [hra, setHra] = useState('0');
  const [lta, setLta] = useState('0');
  const [professionalTax, setProfessionalTax] = useState('2400');
  
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [incomeTax, setIncomeTax] = useState(0);
  const [cess, setCess] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  const calculateTax = () => {
    const grossIncome = parseFloat(income);
    const deductionsAmount = parseFloat(deductions);
    const hraAmount = parseFloat(hra);
    const ltaAmount = parseFloat(lta);
    const profTax = parseFloat(professionalTax);

    let taxableIncomeCalc = grossIncome;
    
    if (regime === 'old') {
      // Old regime with deductions
      taxableIncomeCalc = grossIncome - deductionsAmount - hraAmount - ltaAmount;
    }
    // New regime has higher basic exemption but no deductions

    taxableIncomeCalc = Math.max(0, taxableIncomeCalc);
    setTaxableIncome(taxableIncomeCalc);

    let tax = 0;

    if (regime === 'new') {
      // New Tax Regime (FY 2023-24)
      if (taxableIncomeCalc <= 300000) {
        tax = 0;
      } else if (taxableIncomeCalc <= 600000) {
        tax = (taxableIncomeCalc - 300000) * 0.05;
      } else if (taxableIncomeCalc <= 900000) {
        tax = 15000 + (taxableIncomeCalc - 600000) * 0.10;
      } else if (taxableIncomeCalc <= 1200000) {
        tax = 45000 + (taxableIncomeCalc - 900000) * 0.15;
      } else if (taxableIncomeCalc <= 1500000) {
        tax = 90000 + (taxableIncomeCalc - 1200000) * 0.20;
      } else {
        tax = 150000 + (taxableIncomeCalc - 1500000) * 0.30;
      }
    } else {
      // Old Tax Regime
      if (taxableIncomeCalc <= 250000) {
        tax = 0;
      } else if (taxableIncomeCalc <= 500000) {
        tax = (taxableIncomeCalc - 250000) * 0.05;
      } else if (taxableIncomeCalc <= 1000000) {
        tax = 12500 + (taxableIncomeCalc - 500000) * 0.20;
      } else {
        tax = 112500 + (taxableIncomeCalc - 1000000) * 0.30;
      }
    }

    setIncomeTax(tax);

    // Health and Education Cess (4% of income tax)
    const cessAmount = tax * 0.04;
    setCess(cessAmount);

    const totalTaxAmount = tax + cessAmount + profTax;
    setTotalTax(totalTaxAmount);

    const netIncomeAmount = grossIncome - totalTaxAmount;
    setNetIncome(netIncomeAmount);
  };

  useEffect(() => {
    calculateTax();
  }, [income, regime, deductions, hra, lta, professionalTax]);

  const getTaxSlabs = () => {
    if (regime === 'new') {
      return [
        { range: '₹0 - ₹3,00,000', rate: '0%' },
        { range: '₹3,00,001 - ₹6,00,000', rate: '5%' },
        { range: '₹6,00,001 - ₹9,00,000', rate: '10%' },
        { range: '₹9,00,001 - ₹12,00,000', rate: '15%' },
        { range: '₹12,00,001 - ₹15,00,000', rate: '20%' },
        { range: 'Above ₹15,00,000', rate: '30%' },
      ];
    } else {
      return [
        { range: '₹0 - ₹2,50,000', rate: '0%' },
        { range: '₹2,50,001 - ₹5,00,000', rate: '5%' },
        { range: '₹5,00,001 - ₹10,00,000', rate: '20%' },
        { range: 'Above ₹10,00,000', rate: '30%' },
      ];
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <FileText className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Income Tax Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Gross Income (₹)</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                placeholder="Enter annual income"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tax Regime</label>
              <select
                value={regime}
                onChange={(e) => setRegime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg bg-white"
              >
                <option value="new">New Tax Regime (FY 2023-24)</option>
                <option value="old">Old Tax Regime</option>
              </select>
            </div>

            {regime === 'old' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Deductions under 80C, 80D etc. (₹)</label>
                  <input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                    placeholder="Enter deductions"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">HRA Exemption (₹)</label>
                  <input
                    type="number"
                    value={hra}
                    onChange={(e) => setHra(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                    placeholder="Enter HRA exemption"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">LTA Exemption (₹)</label>
                  <input
                    type="number"
                    value={lta}
                    onChange={(e) => setLta(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                    placeholder="Enter LTA exemption"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Professional Tax (₹)</label>
              <input
                type="number"
                value={professionalTax}
                onChange={(e) => setProfessionalTax(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                placeholder="Enter professional tax"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-4">Tax Calculation</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-indigo-700">Gross Income:</span>
                  <span className="font-semibold">₹{parseFloat(income).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-700">Taxable Income:</span>
                  <span className="font-semibold">₹{taxableIncome.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-700">Income Tax:</span>
                  <span className="font-semibold">₹{incomeTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-700">Health & Education Cess:</span>
                  <span className="font-semibold">₹{cess.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-700">Professional Tax:</span>
                  <span className="font-semibold">₹{parseFloat(professionalTax).toLocaleString()}</span>
                </div>
                <hr className="border-indigo-200" />
                <div className="flex justify-between">
                  <span className="text-indigo-700 font-semibold">Total Tax:</span>
                  <span className="text-xl font-bold text-indigo-900">
                    ₹{totalTax.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-700 font-semibold">Net Income:</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{netIncome.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tax Slabs ({regime === 'new' ? 'New Regime' : 'Old Regime'})
              </h3>
              <div className="space-y-2">
                {getTaxSlabs().map((slab, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{slab.range}</span>
                    <span className="font-semibold">{slab.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Important Notes</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• This is an estimate for FY 2023-24</li>
                <li>• Consult a tax advisor for accurate calculations</li>
                <li>• Consider all applicable deductions and exemptions</li>
                <li>• TDS and advance tax may apply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;