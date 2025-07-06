import React, { useState, useEffect } from 'react';
import { Baby, Calendar, Heart } from 'lucide-react';

const PregnancyCalculator: React.FC = () => {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState('28');
  const [tab, setTab] = useState('due-date');

  const [dueDate, setDueDate] = useState('');
  const [weeksPregnant, setWeeksPregnant] = useState(0);
  const [daysPregnant, setDaysPregnant] = useState(0);
  const [trimester, setTrimester] = useState('');
  const [conceptionDate, setConceptionDate] = useState('');

  const calculatePregnancy = () => {
    const lmp = new Date(lastPeriod);
    const today = new Date();
    const cycle = parseInt(cycleLength) || 28;

    // Calculate due date (280 days from LMP)
    const due = new Date(lmp);
    due.setDate(due.getDate() + 280);
    setDueDate(due.toISOString().split('T')[0]);

    // Calculate conception date (approximately 14 days after LMP for average cycle)
    const conception = new Date(lmp);
    conception.setDate(conception.getDate() + (cycle / 2));
    setConceptionDate(conception.toISOString().split('T')[0]);

    // Calculate weeks and days pregnant
    const daysDiff = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(daysDiff / 7);
    const days = daysDiff % 7;

    setWeeksPregnant(Math.max(0, weeks));
    setDaysPregnant(Math.max(0, days));

    // Determine trimester
    if (weeks < 13) {
      setTrimester('First Trimester');
    } else if (weeks < 27) {
      setTrimester('Second Trimester');
    } else {
      setTrimester('Third Trimester');
    }
  };

  useEffect(() => {
    calculatePregnancy();
  }, [lastPeriod, cycleLength]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWeeklyMilestones = () => {
    const milestones = [
      { week: 4, milestone: 'Missed period, pregnancy test positive' },
      { week: 6, milestone: 'Heart begins to beat' },
      { week: 8, milestone: 'Major organs begin to develop' },
      { week: 12, milestone: 'End of first trimester, reduced miscarriage risk' },
      { week: 16, milestone: 'Gender can be determined' },
      { week: 20, milestone: 'Anatomy scan, halfway point' },
      { week: 24, milestone: 'Viability milestone' },
      { week: 28, milestone: 'Third trimester begins' },
      { week: 32, milestone: 'Rapid brain development' },
      { week: 36, milestone: 'Baby is considered full-term soon' },
      { week: 40, milestone: 'Due date!' },
    ];

    return milestones.filter(m => m.week >= weeksPregnant).slice(0, 5);
  };

  const tabs = [
    { id: 'due-date', name: 'Due Date Calculator', icon: Calendar },
    { id: 'milestones', name: 'Pregnancy Milestones', icon: Baby },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Baby className="h-8 w-8 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Pregnancy Calculator</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                tab === tabItem.id
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tabItem.icon className="h-4 w-4" />
              <span>{tabItem.name}</span>
            </button>
          ))}
        </div>

        {/* Due Date Calculator Tab */}
        {tab === 'due-date' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Last Menstrual Period (LMP)</label>
                <input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                />
                <p className="text-sm text-gray-500">{formatDate(lastPeriod)}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Cycle Length (days)</label>
                <select
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg bg-white"
                >
                  <option value="21">21 days</option>
                  <option value="22">22 days</option>
                  <option value="23">23 days</option>
                  <option value="24">24 days</option>
                  <option value="25">25 days</option>
                  <option value="26">26 days</option>
                  <option value="27">27 days</option>
                  <option value="28">28 days (average)</option>
                  <option value="29">29 days</option>
                  <option value="30">30 days</option>
                  <option value="31">31 days</option>
                  <option value="32">32 days</option>
                  <option value="33">33 days</option>
                  <option value="34">34 days</option>
                  <option value="35">35 days</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-pink-900 mb-4">Pregnancy Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-pink-700">Weeks Pregnant:</span>
                    <span className="font-bold text-pink-900">{weeksPregnant} weeks, {daysPregnant} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pink-700">Trimester:</span>
                    <span className="font-bold text-pink-900">{trimester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pink-700">Due Date:</span>
                    <span className="font-bold text-pink-900">{formatDate(dueDate).split(',')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Dates</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Conception Date:</span>
                    <span className="font-bold text-blue-900">{formatDate(conceptionDate).split(',')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Due Date:</span>
                    <span className="font-bold text-blue-900">{formatDate(dueDate).split(',')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Days Until Due:</span>
                    <span className="font-bold text-blue-900">
                      {Math.max(0, Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trimester Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trimester Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">First Trimester</h4>
                  <p className="text-sm text-gray-600">Weeks 1-12</p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li>• Major organ development</li>
                    <li>• Morning sickness common</li>
                    <li>• Fatigue and mood changes</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Second Trimester</h4>
                  <p className="text-sm text-gray-600">Weeks 13-26</p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li>• Energy levels improve</li>
                    <li>• Baby movements felt</li>
                    <li>• Anatomy scan performed</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-2">Third Trimester</h4>
                  <p className="text-sm text-gray-600">Weeks 27-40</p>
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    <li>• Rapid weight gain</li>
                    <li>• Preparation for birth</li>
                    <li>• Frequent doctor visits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Milestones Tab */}
        {tab === 'milestones' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Milestones</h3>
              <div className="space-y-3">
                {getWeeklyMilestones().map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-bold">{milestone.week}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Week {milestone.week}</div>
                      <div className="text-sm text-gray-600">{milestone.milestone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Week Info */}
            {weeksPregnant > 0 && (
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-pink-900 mb-4">
                  Week {weeksPregnant} Development
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-pink-800 mb-2">Baby's Development</h4>
                    <div className="text-sm text-pink-700">
                      {weeksPregnant < 8 && "Major organs are forming. Heart begins to beat."}
                      {weeksPregnant >= 8 && weeksPregnant < 12 && "All major organs are present. Baby is about the size of a lime."}
                      {weeksPregnant >= 12 && weeksPregnant < 16 && "Baby can move and has developed reflexes."}
                      {weeksPregnant >= 16 && weeksPregnant < 20 && "Baby's gender can be determined. Hair and nails are growing."}
                      {weeksPregnant >= 20 && weeksPregnant < 24 && "Baby can hear sounds. Rapid brain development."}
                      {weeksPregnant >= 24 && weeksPregnant < 28 && "Baby's lungs are developing. Viability milestone reached."}
                      {weeksPregnant >= 28 && weeksPregnant < 32 && "Baby's bones are hardening. Eyes can open and close."}
                      {weeksPregnant >= 32 && weeksPregnant < 36 && "Baby is gaining weight rapidly. Brain development continues."}
                      {weeksPregnant >= 36 && "Baby is considered full-term. Ready for birth soon."}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-pink-800 mb-2">What to Expect</h4>
                    <div className="text-sm text-pink-700">
                      {weeksPregnant < 12 && "Morning sickness, fatigue, and breast tenderness are common."}
                      {weeksPregnant >= 12 && weeksPregnant < 20 && "Energy levels improve. You may start showing."}
                      {weeksPregnant >= 20 && weeksPregnant < 28 && "You'll feel baby's movements. Back pain may begin."}
                      {weeksPregnant >= 28 && "Frequent urination, heartburn, and difficulty sleeping are common."}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h4>
          <p className="text-sm text-yellow-800">
            This calculator provides estimates based on your last menstrual period. Every pregnancy is unique. 
            Always consult with your healthcare provider for accurate dating and personalized medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PregnancyCalculator;