import React, { useState, useEffect } from 'react';
import { Grid3X3, Calculator } from 'lucide-react';

const TileCalculator: React.FC = () => {
  const [roomLength, setRoomLength] = useState('12');
  const [roomWidth, setRoomWidth] = useState('10');
  const [tileLength, setTileLength] = useState('12');
  const [tileWidth, setTileWidth] = useState('12');
  const [unit, setUnit] = useState('feet');
  const [tileUnit, setTileUnit] = useState('inches');
  const [wastePercentage, setWastePercentage] = useState('10');
  const [groutWidth, setGroutWidth] = useState('3');
  
  const [results, setResults] = useState({
    roomArea: 0,
    tileArea: 0,
    tilesNeeded: 0,
    tilesWithWaste: 0,
    groutBags: 0,
    adhesiveBags: 0,
    totalCost: 0
  });

  const [costs, setCosts] = useState({
    tilePrice: '50',
    groutPrice: '200',
    adhesivePrice: '300'
  });

  const calculateTiles = () => {
    const rLength = parseFloat(roomLength);
    const rWidth = parseFloat(roomWidth);
    const tLength = parseFloat(tileLength);
    const tWidth = parseFloat(tileWidth);
    const waste = parseFloat(wastePercentage) / 100;
    const grout = parseFloat(groutWidth);

    if (rLength <= 0 || rWidth <= 0 || tLength <= 0 || tWidth <= 0) return;

    // Convert room dimensions to square feet
    let roomAreaSqFt = rLength * rWidth;
    if (unit === 'meters') {
      roomAreaSqFt = roomAreaSqFt * 10.764; // Convert sq meters to sq feet
    }

    // Convert tile dimensions to square feet
    let tileAreaSqFt = (tLength * tWidth) / 144; // Convert sq inches to sq feet
    if (tileUnit === 'cm') {
      tileAreaSqFt = (tLength * tWidth) / 929; // Convert sq cm to sq feet
    } else if (tileUnit === 'feet') {
      tileAreaSqFt = tLength * tWidth;
    }

    // Calculate tiles needed
    const tilesNeeded = Math.ceil(roomAreaSqFt / tileAreaSqFt);
    const tilesWithWaste = Math.ceil(tilesNeeded * (1 + waste));

    // Calculate grout bags (1 bag covers ~100 sq ft with 3mm joints)
    const groutCoverage = 100 * (3 / grout); // Adjust for grout width
    const groutBags = Math.ceil(roomAreaSqFt / groutCoverage);

    // Calculate adhesive bags (1 bag covers ~20-25 sq ft)
    const adhesiveBags = Math.ceil(roomAreaSqFt / 22);

    // Calculate costs
    const tileCost = tilesWithWaste * parseFloat(costs.tilePrice);
    const groutCost = groutBags * parseFloat(costs.groutPrice);
    const adhesiveCost = adhesiveBags * parseFloat(costs.adhesivePrice);
    const totalCost = tileCost + groutCost + adhesiveCost;

    setResults({
      roomArea: roomAreaSqFt,
      tileArea: tileAreaSqFt,
      tilesNeeded,
      tilesWithWaste,
      groutBags,
      adhesiveBags,
      totalCost
    });
  };

  useEffect(() => {
    calculateTiles();
  }, [roomLength, roomWidth, tileLength, tileWidth, unit, tileUnit, wastePercentage, groutWidth, costs]);

  const tileSizes = [
    { size: '12x12', length: '12', width: '12', unit: 'inches' },
    { size: '18x18', length: '18', width: '18', unit: 'inches' },
    { size: '24x24', length: '24', width: '24', unit: 'inches' },
    { size: '30x30', length: '30', width: '30', unit: 'cm' },
    { size: '60x60', length: '60', width: '60', unit: 'cm' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Grid3X3 className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Tile Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Room Dimensions</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="feet">Feet</option>
                    <option value="meters">Meters</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Length ({unit})</label>
                    <input
                      type="number"
                      value={roomLength}
                      onChange={(e) => setRoomLength(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Room length"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Width ({unit})</label>
                    <input
                      type="number"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Room width"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Tile Specifications</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Common Tile Sizes</label>
                  <div className="grid grid-cols-3 gap-2">
                    {tileSizes.map((tile) => (
                      <button
                        key={tile.size}
                        onClick={() => {
                          setTileLength(tile.length);
                          setTileWidth(tile.width);
                          setTileUnit(tile.unit);
                        }}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
                      >
                        {tile.size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tile Unit</label>
                  <select
                    value={tileUnit}
                    onChange={(e) => setTileUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="inches">Inches</option>
                    <option value="cm">Centimeters</option>
                    <option value="feet">Feet</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tile Length ({tileUnit})</label>
                    <input
                      type="number"
                      value={tileLength}
                      onChange={(e) => setTileLength(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tile length"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tile Width ({tileUnit})</label>
                    <input
                      type="number"
                      value={tileWidth}
                      onChange={(e) => setTileWidth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tile width"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Waste Percentage (%)</label>
                    <select
                      value={wastePercentage}
                      onChange={(e) => setWastePercentage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="5">5% (Straight lay)</option>
                      <option value="10">10% (Standard)</option>
                      <option value="15">15% (Diagonal)</option>
                      <option value="20">20% (Complex pattern)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Grout Width (mm)</label>
                    <select
                      value={groutWidth}
                      onChange={(e) => setGroutWidth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="1">1mm</option>
                      <option value="2">2mm</option>
                      <option value="3">3mm</option>
                      <option value="4">4mm</option>
                      <option value="5">5mm</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Material Costs (₹)</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Price per Tile</label>
                  <input
                    type="number"
                    value={costs.tilePrice}
                    onChange={(e) => setCosts({...costs, tilePrice: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Price per tile"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Grout per Bag</label>
                  <input
                    type="number"
                    value={costs.groutPrice}
                    onChange={(e) => setCosts({...costs, groutPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Grout price per bag"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Adhesive per Bag</label>
                  <input
                    type="number"
                    value={costs.adhesivePrice}
                    onChange={(e) => setCosts({...costs, adhesivePrice: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Adhesive price per bag"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Tile Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Room Area:</span>
                  <span className="font-bold text-blue-900">{results.roomArea.toFixed(1)} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Tiles Needed:</span>
                  <span className="font-bold text-blue-900">{results.tilesNeeded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Tiles with Waste:</span>
                  <span className="font-bold text-blue-900">{results.tilesWithWaste}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Grout Bags:</span>
                  <span className="font-bold text-blue-900">{results.groutBags}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Adhesive Bags:</span>
                  <span className="font-bold text-blue-900">{results.adhesiveBags}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Cost Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Tiles Cost:</span>
                  <span className="font-semibold">₹{(results.tilesWithWaste * parseFloat(costs.tilePrice)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Grout Cost:</span>
                  <span className="font-semibold">₹{(results.groutBags * parseFloat(costs.groutPrice)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Adhesive Cost:</span>
                  <span className="font-semibold">₹{(results.adhesiveBags * parseFloat(costs.adhesivePrice)).toLocaleString()}</span>
                </div>
                <hr className="border-green-200" />
                <div className="flex justify-between">
                  <span className="text-green-700 font-semibold">Total Material Cost:</span>
                  <span className="text-xl font-bold text-green-900">₹{results.totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">Installation Tips</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Start tiling from the center of the room</li>
                <li>• Use tile spacers for consistent gaps</li>
                <li>• Check tiles for defects before installation</li>
                <li>• Allow adhesive to cure before grouting</li>
                <li>• Clean excess grout immediately</li>
                <li>• Seal grout lines after curing</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Tools Needed</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-purple-800">
                <div>• Tile cutter</div>
                <div>• Trowel</div>
                <div>• Level</div>
                <div>• Spacers</div>
                <div>• Rubber float</div>
                <div>• Sponge</div>
                <div>• Measuring tape</div>
                <div>• Chalk line</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileCalculator;