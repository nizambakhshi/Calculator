import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Menu, X, ChevronDown } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navigation = [
    {
      name: 'Health',
      items: [
        { name: 'BMI Calculator', href: '/bmi-calculator', icon: '🏥' },
        { name: 'Calorie Calculator', href: '/calorie-calculator', icon: '🔥' },
        { name: 'Body Fat Calculator', href: '/body-fat-calculator', icon: '📊' },
        { name: 'Pregnancy Calculator', href: '/pregnancy-calculator', icon: '🤱' },
        { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator', icon: '⚖️' },
        { name: 'BMR Calculator', href: '/bmr-calculator', icon: '💪' },
      ]
    },
    {
      name: 'Finance',
      items: [
        { name: 'Loan Calculator', href: '/loan-calculator', icon: '₹' },
        { name: 'Mortgage Calculator', href: '/mortgage-calculator', icon: '🏠' },
        { name: 'Investment Calculator', href: '/investment-calculator', icon: '📈' },
        { name: 'Savings Calculator', href: '/savings-calculator', icon: '₹' },
        { name: 'Credit Card Calculator', href: '/credit-card-calculator', icon: '₹' },
        { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴' },
        { name: 'Tax Calculator', href: '/tax-calculator', icon: '📋' },
        { name: 'Currency Converter', href: '/currency-converter', icon: '₹' },
        { name: 'SIP Calculator', href: '/sip-calculator', icon: '📊' },
        { name: 'Step-up SIP Calculator', href: '/stepup-sip-calculator', icon: '📈' },
        { name: 'SWP Calculator', href: '/swp-calculator', icon: '💰' },
        { name: 'STP Calculator', href: '/stp-calculator', icon: '🔄' },
        { name: 'ROI Calculator', href: '/roi-calculator', icon: '📈' },
        { name: 'Rule of 72 Calculator', href: '/rule-72-calculator', icon: '⏰' },
        { name: 'Compound Interest Calculator', href: '/compound-interest-calculator', icon: '📊' },
      ]
    },
    {
      name: 'Loan & Mortgage',
      items: [
        { name: 'Loan Calculator', href: '/loan-calculator', icon: '₹' },
        { name: 'Loan Comparison Calculator', href: '/loan-comparison-calculator', icon: '⚖️' },
        { name: 'Mortgage Calculator', href: '/mortgage-calculator', icon: '🏠' },
      ]
    },
    {
      name: 'Retirement',
      items: [
        { name: 'Retirement Planner', href: '/retirement-planner', icon: '🎯' },
        { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴' },
      ]
    },
    {
      name: 'Stock & Investment',
      items: [
        { name: 'Stock Return Calculator', href: '/stock-return-calculator', icon: '📈' },
        { name: 'Investment Calculator', href: '/investment-calculator', icon: '💰' },
        { name: 'ROI Calculator', href: '/roi-calculator', icon: '📊' },
      ]
    },
    {
      name: 'Math',
      items: [
        { name: 'Percentage Calculator', href: '/percentage-calculator', icon: '📊' },
        { name: 'Fraction Calculator', href: '/fraction-calculator', icon: '🔢' },
        { name: 'Scientific Calculator', href: '/scientific-calculator', icon: '🧮' },
        { name: 'Prime Number Calculator', href: '/prime-number-calculator', icon: '🔍' },
        { name: 'Random Number Generator', href: '/random-number-generator', icon: '🎲' },
      ]
    },
    {
      name: 'Construction & Building',
      items: [
        { name: 'Area Calculator', href: '/area-calculator', icon: '📐' },
        { name: 'Volume Calculator', href: '/volume-converter', icon: '📦' },
        { name: 'Concrete Calculator', href: '/concrete-calculator', icon: '🏗️' },
        { name: 'Carpentry Calculator', href: '/carpentry-calculator', icon: '🔨' },
        { name: 'Tile Calculator', href: '/tile-calculator', icon: '🧱' },
      ]
    },
    {
      name: 'Unit Converters',
      items: [
        { name: 'Length Converter', href: '/length-converter', icon: '📏' },
        { name: 'Weight Converter', href: '/weight-converter', icon: '⚖️' },
        { name: 'Temperature Converter', href: '/temperature-converter', icon: '🌡️' },
        { name: 'Speed Converter', href: '/speed-converter', icon: '🚗' },
        { name: 'Volume Converter', href: '/volume-converter', icon: '🥤' },
        { name: 'Cooking Converter', href: '/cooking-converter', icon: '👨‍🍳' },
      ]
    },
    {
      name: 'Sports & Fitness',
      items: [
        { name: 'Pace Calculator', href: '/pace-calculator', icon: '🏃' },
        { name: 'Bike Speed Calculator', href: '/bike-speed-calculator', icon: '🚴' },
        { name: 'Golf Calculator', href: '/golf-calculator', icon: '⛳' },
        { name: 'Swimming Pool Calculator', href: '/swimming-pool-calculator', icon: '🏊' },
      ]
    },
    {
      name: 'General Calculators',
      items: [
        { name: 'Basic Calculator', href: '/basic-calculator', icon: '🧮' },
        { name: 'Scientific Calculator', href: '/scientific-calculator', icon: '🔬' },
        { name: 'Date Calculator', href: '/date-calculator', icon: '📅' },
      ]
    },
    {
      name: 'Miscellaneous Tools',
      items: [
        { name: 'Age Calculator', href: '/age-calculator', icon: '🎂' },
        { name: 'Time Calculator', href: '/time-calculator', icon: '⏰' },
        { name: 'Fuel Cost Calculator', href: '/fuel-cost-calculator', icon: '⛽' },
        { name: 'Password Generator', href: '/password-generator', icon: '🔐' },
        { name: 'Gratuity Calculator', href: '/gratuity-calculator', icon: '₹' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Calculator className="h-8 w-8" />
              <span className="text-xl font-bold">Calculator Site</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              {navigation.map((section) => (
                <div key={section.name} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === section.name ? null : section.name)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors py-2 px-3 rounded-md"
                  >
                    <span className="font-medium">{section.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {openDropdown === section.name && (
                    <div className="absolute top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                              location.pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            }`}
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
              {navigation.map((section) => (
                <div key={section.name}>
                  <div className="text-sm font-bold text-gray-900 py-2 border-b border-gray-100">{section.name}</div>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-md transition-colors ${
                        location.pathname === item.href
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">© 2025 Calculator Site. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2">Free online calculators for everyday use</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;