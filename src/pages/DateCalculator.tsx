import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const DateCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [addDays, setAddDays] = useState('30');
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [tab, setTab] = useState('difference');

  const [difference, setDifference] = useState({
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
    totalDays: 0
  });

  const [addResult, setAddResult] = useState('');

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start && end) {
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      const years = Math.floor(daysDiff / 365);
      const months = Math.floor((daysDiff % 365) / 30);
      const weeks = Math.floor(daysDiff / 7);
      const days = daysDiff % 7;

      setDifference({
        days: days,
        weeks: weeks,
        months: months,
        years: years,
        totalDays: daysDiff
      });
    }
  };

  const calculateAddDays = () => {
    const base = new Date(baseDate);
    const daysToAdd = parseInt(addDays) || 0;
    
    if (base) {
      const result = new Date(base);
      result.setDate(result.getDate() + daysToAdd);
      setAddResult(result.toISOString().split('T')[0]);
    }
  };

  useEffect(() => {
    calculateDifference();
  }, [startDate, endDate]);

  useEffect(() => {
    calculateAddDays();
  }, [baseDate, addDays]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getWeekNumber = (dateString: string) => {
    const date = new Date(dateString);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const tabs = [
    { id: 'difference', name: 'Date Difference', icon: Calendar },
    { id: 'add', name: 'Add/Subtract Days', icon: Clock },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Calendar className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Date Calculator</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                tab === tabItem.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tabItem.icon className="h-4 w-4" />
              <span>{tabItem.name}</span>
            </button>
          ))}
        </div>

        {/* Date Difference Tab */}
        {tab === 'difference' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <p className="text-sm text-gray-500">{formatDate(startDate)}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <p className="text-sm text-gray-500">{formatDate(endDate)}</p>
              </div>
            </div>

            {/* Results */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Time Difference</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{difference.totalDays}</div>
                  <div className="text-sm text-gray-600">Total Days</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{Math.floor(difference.totalDays / 7)}</div>
                  <div className="text-sm text-gray-600">Total Weeks</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{Math.floor(difference.totalDays / 30)}</div>
                  <div className="text-sm text-gray-600">Total Months</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{Math.floor(difference.totalDays / 365)}</div>
                  <div className="text-sm text-gray-600">Total Years</div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Years:</span>
                  <span className="font-semibold">{difference.years}</span>
                </div>
                <div className="flex justify-between">
                  <span>Months:</span>
                  <span className="font-semibold">{difference.months}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weeks:</span>
                  <span className="font-semibold">{Math.floor(difference.totalDays / 7)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days:</span>
                  <span className="font-semibold">{difference.totalDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hours:</span>
                  <span className="font-semibold">{difference.totalDays * 24}</span>
                </div>
                <div className="flex justify-between">
                  <span>Minutes:</span>
                  <span className="font-semibold">{difference.totalDays * 24 * 60}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Subtract Days Tab */}
        {tab === 'add' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Base Date</label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <p className="text-sm text-gray-500">{formatDate(baseDate)}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Days to Add/Subtract</label>
                <input
                  type="number"
                  value={addDays}
                  onChange={(e) => setAddDays(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter number of days"
                />
                <p className="text-sm text-gray-500">Use negative numbers to subtract</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Result Date</label>
                <input
                  type="date"
                  value={addResult}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold text-blue-600"
                />
                {addResult && (
                  <p className="text-sm text-gray-500">{formatDate(addResult)}</p>
                )}
              </div>
            </div>

            {/* Result Details */}
            {addResult && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Result Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Date:</span>
                      <span className="font-semibold">{formatDate(baseDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Days Added:</span>
                      <span className="font-semibold">{addDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Result Date:</span>
                      <span className="font-semibold text-green-600">{formatDate(addResult)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Day of Week:</span>
                      <span className="font-semibold">{getDayOfWeek(addResult)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Week Number:</span>
                      <span className="font-semibold">{getWeekNumber(addResult)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quarter:</span>
                      <span className="font-semibold">Q{Math.ceil((new Date(addResult).getMonth() + 1) / 3)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: '+1 Day', value: 1 },
                  { label: '+1 Week', value: 7 },
                  { label: '+1 Month', value: 30 },
                  { label: '+1 Year', value: 365 },
                  { label: '-1 Day', value: -1 },
                  { label: '-1 Week', value: -7 },
                  { label: '-1 Month', value: -30 },
                  { label: '-1 Year', value: -365 },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setAddDays(action.value.toString())}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateCalculator;