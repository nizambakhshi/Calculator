import React, { useState, useEffect } from 'react';
import { Hammer, Calculator } from 'lucide-react';

const CarpentryCalculator: React.FC = () => {
  const [project, setProject] = useState('deck');
  const [length, setLength] = useState('12');
  const [width, setWidth] = useState('8');
  const [height, setHeight] = useState('8');
  const [spacing, setSpacing] = useState('16');
  const [unit, setUnit] = useState('feet');
  
  const [materials, setMaterials] = useState({
    lumber: 0,
    screws: 0,
    nails: 0,
    brackets: 0,
    cost: 0
  });

  const calculateMaterials = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const sp = parseFloat(spacing);

    if (l <= 0 || w <= 0) return;

    let lumber = 0;
    let screws = 0;
    let nails = 0;
    let brackets = 0;
    let cost = 0;

    switch (project) {
      case 'deck':
        // Deck calculations
        const deckArea = l * w;
        const joists = Math.ceil(w / (sp / 12)) + 1; // Number of joists
        const beams = Math.ceil(l / 8) * 2; // Support beams
        const posts = Math.ceil(l / 8) * Math.ceil(w / 8); // Support posts
        
        lumber = Math.ceil(
          (deckArea * 1.1) + // Decking boards (10% waste)
          (joists * l) + // Joist lumber
          (beams * w) + // Beam lumber
          (posts * 8) // Post lumber
        );
        screws = Math.ceil(deckArea * 24); // Deck screws
        brackets = joists + beams;
        cost = lumber * 8 + screws * 0.1 + brackets * 15;
        break;

      case 'fence':
        const fenceLength = l;
        const fenceHeight = h;
        const postSpacing = 8; // feet
        const numPosts = Math.ceil(fenceLength / postSpacing) + 1;
        const numPanels = numPosts - 1;
        
        lumber = Math.ceil(
          (numPosts * fenceHeight) + // Posts
          (numPanels * fenceHeight * 6) + // Pickets
          (numPanels * 3 * 2) // Rails (top and bottom)
        );
        nails = Math.ceil(numPanels * 50);
        brackets = numPanels * 4; // Rail brackets
        cost = lumber * 6 + nails * 0.05 + brackets * 8;
        break;

      case 'shed':
        const shedArea = l * w;
        const wallArea = 2 * (l + w) * h;
        const roofArea = l * w * 1.2; // 20% slope factor
        
        lumber = Math.ceil(
          (shedArea * 2) + // Floor joists and sheathing
          (wallArea * 0.8) + // Wall framing
          (roofArea * 1.5) // Roof framing and sheathing
        );
        screws = Math.ceil(shedArea * 32);
        nails = Math.ceil(wallArea * 16);
        brackets = Math.ceil((l + w) * 2);
        cost = lumber * 10 + screws * 0.12 + nails * 0.08 + brackets * 12;
        break;

      case 'stairs':
        const rise = h;
        const run = l;
        const steps = Math.ceil(rise / 7); // 7" rise per step
        const stringers = 3; // Number of stringers
        
        lumber = Math.ceil(
          (stringers * Math.sqrt(rise * rise + run * run)) + // Stringers
          (steps * w * 1.5) + // Treads
          (steps * w * 0.75) // Risers
        );
        screws = steps * 16;
        brackets = stringers * 2;
        cost = lumber * 12 + screws * 0.15 + brackets * 18;
        break;
    }

    setMaterials({
      lumber: Math.ceil(lumber),
      screws,
      nails,
      brackets,
      cost: Math.ceil(cost)
    });
  };

  useEffect(() => {
    calculateMaterials();
  }, [project, length, width, height, spacing, unit]);

  const projects = [
    { id: 'deck', name: 'Deck', icon: '🏗️' },
    { id: 'fence', name: 'Fence', icon: '🚧' },
    { id: 'shed', name: 'Shed', icon: '🏠' },
    { id: 'stairs', name: 'Stairs', icon: '🪜' },
  ];

  const getProjectInputs = () => {
    switch (project) {
      case 'deck':
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Length ({unit})</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Deck length"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Width ({unit})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Deck width"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Joist Spacing (inches)</label>
              <select
                value={spacing}
                onChange={(e) => setSpacing(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="12">12" O.C.</option>
                <option value="16">16" O.C.</option>
                <option value="24">24" O.C.</option>
              </select>
            </div>
          </>
        );
      case 'fence':
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fence Length ({unit})</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Total fence length"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fence Height ({unit})</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Fence height"
              />
            </div>
          </>
        );
      case 'shed':
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Length ({unit})</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Shed length"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Width ({unit})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Shed width"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Wall Height ({unit})</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Wall height"
              />
            </div>
          </>
        );
      case 'stairs':
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Total Run ({unit})</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Horizontal distance"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Total Rise ({unit})</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Vertical distance"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Stair Width ({unit})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Stair width"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Hammer className="h-8 w-8 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Carpentry Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Type</label>
              <div className="grid grid-cols-2 gap-2">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setProject(proj.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                      project === proj.id
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-lg">{proj.icon}</span>
                    <span className="font-medium">{proj.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="feet">Feet</option>
                <option value="meters">Meters</option>
              </select>
            </div>

            {getProjectInputs()}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">Material Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-orange-700">Lumber (board feet):</span>
                  <span className="font-bold text-orange-900">{materials.lumber}</span>
                </div>
                {materials.screws > 0 && (
                  <div className="flex justify-between">
                    <span className="text-orange-700">Screws:</span>
                    <span className="font-bold text-orange-900">{materials.screws}</span>
                  </div>
                )}
                {materials.nails > 0 && (
                  <div className="flex justify-between">
                    <span className="text-orange-700">Nails:</span>
                    <span className="font-bold text-orange-900">{materials.nails}</span>
                  </div>
                )}
                {materials.brackets > 0 && (
                  <div className="flex justify-between">
                    <span className="text-orange-700">Brackets/Hardware:</span>
                    <span className="font-bold text-orange-900">{materials.brackets}</span>
                  </div>
                )}
                <hr className="border-orange-200" />
                <div className="flex justify-between">
                  <span className="text-orange-700 font-semibold">Estimated Cost:</span>
                  <span className="text-xl font-bold text-orange-900">₹{materials.cost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Project Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Construction Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {project === 'deck' && (
                  <>
                    <li>• Use pressure-treated lumber for structural components</li>
                    <li>• Check local building codes for spacing requirements</li>
                    <li>• Allow for 10% waste in material calculations</li>
                    <li>• Consider drainage and ventilation</li>
                  </>
                )}
                {project === 'fence' && (
                  <>
                    <li>• Set posts in concrete for stability</li>
                    <li>• Check property lines before building</li>
                    <li>• Use galvanized hardware to prevent rust</li>
                    <li>• Consider wind load in your area</li>
                  </>
                )}
                {project === 'shed' && (
                  <>
                    <li>• Ensure proper foundation and drainage</li>
                    <li>• Check local permits and setback requirements</li>
                    <li>• Plan for adequate ventilation</li>
                    <li>• Use appropriate roofing materials</li>
                  </>
                )}
                {project === 'stairs' && (
                  <>
                    <li>• Follow building codes for rise and run</li>
                    <li>• Ensure consistent step dimensions</li>
                    <li>• Use proper handrail height (34-38 inches)</li>
                    <li>• Consider non-slip treads for safety</li>
                  </>
                )}
              </ul>
            </div>

            {/* Safety Notes */}
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Safety Reminders</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Always wear appropriate safety equipment</li>
                <li>• Check local building codes and permits</li>
                <li>• Use proper tools and techniques</li>
                <li>• Consider hiring professionals for complex projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarpentryCalculator;