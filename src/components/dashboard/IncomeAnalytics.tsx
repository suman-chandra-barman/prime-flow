import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

const IncomeAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('yearly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const data: Record<TimePeriod, ChartData[]> = {
    daily: [
      { label: 'Sun', value: 8500, color: '#FDE047' },
      { label: 'Mon', value: 9200, color: '#FDE047' },
      { label: 'Tue', value: 10500, color: '#FDE047' },
      { label: 'Wed', value: 19500, color: '#F97316' },
      { label: 'Thu', value: 13800, color: '#FDE047' },
      { label: 'Fri', value: 9800, color: '#FDE047' },
      { label: 'Sat', value: 15200, color: '#F97316' }
    ],
    weekly: [
      { label: 'Week 1', value: 45000, color: '#F97316' },
      { label: 'Week 2', value: 52000, color: '#FDE047' },
      { label: 'Week 3', value: 48500, color: '#FDE047' },
      { label: 'Week 4', value: 61000, color: '#F97316' }
    ],
    monthly: [
      { label: 'Jan', value: 185000, color: '#FDE047' },
      { label: 'Feb', value: 220000, color: '#F97316' },
      { label: 'Mar', value: 195000, color: '#FDE047' },
      { label: 'Apr', value: 240000, color: '#F97316' },
      { label: 'May', value: 210000, color: '#FDE047' },
      { label: 'Jun', value: 235000, color: '#F97316' },
      { label: 'Jul', value: 205000, color: '#FDE047' },
      { label: 'Aug', value: 225000, color: '#F97316' },
      { label: 'Sep', value: 190000, color: '#FDE047' },
      { label: 'Oct', value: 250000, color: '#F97316' },
      { label: 'Nov', value: 215000, color: '#FDE047' },
      { label: 'Dec', value: 245000, color: '#F97316' }
    ],
    yearly: [
      { label: '2020', value: 1800000, color: '#FDE047' },
      { label: '2021', value: 2200000, color: '#F97316' },
      { label: '2022', value: 2650000, color: '#F97316' },
      { label: '2023', value: 2900000, color: '#F97316' },
      { label: '2024', value: 3100000, color: '#F97316' }
    ]
  };

  const periodLabels: Record<TimePeriod, string> = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly'
  };

  const currentData = data[selectedPeriod];
  const maxValue = Math.max(...currentData.map(item => item.value));

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  const getYAxisLabels = (): string[] => {
    const step = maxValue / 4;
    return Array.from({ length: 5 }, (_, i) => formatValue(step * i));
  };

  return (
      <div className="w-full p-6">
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Income Analytics</h2>

              {/* Time Period Selector */}
              <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100
                         border border-gray-200 rounded-lg transition-colors duration-200
                         text-gray-700 font-medium min-w-[120px] justify-between"
                >
                  <span>{periodLabels[selectedPeriod]}</span>
                  <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {isDropdownOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200
                              rounded-lg shadow-lg z-10 min-w-[140px] overflow-hidden">
                      {Object.entries(periodLabels).map(([key, label]) => (
                          <button
                              key={key}
                              onClick={() => {
                                setSelectedPeriod(key as TimePeriod);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors
                                duration-200 text-gray-700 ${
                                  selectedPeriod === key ? 'bg-blue-50 text-blue-700 font-medium' : ''
                              }`}
                          >
                            {label}
                          </button>
                      ))}
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="p-6">
            <div className="flex h-80">
              {/* Y-Axis Labels */}
              <div className="flex flex-col justify-between items-end pr-4 py-4 text-sm text-gray-500 font-medium">
                {getYAxisLabels().reverse().map((label, index) => (
                    <div key={index} className="leading-none">
                      {label}
                    </div>
                ))}
              </div>

              {/* Chart Container */}
              <div className="flex-1 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {Array.from({ length: 5 }).map((_, index, array) => (
                      <div key={index} className={`${index === 0 || index === array.length - 1 ? "" : "border-t border-gray-100"}`}></div>
                  ))}
                </div>

                {/* Bars Container */}
                <div className="relative h-full flex items-end justify-between gap-2 px-2">
                  {currentData.map((item, index) => (
                      <div key={`${selectedPeriod}-${index}`} className="flex-1 flex flex-col items-center group">
                        {/* Bar */}
                        <div className="relative w-full max-w-16 mb-3">
                          <div
                              className="w-full rounded-t-lg transition-all duration-700 ease-out
                                 hover:opacity-80 cursor-pointer shadow-sm"
                              style={{
                                height: `${(item.value / maxValue) * 240}px`,
                                backgroundColor: item.color,
                                transitionDelay: `${index * 100}ms`
                              }}
                          >
                            {/* Value Label on Hover */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2
                                      bg-gray-900 text-white text-xs px-2 py-1 rounded 
                                      opacity-0 group-hover:opacity-100 transition-opacity 
                                      duration-200 whitespace-nowrap pointer-events-none">
                              {formatValue(item.value)}
                            </div>
                          </div>
                        </div>

                        {/* X-Axis Label */}
                        <div className="text-sm text-gray-600 font-medium">
                          {item.label}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default IncomeAnalytics;