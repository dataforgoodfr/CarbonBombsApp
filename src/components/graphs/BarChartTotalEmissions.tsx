import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label } from 'recharts';
import customColors from '../../../palette.js';

const prepareData = (data) => {
  const newData = data.reduce((acc, item) => {
    let existing = acc.find(a => a.New_project_source_CB === item.New_project_source_CB);

    if (existing) {
      existing[item.Fuel_type_source_CB] = existing[item.Fuel_type_source_CB] || 0;
      existing[item.Fuel_type_source_CB] += parseFloat(item.Potential_GtCO2_source_CB);
    } else {
      existing = {
        New_project_source_CB: item.New_project_source_CB,
        [item.Fuel_type_source_CB]: parseFloat(item.Potential_GtCO2_source_CB)
      };
      acc.push(existing);
    }

    return acc;
  }, []);

  // Post-processing: Replace boolean values with string
  newData.forEach(item => {
    item.New_project_source_CB = item.New_project_source_CB ? 'New projects' : 'Existing projects';
  });

  return newData;
};


const BarChartTotalEmissions = ({ bombsData }) => {

  if (!bombsData || bombsData.length === 0) {
    return null;
  }

  const data = prepareData(bombsData);
  const fuelTypes = Array.from(new Set(bombsData.map(item => item.Fuel_type_source_CB))); // extract unique fuel types

  const colors = {
    'Coal': customColors.customCoal,
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

  console.log(data);
  // const labels = ["New projects", "Existing projects"]
  // {(value) => { console.log(value); return labels[value.toString()]; }}
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="New_project_source_CB" />
      <YAxis label={{ value: 'GtCO2', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />c
      <ReferenceLine
        y={420}
        stroke="#cd1818"
        strokeDasharray="3 3"
      >
        <Label
          value="Carbon Budget"
          position="end"
          offset={100}
          style={{ fill: '#cd1818', textAnchor: 'end' }}
        />
      </ReferenceLine>
      {fuelTypes.map((type, index) => (
        <Bar key={index} dataKey={type} stackId="a" fill={colors[type]} />
      ))}
    </BarChart>
  );
};

export default BarChartTotalEmissions;