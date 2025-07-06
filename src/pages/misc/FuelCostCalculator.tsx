import React, { useState, useEffect } from 'react';
import { Fuel, Car } from 'lucide-react';

const FuelCostCalculator: React.FC = () => {
  const [distance, setDistance] = useState('100');
  const [fuelEfficiency, setFuelEfficiency] = useState('15');
  const [fuelPrice, setFuelPrice] = useState('100');
  const [calculationType, setCalculationType] = useState('trip');
  const [vehicleType, setVehicleType] = useState('car');
  
  const [fuelNeeded, setFuelNeeded] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [costPerKm, setCostPerKm] = useState(0);

  const calculateFuelCost = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);

    if (dist > 0 && efficiency > 0 && price > 0) {
      const fuel = dist / efficiency;
      const cost = fuel * price;
      const costKm = cost / dist;

      setFuelNeeded(fuel);
      setTotalCost(cost);
      setCostPerKm(costKm);
    }
  };

  useEffect(() => {
    calculateFuelCost();
  }, [distance, fuelEfficiency, fuelPrice]);

  const vehicleTypes = {
    car: { name: 'Car', efficiency: 15, icon: '🚗' },
    suv: { name: 'SUV', efficiency: 12, icon: '🚙' },
    motorcycle: { name: 'Motorcycle', efficiency: 40, icon: '🏍️' },
    truck: { name: 'Truck', efficiency: 8, icon: '🚛' },
    bus: { name: 'Bus', efficiency: 6, icon: '🚌' },
  };

  const fuelTypes = [
    { name: 'Petrol', price: 100, unit: '₹/L' },
    { name: 'Diesel', price: 90, unit: '₹/L' },
    { name: 'CNG', price: 70, unit: '₹/kg' },
    { name: 'Electric', price: 8, unit: '₹/kWh' },
  ];

  const commonTrips = [
    { name: 'City commute', distance: 20 },
    { name: 'Weekend trip', distance: 150 },
    { name: 'Long drive', distance: 500 },
    { name: 'Cross country', distance: 1000 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Fuel className="h-8 w-8 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Fuel Cost Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(vehicleTypes).map(([key, vehicle]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setVehicleType(key);
                      setFuelEfficiency(vehicle.efficiency.toString());
                    }}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                      vehicleType === key
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-lg">{vehicle.icon}</span>
                    <span className="font-medium text-sm">{vehicle.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                placeholder="Enter distance"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Common Trips</label>
              <div className="grid grid-cols-2 gap-2">
                {commonTrips.map((trip) => (
                  <button
                    key={trip.name}
                    onClick={() => setDistance(trip.distance.toString())}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {trip.name} ({trip.distance}km)
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fuel Efficiency (km/L)</label>
              <input
                type="number"
                step="0.1"
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                placeholder="Enter fuel efficiency"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fuel Price (₹/L)</label>
              <input
                type="number"
                step="0.1"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                placeholder="Enter fuel price"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fuel Type Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {fuelTypes.map((fuel) => (
                  <button
                    key={fuel.name}
                    onClick={() => setFuelPrice(fuel.price.toString())}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {fuel.name} (₹{fuel.price})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">Fuel Cost Calculation</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-900 mb-2">
                    ₹{totalCost.toFixed(2)}
                  </div>
                  <div className="text-orange-700">total fuel cost</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-700">Fuel Needed:</span>
                  <span className="font-semibold text-orange-800">{fuelNeeded.toFixed(2)} L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-700">Cost per km:</span>
                  <span className="font-semibold text-orange-800">₹{costPerKm.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Trip Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-700">Distance:</span>
                  <span className="font-semibold">{distance} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Vehicle:</span>
                  <span className="font-semibold">{vehicleTypes[vehicleType as keyof typeof vehicleTypes].name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Fuel Efficiency:</span>
                  <span className="font-semibold">{fuelEfficiency} km/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Fuel Price:</span>
                  <span className="font-semibold">₹{fuelPrice}/L</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Cost Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">One-way cost:</span>
                  <span className="font-semibold">₹{totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Round trip cost:</span>
                  <span className="font-semibold">₹{(totalCost * 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Monthly (30 trips):</span>
                  <span className="font-semibold">₹{(totalCost * 30).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Annual (365 trips):</span>
                  <span className="font-semibold">₹{(totalCost * 365).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Fuel Efficiency Tips</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Maintain steady speed (50-80 km/h optimal)</li>
                <li>• Keep tires properly inflated</li>
                <li>• Remove excess weight from vehicle</li>
                <li>• Regular engine maintenance</li>
                <li>• Use air conditioning wisely</li>
                <li>• Plan routes to avoid traffic</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Cost Comparison</h4>
              <div className="text-sm text-yellow-800 space-y-1">
                <div className="flex justify-between">
                  <span>vs Public transport:</span>
                  <span>₹{Math.max(0, totalCost - (parseFloat(distance) * 2)).toFixed(2)} {totalCost > parseFloat(distance) * 2 ? 'more' : 'less'}</span>
                </div>
                <div className="flex justify-between">
                  <span>vs Taxi (₹15/km):</span>
                  <span>₹{Math.max(0, totalCost - (parseFloat(distance) * 15)).toFixed(2)} {totalCost > parseFloat(distance) * 15 ? 'more' : 'less'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelCostCalculator;