import React, { useState, useEffect } from 'react';
import { Target, Trophy } from 'lucide-react';

const GolfCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState('handicap');
  const [scores, setScores] = useState<string[]>(['', '', '', '', '']);
  const [courseRatings, setCourseRatings] = useState<string[]>(['72', '72', '72', '72', '72']);
  const [slopeRatings, setSlopeRatings] = useState<string[]>(['113', '113', '113', '113', '113']);
  const [par, setPar] = useState('72');
  const [handicap, setHandicap] = useState('');
  
  const [handicapIndex, setHandicapIndex] = useState(0);
  const [courseHandicap, setCourseHandicap] = useState(0);
  const [netScore, setNetScore] = useState(0);
  const [strokesGiven, setStrokesGiven] = useState(0);

  const calculateHandicap = () => {
    const validScores = scores
      .map((score, index) => ({
        score: parseFloat(score),
        rating: parseFloat(courseRatings[index]),
        slope: parseFloat(slopeRatings[index])
      }))
      .filter(s => !isNaN(s.score) && !isNaN(s.rating) && !isNaN(s.slope));

    if (validScores.length >= 3) {
      // Calculate differentials
      const differentials = validScores.map(s => 
        (s.score - s.rating) * 113 / s.slope
      );

      // Sort and take best differentials
      differentials.sort((a, b) => a - b);
      const numToUse = Math.min(differentials.length, 
        differentials.length >= 20 ? 10 :
        differentials.length >= 10 ? 5 :
        differentials.length >= 5 ? 3 : 1
      );

      const avgDifferential = differentials
        .slice(0, numToUse)
        .reduce((sum, diff) => sum + diff, 0) / numToUse;

      setHandicapIndex(avgDifferential * 0.96); // 96% factor
    }
  };

  const calculateCourseHandicap = () => {
    const hcp = parseFloat(handicap);
    const slope = parseFloat(slopeRatings[0]);
    
    if (!isNaN(hcp) && !isNaN(slope)) {
      const courseHcp = Math.round(hcp * slope / 113);
      setCourseHandicap(courseHcp);
      setStrokesGiven(courseHcp);
    }
  };

  const calculateNetScore = () => {
    const grossScore = parseFloat(scores[0]);
    const strokes = parseFloat(handicap);
    
    if (!isNaN(grossScore) && !isNaN(strokes)) {
      setNetScore(grossScore - strokes);
    }
  };

  useEffect(() => {
    if (calculationType === 'handicap') {
      calculateHandicap();
    } else if (calculationType === 'course') {
      calculateCourseHandicap();
    } else {
      calculateNetScore();
    }
  }, [scores, courseRatings, slopeRatings, handicap, calculationType]);

  const handicapCategories = [
    { range: '0-5', category: 'Scratch/Low Handicap', description: 'Excellent golfer' },
    { range: '6-12', category: 'Mid Handicap', description: 'Good golfer' },
    { range: '13-20', category: 'High Handicap', description: 'Average golfer' },
    { range: '21-36', category: 'Beginner', description: 'Learning golfer' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Target className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Golf Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Calculator Type</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setCalculationType('handicap')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    calculationType === 'handicap'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Handicap Index
                </button>
                <button
                  onClick={() => setCalculationType('course')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    calculationType === 'course'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Course Handicap
                </button>
                <button
                  onClick={() => setCalculationType('net')}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    calculationType === 'net'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Net Score
                </button>
              </div>
            </div>

            {calculationType === 'handicap' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Recent Scores (minimum 3)</h3>
                {scores.map((score, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Score {index + 1}</label>
                      <input
                        type="number"
                        value={score}
                        onChange={(e) => {
                          const newScores = [...scores];
                          newScores[index] = e.target.value;
                          setScores(newScores);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Score"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Course Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        value={courseRatings[index]}
                        onChange={(e) => {
                          const newRatings = [...courseRatings];
                          newRatings[index] = e.target.value;
                          setCourseRatings(newRatings);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Rating"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Slope Rating</label>
                      <input
                        type="number"
                        value={slopeRatings[index]}
                        onChange={(e) => {
                          const newSlopes = [...slopeRatings];
                          newSlopes[index] = e.target.value;
                          setSlopeRatings(newSlopes);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Slope"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {calculationType === 'course' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Handicap Index</label>
                  <input
                    type="number"
                    step="0.1"
                    value={handicap}
                    onChange={(e) => setHandicap(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter handicap index"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Course Slope Rating</label>
                  <input
                    type="number"
                    value={slopeRatings[0]}
                    onChange={(e) => {
                      const newSlopes = [...slopeRatings];
                      newSlopes[0] = e.target.value;
                      setSlopeRatings(newSlopes);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Slope rating"
                  />
                </div>
              </div>
            )}

            {calculationType === 'net' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Gross Score</label>
                  <input
                    type="number"
                    value={scores[0]}
                    onChange={(e) => {
                      const newScores = [...scores];
                      newScores[0] = e.target.value;
                      setScores(newScores);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter gross score"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Course Handicap</label>
                  <input
                    type="number"
                    value={handicap}
                    onChange={(e) => setHandicap(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Enter course handicap"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Course Par</label>
                  <input
                    type="number"
                    value={par}
                    onChange={(e) => setPar(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="Course par"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {calculationType === 'handicap' && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Handicap Index</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-900 mb-2">
                    {handicapIndex.toFixed(1)}
                  </div>
                  <div className="text-green-700">handicap index</div>
                </div>
              </div>
            )}

            {calculationType === 'course' && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Course Handicap</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 mb-2">
                      {courseHandicap}
                    </div>
                    <div className="text-blue-700">strokes given</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Handicap Index:</span>
                    <span className="font-semibold text-blue-800">{handicap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Slope Rating:</span>
                    <span className="font-semibold text-blue-800">{slopeRatings[0]}</span>
                  </div>
                </div>
              </div>
            )}

            {calculationType === 'net' && (
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Net Score</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-900 mb-2">
                      {netScore}
                    </div>
                    <div className="text-purple-700">net score</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Gross Score:</span>
                    <span className="font-semibold text-purple-800">{scores[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Handicap Strokes:</span>
                    <span className="font-semibold text-purple-800">{handicap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Relative to Par:</span>
                    <span className="font-semibold text-purple-800">
                      {netScore - parseInt(par) > 0 ? '+' : ''}{netScore - parseInt(par)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Handicap Categories</h3>
              <div className="space-y-2">
                {handicapCategories.map((cat, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium text-gray-800">{cat.category}</div>
                      <div className="text-gray-600">{cat.description}</div>
                    </div>
                    <div className="font-semibold text-gray-900">{cat.range}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Golf Scoring Terms</h4>
              <div className="text-sm text-yellow-800 space-y-1">
                <div className="flex justify-between">
                  <span>Eagle:</span>
                  <span>2 under par</span>
                </div>
                <div className="flex justify-between">
                  <span>Birdie:</span>
                  <span>1 under par</span>
                </div>
                <div className="flex justify-between">
                  <span>Par:</span>
                  <span>Even with par</span>
                </div>
                <div className="flex justify-between">
                  <span>Bogey:</span>
                  <span>1 over par</span>
                </div>
                <div className="flex justify-between">
                  <span>Double Bogey:</span>
                  <span>2 over par</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GolfCalculator;