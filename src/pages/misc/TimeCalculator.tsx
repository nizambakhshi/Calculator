import React, { useState, useEffect } from 'react';
import { Clock, Plus, Minus } from 'lucide-react';

const TimeCalculator: React.FC = () => {
  const [operation, setOperation] = useState('add');
  const [time1Hours, setTime1Hours] = useState('2');
  const [time1Minutes, setTime1Minutes] = useState('30');
  const [time1Seconds, setTime1Seconds] = useState('0');
  const [time2Hours, setTime2Hours] = useState('1');
  const [time2Minutes, setTime2Minutes] = useState('45');
  const [time2Seconds, setTime2Seconds] = useState('30');
  
  const [result, setResult] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [totalSeconds, setTotalSeconds] = useState(0);

  const calculateTime = () => {
    const t1Total = parseInt(time1Hours) * 3600 + parseInt(time1Minutes) * 60 + parseInt(time1Seconds);
    const t2Total = parseInt(time2Hours) * 3600 + parseInt(time2Minutes) * 60 + parseInt(time2Seconds);
    
    let resultTotal = 0;
    
    if (operation === 'add') {
      resultTotal = t1Total + t2Total;
    } else {
      resultTotal = Math.abs(t1Total - t2Total);
    }
    
    const hours = Math.floor(resultTotal / 3600);
    const minutes = Math.floor((resultTotal % 3600) / 60);
    const seconds = resultTotal % 60;
    
    setResult({ hours, minutes, seconds });
    setTotalSeconds(resultTotal);
  };

  useEffect(() => {
    calculateTime();
  }, [operation, time1Hours, time1Minutes, time1Seconds, time2Hours, time2Minutes, time2Seconds]);

  const formatTime = (h: number, m: number, s: number) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const convertToUnits = (totalSec: number) => {
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor(totalSec / 3600),
      minutes: Math.floor(totalSec / 60),
      seconds: totalSec
    };
  };

  const units = convertToUnits(totalSeconds);

  const timePresets = [
    { name: '8 Hours', hours: 8, minutes: 0, seconds: 0 },
    { name: '1 Hour', hours: 1, minutes: 0, seconds: 0 },
    { name: '30 Minutes', hours: 0, minutes: 30, seconds: 0 },
    { name: '15 Minutes', hours: 0, minutes: 15, seconds: 0 },
    { name: '5 Minutes', hours: 0, minutes: 5, seconds: 0 },
    { name: '1 Minute', hours: 0, minutes: 1, seconds: 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Clock className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Time Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Operation</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOperation('add')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                    operation === 'add'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Time</span>
                </button>
                <button
                  onClick={() => setOperation('subtract')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                    operation === 'subtract'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Minus className="h-4 w-4" />
                  <span>Subtract Time</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First Time</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hours</label>
                    <input
                      type="number"
                      min="0"
                      value={time1Hours}
                      onChange={(e) => setTime1Hours(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={time1Minutes}
                      onChange={(e) => setTime1Minutes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Seconds</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={time1Seconds}
                      onChange={(e) => setTime1Seconds(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="text-center text-lg font-mono text-gray-700">
                  {formatTime(parseInt(time1Hours) || 0, parseInt(time1Minutes) || 0, parseInt(time1Seconds) || 0)}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Second Time</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hours</label>
                    <input
                      type="number"
                      min="0"
                      value={time2Hours}
                      onChange={(e) => setTime2Hours(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={time2Minutes}
                      onChange={(e) => setTime2Minutes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Seconds</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={time2Seconds}
                      onChange={(e) => setTime2Seconds(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="text-center text-lg font-mono text-gray-700">
                  {formatTime(parseInt(time2Hours) || 0, parseInt(time2Minutes) || 0, parseInt(time2Seconds) || 0)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Quick Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {timePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setTime2Hours(preset.hours.toString());
                      setTime2Minutes(preset.minutes.toString());
                      setTime2Seconds(preset.seconds.toString());
                    }}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Result</h3>
              <div className="text-center">
                <div className="text-4xl font-bold font-mono text-blue-900 mb-2">
                  {formatTime(result.hours, result.minutes, result.seconds)}
                </div>
                <div className="text-blue-700">
                  {operation === 'add' ? 'Total Time' : 'Time Difference'}
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Time Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">Days:</span>
                  <span className="font-semibold text-green-800">{units.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Hours:</span>
                  <span className="font-semibold text-green-800">{units.hours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Minutes:</span>
                  <span className="font-semibold text-green-800">{units.minutes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Seconds:</span>
                  <span className="font-semibold text-green-800">{units.seconds.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Time Formats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">24-hour format:</span>
                  <span className="font-semibold font-mono text-purple-800">
                    {formatTime(result.hours, result.minutes, result.seconds)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Decimal hours:</span>
                  <span className="font-semibold text-purple-800">
                    {(totalSeconds / 3600).toFixed(2)} hours
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Decimal minutes:</span>
                  <span className="font-semibold text-purple-800">
                    {(totalSeconds / 60).toFixed(2)} minutes
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Common Time Calculations</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Work hours: 8 hours = 480 minutes</li>
                <li>• Half day: 4 hours = 240 minutes</li>
                <li>• Lunch break: 1 hour = 60 minutes</li>
                <li>• Coffee break: 15 minutes = 900 seconds</li>
                <li>• Meeting: 30 minutes = 1800 seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeCalculator;