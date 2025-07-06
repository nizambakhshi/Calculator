import React, { useState, useEffect } from 'react';
import { Calendar, Cake } from 'lucide-react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [calculationType, setCalculationType] = useState('current');
  
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
    totalWeeks: 0,
    totalMonths: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0
  });

  const [nextBirthday, setNextBirthday] = useState({
    date: '',
    daysUntil: 0,
    dayOfWeek: '',
    age: 0
  });

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (birth > target) {
      // Reset all values if birth date is after target date
      setAge({
        years: 0, months: 0, days: 0, totalDays: 0, totalWeeks: 0,
        totalMonths: 0, totalHours: 0, totalMinutes: 0, totalSeconds: 0
      });
      return;
    }

    // Calculate exact age
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate totals
    const timeDiff = target.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    const totalSeconds = Math.floor(timeDiff / 1000);

    setAge({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds
    });

    // Calculate next birthday
    const currentYear = target.getFullYear();
    let nextBirthdayDate = new Date(currentYear, birth.getMonth(), birth.getDate());
    
    if (nextBirthdayDate <= target) {
      nextBirthdayDate = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }

    const daysUntilBirthday = Math.ceil((nextBirthdayDate.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    const dayOfWeek = nextBirthdayDate.toLocaleDateString('en-US', { weekday: 'long' });
    const nextAge = nextBirthdayDate.getFullYear() - birth.getFullYear();

    setNextBirthday({
      date: nextBirthdayDate.toISOString().split('T')[0],
      daysUntil: daysUntilBirthday,
      dayOfWeek,
      age: nextAge
    });
  };

  useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getZodiacSign = (date: string) => {
    const birth = new Date(date);
    const month = birth.getMonth() + 1;
    const day = birth.getDate();

    const signs = [
      { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
      { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
      { sign: 'Pisces', start: [2, 19], end: [3, 20] },
      { sign: 'Aries', start: [3, 21], end: [4, 19] },
      { sign: 'Taurus', start: [4, 20], end: [5, 20] },
      { sign: 'Gemini', start: [5, 21], end: [6, 20] },
      { sign: 'Cancer', start: [6, 21], end: [7, 22] },
      { sign: 'Leo', start: [7, 23], end: [8, 22] },
      { sign: 'Virgo', start: [8, 23], end: [9, 22] },
      { sign: 'Libra', start: [9, 23], end: [10, 22] },
      { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
      { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
    ];

    for (const { sign, start, end } of signs) {
      if (
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
      ) {
        return sign;
      }
    }
    return 'Capricorn'; // Default fallback
  };

  const getLifeStage = (years: number) => {
    if (years < 1) return 'Infant';
    if (years < 3) return 'Toddler';
    if (years < 6) return 'Preschooler';
    if (years < 13) return 'Child';
    if (years < 20) return 'Teenager';
    if (years < 30) return 'Young Adult';
    if (years < 50) return 'Adult';
    if (years < 65) return 'Middle-aged';
    return 'Senior';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Cake className="h-8 w-8 text-pink-600" />
          <h1 className="text-2xl font-bold text-gray-900">Age Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
              />
              <p className="text-sm text-gray-500">{formatDate(birthDate)}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Calculate Age On</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                />
                <button
                  onClick={() => setTargetDate(new Date().toISOString().split('T')[0])}
                  className="px-4 py-3 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
                >
                  Today
                </button>
              </div>
              <p className="text-sm text-gray-500">{formatDate(targetDate)}</p>
            </div>

            <div className="bg-pink-50 rounded-lg p-4">
              <h3 className="font-semibold text-pink-900 mb-2">Personal Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-pink-700">Zodiac Sign:</span>
                  <span className="font-semibold text-pink-800">{getZodiacSign(birthDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pink-700">Life Stage:</span>
                  <span className="font-semibold text-pink-800">{getLifeStage(age.years)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pink-700">Birth Day:</span>
                  <span className="font-semibold text-pink-800">
                    {new Date(birthDate).toLocaleDateString('en-US', { weekday: 'long' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Exact Age</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  {age.years} years
                </div>
                <div className="text-xl text-blue-700">
                  {age.months} months, {age.days} days
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Days:</span>
                  <span className="font-semibold text-blue-800">{age.totalDays.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Weeks:</span>
                  <span className="font-semibold text-blue-800">{age.totalWeeks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Months:</span>
                  <span className="font-semibold text-blue-800">{age.totalMonths.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Time Lived</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Hours:</span>
                  <span className="font-semibold text-green-800">{age.totalHours.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Minutes:</span>
                  <span className="font-semibold text-green-800">{age.totalMinutes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Seconds:</span>
                  <span className="font-semibold text-green-800">{age.totalSeconds.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Heartbeats (approx):</span>
                  <span className="font-semibold text-green-800">
                    {(age.totalMinutes * 70).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Next Birthday</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900 mb-1">
                    {nextBirthday.daysUntil} days
                  </div>
                  <div className="text-purple-700">until you turn {nextBirthday.age}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Date:</span>
                    <span className="font-semibold text-purple-800">
                      {formatDate(nextBirthday.date).split(',')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Day of Week:</span>
                    <span className="font-semibold text-purple-800">{nextBirthday.dayOfWeek}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Fun Facts</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• You've experienced {Math.floor(age.totalDays / 365.25)} leap years</li>
                <li>• You've lived through {Math.floor(age.totalWeeks / 52)} New Year's Days</li>
                <li>• Your next milestone birthday ({Math.ceil(age.years / 10) * 10}) is in {(Math.ceil(age.years / 10) * 10) - age.years} years</li>
                <li>• You've been alive for {((age.totalDays / 365.25) * 100).toFixed(1)}% of a century</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;