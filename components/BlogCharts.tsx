
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

// Theme colors (consider making these globally accessible or passed as props for consistency)
const navyColor = '#201E43';      // brand-text
const darkBlueColor = '#134B70';  // brand-core
const whiteColor = '#FFFFFF';     // background-800

// Palette for charts, can be expanded
const rechartsPalette = ['#4285F4', '#174EA6', '#AECBFA', '#FBBC05', '#34A853', '#EA4335'];

// Data for Line Chart (Total Cost of a Data Breach)
const lineChartData: ChartDataPoint[] = [
  { name: '2017', value: 3.62 },
  { name: '2018', value: 3.86 },
  { name: '2019', value: 3.92 },
  { name: '2020', value: 3.86 },
  { name: '2021', value: 4.24 },
  { name: '2022', value: 4.35 },
  { name: '2023', value: 4.45 },
];

export const BlogLineChart: React.FC = () => (
  <div className="w-full h-72 md:h-96 bg-background-800 p-4 rounded-lg shadow-lg my-8" aria-label="Line chart showing total cost of a data breach">
    <h3 className="text-lg md:text-xl font-semibold mb-4 text-brand-core text-center" id="line-chart-title">Total Cost of a Data Breach (USD Millions)</h3>
    <ResponsiveContainer width="100%" height="85%">
      <LineChart 
        data={lineChartData} 
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }} // Adjusted right margin for smaller screens
        aria-labelledby="line-chart-title"
      >
        <CartesianGrid strokeDasharray="3 3" stroke={darkBlueColor} strokeOpacity={0.3} />
        <XAxis dataKey="name" stroke={navyColor} aria-label="Year" tick={{ fontSize: 10 }} />
        <YAxis 
          stroke={navyColor} 
          tickFormatter={(value) => `$${value.toFixed(1)}`} // Ensure one decimal place for 3.5
          aria-label="Cost in millions of USD" 
          domain={[3.5, 4.5]} 
          tick={{ fontSize: 10 }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: whiteColor, border: `1px solid ${darkBlueColor}`, borderRadius: '0.5rem' }}
          itemStyle={{ color: navyColor }}
          labelStyle={{ color: darkBlueColor, fontWeight: 'bold' }}
          formatter={(value: number, name: string, props: any) => [`$${value.toFixed(2)}M`, 'Cost']}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={rechartsPalette[0]} 
          strokeWidth={2} 
          activeDot={{ r: 6, stroke: navyColor }} 
          dot={{ fill: rechartsPalette[0], r: 3 }} 
          name="Cost" 
          aria-label="Cost data line"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Data for Bar Chart (Type of Data Compromised)
const barChartData = [
  { name: 'Customer PII', '2023': 52, '2022': 47, '2021': 44 },
  { name: 'Employee PII', '2023': 40, '2022': 34, '2021': 26 },
  { name: 'Intellectual Property', '2023': 34, '2022': 31, '2021': 27 },
  { name: 'Anonymized Customer Data', '2023': 33, '2022': 26, '2021': 28 },
  { name: 'Other Corporate Data', '2023': 21, '2022': 15, '2021': 12 },
];

export const BlogBarChart: React.FC = () => (
  <div className="w-full h-80 md:h-[450px] bg-background-800 p-4 rounded-lg shadow-lg my-8" aria-label="Bar chart showing type of data compromised">
    <h3 className="text-lg md:text-xl font-semibold mb-4 text-brand-core text-center" id="bar-chart-title">Type of Data Compromised (%)</h3>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart 
        data={barChartData} 
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }} // Adjusted right margin
        aria-labelledby="bar-chart-title"
      >
        <CartesianGrid strokeDasharray="3 3" stroke={darkBlueColor} strokeOpacity={0.3} />
        <XAxis 
            dataKey="name" 
            stroke={navyColor} 
            angle={-30} // Slightly increased angle for better label separation
            textAnchor="end" 
            height={75} // Adjusted height to accommodate angled labels
            interval={0} 
            aria-label="Data Type"
            tick={{ fontSize: 9 }} // Reduced font size for X-axis labels
        />
        <YAxis stroke={navyColor} tickFormatter={(value) => `${value}%`} aria-label="Percentage" tick={{ fontSize: 10 }} />
        <Tooltip
          contentStyle={{ backgroundColor: whiteColor, border: `1px solid ${darkBlueColor}`, borderRadius: '0.5rem' }}
          itemStyle={{ color: navyColor }}
          labelStyle={{ color: darkBlueColor, fontWeight: 'bold' }}
          formatter={(value: number, name: string) => [`${value}%`, name]} // Changed 'Percentage' to name (which is the year)
        />
        <Legend 
            wrapperStyle={{ color: navyColor, paddingTop: '15px', fontSize: '12px' }} // Reduced legend font size
        />
        <Bar dataKey="2023" fill={rechartsPalette[0]} name="2023" aria-label="Data for 2023" barSize={20} />
        <Bar dataKey="2022" fill={rechartsPalette[1]} name="2022" aria-label="Data for 2022" barSize={20} />
        <Bar dataKey="2021" fill={rechartsPalette[2]} name="2021" aria-label="Data for 2021" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
