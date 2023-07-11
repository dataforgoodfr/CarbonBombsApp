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

const prepareData = (topContributorBank) =>
  topContributorBank.map((topContributor) => ({
    name: topContributor.company,
    value: (topContributor.financing / 10 ** 9).toFixed(1),
  }));

const BarChartBankTopContributor = ({ topContributorBank }) => {
  if (!topContributorBank) {
    return null;
  }

  const data = prepareData(topContributorBank);
  const maxValue = Math.max(
    ...data
      .map((item) => parseFloat(item.value))
      .filter((value) => !isNaN(value))
  );

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
        <XAxis dataKey='name' tick={false} />
        <YAxis
          label={{ value: 'Md$', angle: -90, position: 'insideLeft' }}
          domain={[0, maxValue]}
        />
        <Tooltip />
        <Bar dataKey='value' fill={customColors.customNew} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartBankTopContributor;
