import React from 'react';
import dynamic from 'next/dynamic';

const DynamicGraphCanvas = dynamic(
  () => import('reagraph').then((mod) => mod.GraphCanvas),
  { ssr: false } // This will make the component only rendered on client side
);

const NetworkGraph = ({ nodes = [], edges = [] }) => {
  // If no nodes or edges provided, use these default values
  const defaultNodes = [
    // CarbonBomb nodes
    { id: 'cb-1', label: 'Carbon Bomb 1', type: 'CarbonBomb', fill: "red" },
    { id: 'cb-2', label: 'Carbon Bomb 2', type: 'CarbonBomb', fill: "red" },
    // Company nodes
    { id: 'co-1', label: 'Company 1', type: 'Company' },
    { id: 'co-2', label: 'Company 2', type: 'Company' },
    // Bank nodes
    { id: 'ba-1', label: 'Bank 1', type: 'Bank' },
    { id: 'ba-2', label: 'Bank 2', type: 'Bank' },
  ];

  const defaultEdges = [
    // CarbonBomb to Company edges
    { id: 'cb-1->co-1', target: 'cb-1', source: 'co-1', label: 'CB 1 to Co 1' },
    { id: 'cb-2->co-2', target: 'cb-2', source: 'co-2', label: 'CB 2 to Co 2' },
    // Company to Bank edges
    { id: 'co-1->ba-1', target: 'co-1', source: 'ba-1', label: 'Co 1 to Ba 1' },
    { id: 'co-2->ba-1', target: 'co-2', source: 'ba-1', label: 'Co 1 to Ba 1' },
    { id: 'co-2->ba-2', target: 'co-2', source: 'ba-2', label: 'Co 2 to Ba 2' },
  ];

  // Use provided nodes and edges if they are not empty, otherwise use default values
  const finalNodes = nodes.length > 0 ? nodes : defaultNodes;
  const finalEdges = edges.length > 0 ? edges : defaultEdges;


  const getColorFromNodeType = (nodeType) => {
    switch (nodeType) {
      case 'CarbonBomb':
        return 'red';
      case 'Company':
        return 'green';
      case 'Bank':
        return 'blue';
      default:
        return 'gray'; // Default color for unknown types
    }
  };



  return (
    <div className='mt-10 w-full h-[600px] relative'>
      <DynamicGraphCanvas
        nodes={finalNodes}
        edges={finalEdges}
        clusterAttribute="type"
      />
    </div>
  );
};

export default NetworkGraph;
