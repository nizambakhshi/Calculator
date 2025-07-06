import React, { useState, useEffect } from 'react';
import { Timer, Activity } from 'lucide-react';

const PaceCalculator: React.FC = () => {
  const [distance, setDistance] = useState('5');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [timeHours, setTimeHours] = useState('0');
  const [timeMinutes, setTimeMinutes] = useState('25');
  const [timeSeconds, setTimeSeconds] = useState('0');
  const [calculationType, setCalculationType] = useState('pace');
  const [targetPace, setTargetPace] = useState('5:00');
  
  const [pace, setPace] = useState('');
  const [speed, setSpeed] = useState('');
  const [splits, setSplits] = useState<any[]>([]);

  const calculatePace = () => {
    const dist = parseFloat(distance);
    const hours = parseInt(timeHours) || 0;
    const minutes = parseInt(timeMinutes) || 0;
    const seconds = parseInt(timeSeconds) || 0;
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMinutes = totalSeconds / 60;
    
    if (dist > 0 && totalSeconds > 0) {
      // Convert distance to kilometers for consistent calculation
      let distanceKm = dist;
      if (distanceUnit === 'miles') {
        distanceKm = dist * 1.60934;
      } else if (distanceUnit === 'meters') {
        distanceKm = dist / 1000;
      }
      
      // Calculate pace per kilometer
      const pacePerKm = totalMinutes / distanceKm;
      const paceMinutes = Math.floor(pacePerKm);
      const paceSeconds = Math.round((pacePerKm - paceMinutes) * 60);
      
      setPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`);
      
      // Calculate speed in km/h
      const speedKmh = distanceKm / (totalSeconds / 3600);
      setSpeed(speedKmh.toFixed(2));
      
      // Generate splits
      generateSplits(distanceKm, pacePerKm);
    }
  };

  const calculateTime = () => {
    const dist = parseFloat(distance);
    const [paceMin, paceSec] = targetPace.split(':').map(Number);
    const paceInMinutes = paceMin + (paceSec || 0) / 60;
    
    if (dist > 0 && paceInMinutes > 0) {
      let distanceKm = dist;
      if (distanceUnit === 'miles') {
        distanceKm = dist * 1.60934;
      } else if (distanceUnit === 'meters') {
        distanceKm = dist / 1000;
      }
      
      const totalMinutes = distanceKm * paceInMinutes;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);
      const seconds = Math.round((totalMinutes % 1) * 60);
      
      setTimeHours(hours.toString());
      setTimeMinutes(minutes.toString());
      setTimeSeconds(seconds.toString());
      
      generateSplits(distanceKm, paceInMinutes);
    }
  };

  const generateSplits = (distanceKm: number, pacePerKm: number) => {
    const splitData = [];
    const splitDistance = distanceUnit === 'miles' ? 1.60934 : 1; // 1 mile or 1 km
    
    for (let i = 1; i <= Math.ceil(distanceKm / splitDistance); i++) {
      const splitTime = i * pacePerKm * splitDistance;
      const hours = Math.floor(splitTime / 60);
      const minutes = Math.floor(splitTime % 60);
      const seconds = Math.round((splitTime % 1) * 60);
      
      splitData.push({
        split: i,
        time: `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(hours > 0 ? 2 : 1, '0')}:${seconds.toString().padStart(2, '0')}`
      });
    }
    
    setSplits(splitData);
  };

  useEffect(() => {
    if (calculationType === 'pace') {
      calculatePace();
    } else {
      calculateTime();
    }
  }, [distance, distanceUnit, timeHours, timeMinutes, timeSeconds, calculationType, targetPace]);

  const commonDistances = [
    { name: '5K', distance: '5', unit: 'km' },
    { name: '10K', distance: '10', unit: 'km' },
    { name: 'Half Marathon', distance: '21.1', unit: 'km' },
    { name: 'Marathon', distance: '42.2', unit: 'km' },
    { name: '1 Mile', distance: '1', unit: 'miles' },
    { name: '5 Miles', distance: '5', unit: 'miles' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Timer className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Pace Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Calculation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCalculationType('pace')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    calculationType === 'pace'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Calculate Pace
                </button>
                <button
                  onClick={() => setCalculationType('time')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    calculationType === 'time'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Calculate Time
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Distance</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Distance"
                />
                <select
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="km">Kilometers</option>
                  <option value="miles">Miles</option>
                  <option value="meters">Meters</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Common Distances</label>
              <div className="grid grid-cols-3 gap-2">
                {commonDistances.map((dist) => (
                  <button
                    key={dist.name}
                    onClick={() => {
                      setDistance(dist.distance);
                      setDistanceUnit(dist.unit);
                    }}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {dist.name}
                  </button>
                ))}
              </div>
            </div>

            {calculationType === 'pace' ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Hours</label>
                    <input
                      type="number"
                      min="0"
                      value={timeHours}
                      onChange={(e) => setTimeHours(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={timeMinutes}
                      onChange={(e) => setTimeMinutes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Seconds</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={timeSeconds}
                      onChange={(e) => setTimeSeconds(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Target Pace (per km)</label>
                <input
                  type="text"
                  value={targetPace}
                  onChange={(e) => setTargetPace(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="5:00"
                />
                <p className="text-sm text-gray-500">Format: MM:SS (e.g., 5:30)</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {calculationType === 'pace' ? (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Pace Results</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 mb-2">{pace}</div>
                    <div className="text-blue-700">per kilometer</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Speed:</span>
                    <span className="font-semibold text-blue-800">{speed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Distance:</span>
                    <span className="font-semibold text-blue-800">{distance} {distanceUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Time:</span>
                    <span className="font-semibold text-blue-800">
                      {timeHours !== '0' && `${timeHours}:`}{timeMinutes}:{timeSeconds.padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Time Results</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-900 mb-2">
                      {timeHours !== '0' && `${timeHours}:`}{timeMinutes}:{timeSeconds.padStart(2, '0')}
                    </div>
                    <div className="text-green-700">total time</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Target Pace:</span>
                    <span className="font-semibold text-green-800">{targetPace} per km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Distance:</span>
                    <span className="font-semibold text-green-800">{distance} {distanceUnit}</span>
                  </div>
                </div>
              </div>
            )}

            {splits.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Split Times</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {splits.map((split) => (
                    <div key={split.split} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {distanceUnit === 'miles' ? 'Mile' : 'Km'} {split.split}:
                      </span>
                      <span className="font-semibold text-gray-800">{split.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Training Zones</h4>
              <div className="text-sm text-purple-800 space-y-1">
                <div className="flex justify-between">
                  <span>Easy Run (60-70% effort):</span>
                  <span className="font-semibold">Add 1-2 min/km</span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo Run (80-85% effort):</span>
                  <span className="font-semibold">Race pace + 15-30 sec/km</span>
                </div>
                <div className="flex justify-between">
                  <span>Interval Training (90-95% effort):</span>
                  <span className="font-semibold">Race pace - 15-30 sec/km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaceCalculator;