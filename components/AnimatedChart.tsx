import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface AnimatedChartProps {
  data: ChartDataPoint[];
}

const AnimatedChart: React.FC<AnimatedChartProps> = ({ data }) => {
  // Define colors from the new theme for direct use in Recharts
  const navyColor = '#201E43'; // brand-text
  const darkBlueColor = '#134B70'; // brand-core / brand-secondary
  const whiteColor = '#FFFFFF'; // background-800 / white

  return (
    <div className="w-full h-72 md:h-96 bg-background-800 p-4 rounded-lg shadow-lg"> {/* bg-white */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={darkBlueColor} strokeOpacity={0.3} /> {/* brand-secondary (darkBlue) with opacity */}
          <XAxis dataKey="name" stroke={navyColor} /> {/* brand-text (navy) */}
          <YAxis stroke={navyColor} /> {/* brand-text (navy) */}
          <Tooltip
            contentStyle={{ backgroundColor: whiteColor, border: `1px solid ${darkBlueColor}`, borderRadius: '0.5rem' }} // bg white, border darkBlue
            itemStyle={{ color: navyColor }} // text navy
            labelStyle={{ color: darkBlueColor, fontWeight: 'bold' }} // label darkBlue
          />
          <Legend wrapperStyle={{ color: navyColor }} /> {/* text navy */}
          <Line type="monotone" dataKey="value" stroke={darkBlueColor} strokeWidth={2} activeDot={{ r: 8, stroke: navyColor }} dot={{fill: darkBlueColor, r: 4}} /> {/* line darkBlue, activeDot stroke navy, dot fill darkBlue */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnimatedChart;