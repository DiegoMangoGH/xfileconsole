import React from 'react';

interface UsageData {
  month: string;
  value: number;
}

interface UsageChartProps {
  data: UsageData[];
  title?: string;
}

const UsageChart: React.FC<UsageChartProps> = ({ data, title = "Usage" }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 200;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="relative">
        <svg width="100%" height={chartHeight} className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
              <line
                x1="0"
                y1={chartHeight - (value / 100) * chartHeight}
                x2="100%"
                y2={chartHeight - (value / 100) * chartHeight}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <text
                x="0"
                y={chartHeight - (value / 100) * chartHeight - 5}
                fontSize="12"
                fill="#6b7280"
              >
                {value}
              </text>
            </g>
          ))}
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = chartHeight - (point.value / maxValue) * chartHeight;
              return `${x}%,${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = chartHeight - (point.value / maxValue) * chartHeight;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={y}
                r="4"
                fill="#3b82f6"
                className="hover:r-6 transition-all cursor-pointer"
              >
                <title>{`${point.month}: ${point.value}`}</title>
              </circle>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.map((point, index) => (
            <span key={index}>{point.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsageChart;