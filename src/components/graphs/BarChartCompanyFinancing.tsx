import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import customColors from '../../../palette.js';

const prepareData = (company) => [
  { name: '2017', value: (company.y2017FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2018', value: (company.y2018FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2019', value: (company.y2019FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2020', value: (company.y2020FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2021', value: (company.y2021FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2022', value: (company.y2022FossilFinancing / 10 ** 9).toFixed(1) },
];

const BarChartCompanyFinancing = ({ company }) => {
  if (!company) {
    return null;
  }

  const data = prepareData(company);
  const maxValue = Math.max(
    ...data
      .map((item) => parseFloat(item.value))
      .filter((value) => !isNaN(value))
  );
  // const maxValue = Math.max(...data.map((item) => item.value));

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
        <XAxis dataKey='name' />
        <YAxis
          label={{ value: 'Md$', angle: -90, position: 'insideLeft' }}
          domain={[0, maxValue]}
        />
        <Tooltip />
        <Bar dataKey='value' fill={customColors.customExisting} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartCompanyFinancing;
