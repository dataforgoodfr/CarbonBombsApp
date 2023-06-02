import { useEffect } from 'react';
import Graph from "react-graph-vis";

// React Cytoscape or Reagraph

const data = {
  nodes: [
    { id: 1, label: 'CarbonBomb1', category: 'Oil', emissions: 500 },
    { id: 2, label: 'CarbonBomb2', category: 'Gas', emissions: 300 },
    { id: 3, label: 'CarbonBomb3', category: 'Coal', emissions: 800 },
    // Continue with the rest of your CarbonBombs
    // After CarbonBombs, let's add some Companies
    { id: 11, label: 'Company1' },
    { id: 12, label: 'Company2' },
    // Continue with the rest of your Companies
    // After Companies, let's add some Countries
    { id: 21, label: 'Country1' },
    { id: 22, label: 'Country2' },
    // Continue with the rest of your Countries
  ],
  edges: [
    { from: 1, to: 11, value: 300 }, // Financing from CarbonBomb1 to Company1
    { from: 2, to: 12, value: 500 }, // Financing from CarbonBomb2 to Company2
    // Continue with the rest of your connections
  ]
};



const NetworkGraph = () => {
  const options = {
    nodes: {
      shape: 'dot',
      scaling: {
        customScalingFunction: (min, max, total, value) => {
          return value / total;
        },
        min: 5,
        max: 150,
      },
      font: {
        size: 12,
        face: 'Tahoma',
      },
    },
    edges: {
      width: (value) => value / 10,
    },
    physics: {
      stabilization: false,
      barnesHut: {
        gravitationalConstant: -30000,
        springConstant: 0.04,
        springLength: 100,
      },
    },
    layout: {
      improvedLayout: true,
    },
  };

  useEffect(() => {
    const nodes = data.nodes.map((node) => {
      if (node.category) {
        let color;
        switch (node.category) {
          case 'Oil':
            color = 'red';
            break;
          case 'Gas':
            color = 'green';
            break;
          case 'Coal':
            color = 'blue';
            break;
        }
        return {
          ...node,
          value: node.emissions,
          color,
        };
      }
      return node;
    });

    const edges = data.edges.map((edge) => ({
      ...edge,
      value: edge.value,
    }));

    const graph = {
      nodes,
      edges,
    };

    return <Graph graph={graph} options={options} />;
  }, []);

  return <div className="network-graph" />;
};

export default NetworkGraph;
