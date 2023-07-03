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

const prepareData = (bank) => [
  { name: '2016', value: (bank.y2016FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2017', value: (bank.y2017FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2018', value: (bank.y2018FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2019', value: (bank.y2019FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2020', value: (bank.y2020FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2021', value: (bank.y2021FossilFinancing / 10 ** 9).toFixed(1) },
  { name: '2022', value: (bank.y2022FossilFinancing / 10 ** 9).toFixed(1) },
];

const BarChartBankFinancing = ({ bank }) => {
  if (!bank) {
    return null;
  }

  const data = prepareData(bank);
  const maxValue = Math.max(...data.map((item) => item.value));

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

export default BarChartBankFinancing;
