import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import customColors from '../../../palette.js';

const prepareData = (data) => {
  const totalEmissions = data.reduce((acc, item) => {
    const type = item.New_project_source_CB
      ? 'New projects'
      : 'Existing projects';
    acc[type] = (acc[type] || 0) + parseFloat(item.Potential_GtCO2_source_CB);
    return acc;
  }, {});

  // Convert the totalEmissions object to the array format expected by recharts
  const newData = [
    {
      ...totalEmissions,
      'Carbon Budget': 420,
    },
  ];

  return newData;
};

const BarChartBudget = ({ bombsData }) => {
  if (!bombsData || bombsData.length === 0) {
    return null;
  }

  const data = prepareData(bombsData);

  const colors = {
    'Existing projects': customColors.customExisting, // pastel brown
    'New projects': customColors.customNew, // pastel violet
    'Carbon Budget': customColors.customBudget, // other pastel color for Carbon Budget
  };

  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='New_project_source_CB' />
        <YAxis label={{ value: 'GtCO2', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => value.toFixed(2)} />
        <Legend />
        <Bar
          dataKey='Existing projects'
          stackId='a'
          fill={colors['Existing projects']}
        />
        <Bar dataKey='New projects' stackId='a' fill={colors['New projects']} />
        <Bar dataKey='Carbon Budget' fill={colors['Carbon Budget']} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartBudget;
