import React, { useState, useEffect } from 'react';
import { Shield, Copy, RefreshCw, Eye, EyeOff } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    
    if (charset === '') {
      setPassword('');
      return;
    }
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
    calculateStrength(result);
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    
    // Length
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    
    // Character types
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    
    // Complexity
    if (pwd.length >= 10 && /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      score += 1;
    }
    
    setStrength(Math.min(score, 5));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password');
    }
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  const getStrengthText = () => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-red-600 bg-red-50' };
      case 2: return { text: 'Weak', color: 'text-orange-600 bg-orange-50' };
      case 3: return { text: 'Fair', color: 'text-yellow-600 bg-yellow-50' };
      case 4: return { text: 'Good', color: 'text-blue-600 bg-blue-50' };
      case 5: return { text: 'Strong', color: 'text-green-600 bg-green-50' };
      default: return { text: 'Unknown', color: 'text-gray-600 bg-gray-50' };
    }
  };

  const strengthInfo = getStrengthText();

  const passwordPresets = [
    { name: 'Basic (8 chars)', length: 8, upper: true, lower: true, numbers: true, symbols: false },
    { name: 'Standard (12 chars)', length: 12, upper: true, lower: true, numbers: true, symbols: true },
    { name: 'Strong (16 chars)', length: 16, upper: true, lower: true, numbers: true, symbols: true },
    { name: 'Ultra (24 chars)', length: 24, upper: true, lower: true, numbers: true, symbols: true },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Shield className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Password Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password Length: {length}</label>
              <input
                type="range"
                min="4"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>4</span>
                <span>50</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Character Types</h3>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Uppercase Letters (A-Z)</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Lowercase Letters (a-z)</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Numbers (0-9)</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Symbols (!@#$%^&*)</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={excludeSimilar}
                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Quick Presets</label>
              <div className="grid grid-cols-1 gap-2">
                {passwordPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setLength(preset.length);
                      setIncludeUppercase(preset.upper);
                      setIncludeLowercase(preset.lower);
                      setIncludeNumbers(preset.numbers);
                      setIncludeSymbols(preset.symbols);
                    }}
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm text-left"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generated Password</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={generatePassword}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white font-mono text-lg pr-12"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              
              {copied && (
                <div className="text-green-600 text-sm mt-2">Password copied to clipboard!</div>
              )}
            </div>

            <div className={`rounded-lg p-6 ${strengthInfo.color}`}>
              <h3 className="text-lg font-semibold mb-4">Password Strength</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Strength:</span>
                  <span className="font-bold">{strengthInfo.text}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      strength <= 1 ? 'bg-red-500' :
                      strength === 2 ? 'bg-orange-500' :
                      strength === 3 ? 'bg-yellow-500' :
                      strength === 4 ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm">
                  Score: {strength}/5
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Password Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use at least 12 characters for good security</li>
                <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
                <li>• Avoid using personal information</li>
                <li>• Don't reuse passwords across multiple accounts</li>
                <li>• Consider using a password manager</li>
                <li>• Enable two-factor authentication when available</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Security Guidelines</h4>
              <div className="text-sm text-yellow-800 space-y-1">
                <div>• <strong>Weak:</strong> Less than 8 characters</div>
                <div>• <strong>Fair:</strong> 8-11 characters with mixed types</div>
                <div>• <strong>Good:</strong> 12-15 characters with all types</div>
                <div>• <strong>Strong:</strong> 16+ characters with all types</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;