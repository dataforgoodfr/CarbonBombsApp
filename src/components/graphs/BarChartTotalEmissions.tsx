import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import customColors from '../../../palette.js';

const prepareData = (data) => {
  const newData = data.reduce((acc, item) => {
    let existing = acc.find(
      (a) => a.new_project === item.new_project
    );

    if (existing) {
      existing[item.fuel_type] =
        existing[item.fuel_type] || 0;
      existing[item.fuel_type] += parseFloat(
        item.potential_gtco2
      );
    } else {
      existing = {
        new_project: item.new_project,
        [item.fuel_type]: parseFloat(item.potential_gtco2),
      };
      acc.push(existing);
    }

    return acc;
  }, []);

  // Post-processing: Replace boolean values with string
  newData.forEach((item) => {
    item.new_project = item.new_project
      ? 'New projects'
      : 'Existing projects';
  });

  return newData;
};

const BarChartTotalEmissions = ({ bombsData }) => {
  if (!bombsData || bombsData.length === 0) {
    return null;
  }

  const data = prepareData(bombsData);
  const fuelTypes = Array.from(
    new Set(bombsData.map((item) => item.fuel_type))
  ); // extract unique fuel types

  const colors = {
    Coal: customColors.customCoal,
    'Oil&Gas': customColors.customOilGas,
  };

  // const labels = {
  //   'true': 'New projects',
  //   'false': 'Existing projects',
  // };

  // const formatXAxis = (tickItem) => {

  //   console.log(tickItem)
  //   return "X";
  // }

  // const labels = ["New projects", "Existing projects"]
  // {(value) => { console.log(value); return labels[value.toString()]; }}
  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='new_project' />
        <YAxis label={{ value: 'GtCO2', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
        <Legend />c
        <ReferenceLine y={420} stroke='#454545' strokeDasharray='3 3'>
          <Label
            value='Carbon Budget'
            position='top'
            offset={10}
            style={{ fill: '#454545', textAnchor: 'start' }}
          />
        </ReferenceLine>
        {fuelTypes.map((fuelType, index) => (
          <Bar key={index} dataKey={fuelType as string} stackId='a' fill={colors[fuelType as string]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartTotalEmissions;
