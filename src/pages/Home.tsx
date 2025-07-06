import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Target, TrendingUp, Heart, Ruler, Activity, Wrench, RotateCcw } from 'lucide-react';

const Home: React.FC = () => {
  const categories = [
    {
      title: 'Health Calculators',
      description: 'Monitor and improve your health metrics',
      icon: Heart,
      color: 'bg-red-500',
      items: [
        { name: 'BMI Calculator', href: '/bmi-calculator', desc: 'Calculate Body Mass Index', emoji: '🏥' },
        { name: 'Calorie Calculator', href: '/calorie-calculator', desc: 'Estimate daily calorie needs', emoji: '🔥' },
        { name: 'Body Fat Calculator', href: '/body-fat-calculator', desc: 'Calculate body fat percentage', emoji: '📊' },
        { name: 'Pregnancy Calculator', href: '/pregnancy-calculator', desc: 'Due date and pregnancy tracking', emoji: '🤱' },
        { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator', desc: 'Find your ideal weight range', emoji: '⚖️' },
        { name: 'BMR Calculator', href: '/bmr-calculator', desc: 'Basal Metabolic Rate calculator', emoji: '💪' },
      ]
    },
    {
      title: 'Finance Calculators',
      description: 'Plan your finances with professional tools',
      icon: TrendingUp,
      color: 'bg-green-500',
      items: [
        { name: 'Loan Calculator', href: '/loan-calculator', desc: 'Calculate loan payments and interest', emoji: '₹' },
        { name: 'Mortgage Calculator', href: '/mortgage-calculator', desc: 'Estimate monthly mortgage payments', emoji: '🏠' },
        { name: 'Investment Calculator', href: '/investment-calculator', desc: 'Calculate investment returns', emoji: '📈' },
        { name: 'Savings Calculator', href: '/savings-calculator', desc: 'Plan your savings goals', emoji: '₹' },
        { name: 'SIP Calculator', href: '/sip-calculator', desc: 'Systematic Investment Plan calculator', emoji: '📊' },
        { name: 'Step-up SIP Calculator', href: '/stepup-sip-calculator', desc: 'SIP with annual increases', emoji: '📈' },
        { name: 'SWP Calculator', href: '/swp-calculator', desc: 'Systematic Withdrawal Plan', emoji: '💰' },
        { name: 'STP Calculator', href: '/stp-calculator', desc: 'Systematic Transfer Plan', emoji: '🔄' },
        { name: 'Credit Card Calculator', href: '/credit-card-calculator', desc: 'Calculate credit card payments', emoji: '₹' },
        { name: 'Currency Converter', href: '/currency-converter', desc: 'Convert between currencies', emoji: '₹' },
      ]
    },
    {
      title: 'Math Calculators',
      description: 'Advanced mathematical calculations made easy',
      icon: Target,
      color: 'bg-blue-500',
      items: [
        { name: 'Percentage Calculator', href: '/percentage-calculator', desc: 'Calculate percentages and ratios', emoji: '📊' },
        { name: 'Fraction Calculator', href: '/fraction-calculator', desc: 'Add, subtract, multiply fractions', emoji: '🔢' },
        { name: 'Scientific Calculator', href: '/scientific-calculator', desc: 'Advanced mathematical functions', emoji: '🧮' },
        { name: 'Prime Number Calculator', href: '/prime-number-calculator', desc: 'Find and check prime numbers', emoji: '🔍' },
        { name: 'Random Number Generator', href: '/random-number-generator', desc: 'Generate random numbers', emoji: '🎲' },
      ]
    },
    {
      title: 'Construction & Building',
      description: 'Tools for construction and building projects',
      icon: Wrench,
      color: 'bg-orange-500',
      items: [
        { name: 'Area Calculator', href: '/area-calculator', desc: 'Calculate area of shapes', emoji: '📐' },
        { name: 'Volume Calculator', href: '/volume-converter', desc: 'Calculate volume and capacity', emoji: '📦' },
        { name: 'Concrete Calculator', href: '/concrete-calculator', desc: 'Calculate concrete needed', emoji: '🏗️' },
        { name: 'Carpentry Calculator', href: '/carpentry-calculator', desc: 'Woodworking calculations', emoji: '🔨' },
        { name: 'Tile Calculator', href: '/tile-calculator', desc: 'Calculate tiles needed', emoji: '🧱' },
      ]
    },
    {
      title: 'Unit Converters',
      description: 'Convert between different units of measurement',
      icon: RotateCcw,
      color: 'bg-purple-500',
      items: [
        { name: 'Length Converter', href: '/length-converter', desc: 'Convert meters, feet, inches, etc.', emoji: '📏' },
        { name: 'Weight Converter', href: '/weight-converter', desc: 'Convert kilograms, pounds, ounces, etc.', emoji: '⚖️' },
        { name: 'Temperature Converter', href: '/temperature-converter', desc: 'Convert Celsius, Fahrenheit, Kelvin', emoji: '🌡️' },
        { name: 'Speed Converter', href: '/speed-converter', desc: 'Convert speed units', emoji: '🚗' },
        { name: 'Volume Converter', href: '/volume-converter', desc: 'Convert liters, gallons, cups, etc.', emoji: '🥤' },
        { name: 'Cooking Converter', href: '/cooking-converter', desc: 'Kitchen measurement conversions', emoji: '👨‍🍳' },
      ]
    },
    {
      title: 'Sports & Fitness',
      description: 'Calculators for sports and fitness activities',
      icon: Activity,
      color: 'bg-indigo-500',
      items: [
        { name: 'Pace Calculator', href: '/pace-calculator', desc: 'Calculate running pace', emoji: '🏃' },
        { name: 'Bike Speed Calculator', href: '/bike-speed-calculator', desc: 'Calculate cycling speed', emoji: '🚴' },
        { name: 'Golf Calculator', href: '/golf-calculator', desc: 'Golf handicap and scoring', emoji: '⛳' },
        { name: 'Swimming Pool Calculator', href: '/swimming-pool-calculator', desc: 'Pool volume and chemicals', emoji: '🏊' },
      ]
    },
    {
      title: 'General Calculators',
      description: 'Essential calculation tools for everyday use',
      icon: Calculator,
      color: 'bg-gray-500',
      items: [
        { name: 'Basic Calculator', href: '/basic-calculator', desc: 'Simple arithmetic operations', emoji: '🧮' },
        { name: 'Scientific Calculator', href: '/scientific-calculator', desc: 'Advanced mathematical functions', emoji: '🔬' },
        { name: 'Date Calculator', href: '/date-calculator', desc: 'Calculate days between dates', emoji: '📅' },
      ]
    },
    {
      title: 'Miscellaneous Tools',
      description: 'Useful calculators for everyday tasks',
      icon: Ruler,
      color: 'bg-pink-500',
      items: [
        { name: 'Age Calculator', href: '/age-calculator', desc: 'Calculate exact age', emoji: '🎂' },
        { name: 'Time Calculator', href: '/time-calculator', desc: 'Time calculations and conversions', emoji: '⏰' },
        { name: 'Fuel Cost Calculator', href: '/fuel-cost-calculator', desc: 'Calculate fuel costs', emoji: '⛽' },
        { name: 'Password Generator', href: '/password-generator', desc: 'Generate secure passwords', emoji: '🔐' },
        { name: 'Gratuity Calculator', href: '/gratuity-calculator', desc: 'Calculate tips and gratuity', emoji: '₹' },
      ]
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Free Online <span className="text-blue-600">Calculators</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional-grade calculators for health, finance, math, construction, conversions, sports, and more. 
          Fast, accurate, and easy to use for all your calculation needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/basic-calculator"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Start Calculating
          </Link>
          <Link
            to="/scientific-calculator"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Scientific Calculator
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.title} className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className={`${category.color} p-3 rounded-lg`}>
                <category.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Calculators?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Accurate Results</h3>
              <p className="text-gray-600">Precise calculations with professional-grade algorithms</p>
            </div>
            <div className="space-y-3">
              <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface designed for all skill levels</p>
            </div>
            <div className="space-y-3">
              <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mx-auto">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Always Free</h3>
              <p className="text-gray-600">No sign-up required, completely free to use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;