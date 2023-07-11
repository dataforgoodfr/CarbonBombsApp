import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import useNeo4jClient from '@/modules/hooks/useNeo4jClient';
import customColors from '../../../palette.js';

const BarChartTotalEmissions = () => {
  const query = `
    MATCH (b:carbon_bomb)
    WITH b
    ORDER BY b.potential_gtco2 DESC
    LIMIT 10
    RETURN collect(properties(b)) as bombs
  `;
  const { data: { bombs = [] } = {}, loading: dataLoading } = useNeo4jClient(query);

  const colors = {
    true: customColors.customNew, // Color for new_project: true
    false: customColors.customExisting, // Color for new_project: false
  };

  // console.log(bombs)
  // console.log(JSON.stringify(bombs, null, 2));


  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        layout="vertical" // Adding this to make it a horizontal bar chart
        data={bombs}
        margin={{
          top: 20,
          right: 0,
          left: 100,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis type="number" /> {/* Now using XAxis for potential_gtco2 */}
        <YAxis dataKey="name" type="category" /> {/* Now using YAxis for name */}
        <Tooltip
          content={({ payload, label, active }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white bg-opacity-90 rounded shadow p-4">
                  <span className="text-lg"><a href={payload[0].payload.gem_source} target="_blank"><b>{payload[0].payload.name}</b></a></span><br />
                  <b>Fuel type:</b> {payload[0].payload.fuel_type}<br />
                  <b>Country:</b> {payload[0].payload.country}<br />
                  <b>Operating companies:</b> {payload[0].payload.parent_company}<br />
                  <b>Potential GtCO2:</b> {payload[0].value.toFixed(2)}<br />
                  <b>Project completion status:</b> {payload[0].payload.new_project ? "Not started yet" : "Already started"}<br />
                </div>
              );
            }

            return null;
          }}
        />

        <Bar dataKey="potential_gtco2">
          {
            bombs.map((entry, index) => {
              console.log(entry); // Debugging entry
              const fill = colors[entry.new_project];
              return <Cell key={`cell-${index}`} fill={fill} />;
            })
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartTotalEmissions;
