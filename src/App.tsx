import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Existing calculators
import BasicCalculator from './pages/BasicCalculator';
import ScientificCalculator from './pages/ScientificCalculator';
import LengthConverter from './pages/converters/LengthConverter';
import WeightConverter from './pages/converters/WeightConverter';
import TemperatureConverter from './pages/converters/TemperatureConverter';
import VolumeConverter from './pages/converters/VolumeConverter';
import LoanCalculator from './pages/finance/LoanCalculator';
import MortgageCalculator from './pages/finance/MortgageCalculator';
import CompoundInterestCalculator from './pages/finance/CompoundInterestCalculator';
import BMICalculator from './pages/health/BMICalculator';
import CalorieCalculator from './pages/health/CalorieCalculator';
import PercentageCalculator from './pages/math/PercentageCalculator';
import FractionCalculator from './pages/math/FractionCalculator';
import DateCalculator from './pages/DateCalculator';

// Health calculators
import BodyFatCalculator from './pages/health/BodyFatCalculator';
import PregnancyCalculator from './pages/health/PregnancyCalculator';
import IdealWeightCalculator from './pages/health/IdealWeightCalculator';
import BMRCalculator from './pages/health/BMRCalculator';

// Math calculators
import PrimeNumberCalculator from './pages/math/PrimeNumberCalculator';
import RandomNumberGenerator from './pages/math/RandomNumberGenerator';

// Construction calculators
import AreaCalculator from './pages/construction/AreaCalculator';
import ConcreteCalculator from './pages/construction/ConcreteCalculator';
import CarpentryCalculator from './pages/construction/CarpentryCalculator';
import TileCalculator from './pages/construction/TileCalculator';

// Finance calculators
import InvestmentCalculator from './pages/finance/InvestmentCalculator';
import SavingsCalculator from './pages/finance/SavingsCalculator';
import CreditCardCalculator from './pages/finance/CreditCardCalculator';
import RetirementCalculator from './pages/finance/RetirementCalculator';
import TaxCalculator from './pages/finance/TaxCalculator';
import CurrencyConverter from './pages/finance/CurrencyConverter';
import SIPCalculator from './pages/finance/SIPCalculator';
import StepUpSIPCalculator from './pages/finance/StepUpSIPCalculator';
import SWPCalculator from './pages/finance/SWPCalculator';
import STPCalculator from './pages/finance/STPCalculator';

// Conversion tools
import SpeedConverter from './pages/converters/SpeedConverter';
import CookingConverter from './pages/converters/CookingConverter';

// Sports calculators
import PaceCalculator from './pages/sports/PaceCalculator';
import BikeSpeedCalculator from './pages/sports/BikeSpeedCalculator';
import GolfCalculator from './pages/sports/GolfCalculator';
import SwimmingPoolCalculator from './pages/sports/SwimmingPoolCalculator';

// Miscellaneous calculators
import AgeCalculator from './pages/misc/AgeCalculator';
import TimeCalculator from './pages/misc/TimeCalculator';
import FuelCostCalculator from './pages/misc/FuelCostCalculator';
import PasswordGenerator from './pages/misc/PasswordGenerator';
import GratuityCalculator from './pages/misc/GratuityCalculator';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Existing calculators */}
          <Route path="/basic-calculator" element={<BasicCalculator />} />
          <Route path="/scientific-calculator" element={<ScientificCalculator />} />
          <Route path="/length-converter" element={<LengthConverter />} />
          <Route path="/weight-converter" element={<WeightConverter />} />
          <Route path="/temperature-converter" element={<TemperatureConverter />} />
          <Route path="/volume-converter" element={<VolumeConverter />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/compound-interest-calculator" element={<CompoundInterestCalculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/fraction-calculator" element={<FractionCalculator />} />
          <Route path="/date-calculator" element={<DateCalculator />} />

          {/* Health calculators */}
          <Route path="/body-fat-calculator" element={<BodyFatCalculator />} />
          <Route path="/pregnancy-calculator" element={<PregnancyCalculator />} />
          <Route path="/ideal-weight-calculator" element={<IdealWeightCalculator />} />
          <Route path="/bmr-calculator" element={<BMRCalculator />} />

          {/* Math calculators */}
          <Route path="/prime-number-calculator" element={<PrimeNumberCalculator />} />
          <Route path="/random-number-generator" element={<RandomNumberGenerator />} />

          {/* Construction calculators */}
          <Route path="/area-calculator" element={<AreaCalculator />} />
          <Route path="/concrete-calculator" element={<ConcreteCalculator />} />
          <Route path="/carpentry-calculator" element={<CarpentryCalculator />} />
          <Route path="/tile-calculator" element={<TileCalculator />} />

          {/* Finance calculators */}
          <Route path="/investment-calculator" element={<InvestmentCalculator />} />
          <Route path="/savings-calculator" element={<SavingsCalculator />} />
          <Route path="/credit-card-calculator" element={<CreditCardCalculator />} />
          <Route path="/retirement-calculator" element={<RetirementCalculator />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/stepup-sip-calculator" element={<StepUpSIPCalculator />} />
          <Route path="/swp-calculator" element={<SWPCalculator />} />
          <Route path="/stp-calculator" element={<STPCalculator />} />

          {/* Conversion tools */}
          <Route path="/speed-converter" element={<SpeedConverter />} />
          <Route path="/cooking-converter" element={<CookingConverter />} />

          {/* Sports calculators */}
          <Route path="/pace-calculator" element={<PaceCalculator />} />
          <Route path="/bike-speed-calculator" element={<BikeSpeedCalculator />} />
          <Route path="/golf-calculator" element={<GolfCalculator />} />
          <Route path="/swimming-pool-calculator" element={<SwimmingPoolCalculator />} />

          {/* Miscellaneous calculators */}
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/time-calculator" element={<TimeCalculator />} />
          <Route path="/fuel-cost-calculator" element={<FuelCostCalculator />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/gratuity-calculator" element={<GratuityCalculator />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;