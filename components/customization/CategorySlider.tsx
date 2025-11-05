'use client';

interface CategorySliderProps {
  category: string;
  importance: number;
  onChange: (value: number) => void;
}

export default function CategorySlider({ category, importance, onChange }: CategorySliderProps) {
  const getImportanceLabel = (value: number) => {
    if (value === 0) return 'Ignore';
    if (value <= 3) return 'Low';
    if (value <= 6) return 'Medium';
    if (value <= 8) return 'High';
    return 'Critical';
  };

  const getColorClass = (value: number) => {
    if (value === 0) return 'text-gray-400';
    if (value <= 3) return 'text-yellow-600';
    if (value <= 6) return 'text-blue-600';
    if (value <= 8) return 'text-purple-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 capitalize">
          {category}
        </label>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${getColorClass(importance)}`}>
            {getImportanceLabel(importance)}
          </span>
          <span className="text-xs text-gray-500 w-8 text-right">
            {importance}/10
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={importance}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right,
              rgb(156, 163, 175) 0%,
              rgb(234, 179, 8) ${importance * 10}%,
              rgb(234, 179, 8) ${importance * 10}%,
              rgb(239, 68, 68) 100%)`
          }}
        />
        <div className="flex justify-between mt-1">
          {[0, 5, 10].map((tick) => (
            <div
              key={tick}
              className="flex flex-col items-center"
              style={{ width: '1px' }}
            >
              <div className="text-xs text-gray-400">{tick}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual dots indicator */}
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              i < importance ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
