import React, { useState, useEffect } from 'react';
import { Bike, Wind } from 'lucide-react';

const BikeSpeedCalculator: React.FC = () => {
  const [distance, setDistance] = useState('50');
  const [time, setTime] = useState('2');
  const [timeUnit, setTimeUnit] = useState('hours');
  const [calculationType, setCalculationType] = useState('speed');
  const [targetSpeed, setTargetSpeed] = useState('25');
  const [windSpeed, setWindSpeed] = useState('0');
  const [windDirection, setWindDirection] = useState('none');
  const [terrain, setTerrain] = useState('flat');
  
  const [speed, setSpeed] = useState(0);
  const [pace, setPace] = useState('');
  const [calories, setCalories] = useState(0);
  const [adjustedSpeed, setAdjustedSpeed] = useState(0);

  const calculateSpeed = () => {
    const dist = parseFloat(distance);
    const timeValue = parseFloat(time);
    
    if (dist > 0 && timeValue > 0) {
      let timeInHours = timeValue;
      if (timeUnit === 'minutes') {
        timeInHours = timeValue / 60;
      }
      
      const speedKmh = dist / timeInHours;
      setSpeed(speedKmh);
      
      // Calculate pace (minutes per km)
      const paceMinutes = 60 / speedKmh;
      const minutes = Math.floor(paceMinutes);
      const seconds = Math.round((paceMinutes - minutes) * 60);
      setPace(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      
      // Calculate calories (rough estimate: 25-50 calories per km depending on speed)
      const caloriesPerKm = speedKmh > 20 ? 50 : speedKmh > 15 ? 40 : 30;
      setCalories(Math.round(dist * caloriesPerKm));
      
      // Adjust for wind and terrain
      calculateAdjustedSpeed(speedKmh);
    }
  };

  const calculateTime = () => {
    const dist = parseFloat(distance);
    const targetSpeedValue = parseFloat(targetSpeed);
    
    if (dist > 0 && targetSpeedValue > 0) {
      const timeInHours = dist / targetSpeedValue;
      
      if (timeUnit === 'hours') {
        setTime(timeInHours.toFixed(2));
      } else {
        setTime((timeInHours * 60).toFixed(0));
      }
    }
  };

  const calculateAdjustedSpeed = (baseSpeed: number) => {
    let adjusted = baseSpeed;
    const windSpeedValue = parseFloat(windSpeed);
    
    // Wind adjustments
    if (windDirection === 'headwind') {
      adjusted = baseSpeed - (windSpeedValue * 0.5); // Rough approximation
    } else if (windDirection === 'tailwind') {
      adjusted = baseSpeed + (windSpeedValue * 0.3);
    } else if (windDirection === 'crosswind') {
      adjusted = baseSpeed - (windSpeedValue * 0.2);
    }
    
    // Terrain adjustments
    switch (terrain) {
      case 'uphill':
        adjusted *= 0.7;
        break;
      case 'downhill':
        adjusted *= 1.3;
        break;
      case 'mixed':
        adjusted *= 0.9;
        break;
    }
    
    setAdjustedSpeed(Math.max(0, adjusted));
  };

  useEffect(() => {
    if (calculationType === 'speed') {
      calculateSpeed();
    } else {
      calculateTime();
    }
  }, [distance, time, timeUnit, calculationType, targetSpeed, windSpeed, windDirection, terrain]);

  const speedCategories = [
    { category: 'Recreational', speed: '15-20 km/h', description: 'Casual riding' },
    { category: 'Fitness', speed: '20-25 km/h', description: 'Regular training' },
    { category: 'Sport', speed: '25-30 km/h', description: 'Competitive amateur' },
    { category: 'Racing', speed: '30-40 km/h', description: 'Competitive racing' },
    { category: 'Professional', speed: '40+ km/h', description: 'Elite level' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Bike className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Bike Speed Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Calculation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCalculationType('speed')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    calculationType === 'speed'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Calculate Speed
                </button>
                <button
                  onClick={() => setCalculationType('time')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    calculationType === 'time'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Calculate Time
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
              <input
                type="number"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Enter distance"
              />
            </div>

            {calculationType === 'speed' ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    step="0.1"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Time"
                  />
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Target Speed (km/h)</label>
                <input
                  type="number"
                  step="0.1"
                  value={targetSpeed}
                  onChange={(e) => setTargetSpeed(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Enter target speed"
                />
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Environmental Factors</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Wind Speed (km/h)</label>
                  <input
                    type="number"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Wind speed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Wind Direction</label>
                  <select
                    value={windDirection}
                    onChange={(e) => setWindDirection(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="none">No Wind</option>
                    <option value="headwind">Headwind</option>
                    <option value="tailwind">Tailwind</option>
                    <option value="crosswind">Crosswind</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Terrain</label>
                  <select
                    value={terrain}
                    onChange={(e) => setTerrain(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="flat">Flat</option>
                    <option value="uphill">Uphill</option>
                    <option value="downhill">Downhill</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Speed Results</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-900 mb-2">
                    {speed.toFixed(1)} km/h
                  </div>
                  <div className="text-green-700">average speed</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Pace:</span>
                  <span className="font-semibold text-green-800">{pace} min/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Calories Burned:</span>
                  <span className="font-semibold text-green-800">{calories} cal</span>
                </div>
                {(windSpeed !== '0' || terrain !== 'flat') && (
                  <div className="flex justify-between">
                    <span className="text-green-700">Adjusted Speed:</span>
                    <span className="font-semibold text-green-800">{adjustedSpeed.toFixed(1)} km/h</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Speed Categories</h3>
              <div className="space-y-2">
                {speedCategories.map((cat, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium text-blue-800">{cat.category}</div>
                      <div className="text-blue-600">{cat.description}</div>
                    </div>
                    <div className="font-semibold text-blue-900">{cat.speed}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Performance Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">Distance:</span>
                  <span className="font-semibold">{distance} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Time:</span>
                  <span className="font-semibold">{time} {timeUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Speed in mph:</span>
                  <span className="font-semibold">{(speed * 0.621371).toFixed(1)} mph</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Speed in m/s:</span>
                  <span className="font-semibold">{(speed / 3.6).toFixed(1)} m/s</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Cycling Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Maintain steady cadence (80-100 RPM)</li>
                <li>• Use proper gear ratios for terrain</li>
                <li>• Stay hydrated and fuel properly</li>
                <li>• Check tire pressure regularly</li>
                <li>• Consider aerodynamic position for speed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeSpeedCalculator;