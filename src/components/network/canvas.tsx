import React from 'react';
import dynamic from 'next/dynamic';
import { useRef, forwardRef } from 'react';

import { GraphCanvasRef, useSelection } from 'reagraph';


const GraphCanvasWithNoSSR = dynamic(
  () => import('reagraph').then((mod) => mod.GraphCanvas),
  {
    ssr: false, // This will make the component only rendered on client side
    loading: () => <p>Loading...</p>  // Optional: you can add a loading state here
  }
);

const DynamicGraphCanvas = forwardRef((props, ref) => {
  return <GraphCanvasWithNoSSR ref={ref as any} {...props} />
});


const NetworkGraph = ({ nodes = [], edges = [] }) => {

  // const graphRef = useRef<GraphCanvasRef | null>(null);

  // const {
  //   selections,
  //   actives,
  //   onNodeClick,
  //   onCanvasClick
  // } = useSelection({
  //   ref: graphRef,
  //   nodes: nodes,
  //   edges: edges,
  //   pathSelectionType: 'all'
  // });

  // If no nodes or edges provided, use these default values
  const defaultNodes = [
  ];

  const defaultEdges = [
  ];

  // Use provided nodes and edges if they are not empty, otherwise use default values
  const finalNodes = nodes.length > 0 ? nodes : defaultNodes;
  const finalEdges = edges.length > 0 ? edges : defaultEdges;




  return (
    <DynamicGraphCanvas
      nodes={finalNodes}
      edges={finalEdges}
    />
  );


  // return (
  //   <DynamicGraphCanvas
  //     ref={graphRef}
  //     nodes={finalNodes}
  //     edges={finalEdges}
  //     clusterAttribute="type"
  //     selections={selections}
  //     actives={actives}
  //     onCanvasClick={onCanvasClick}
  //     onNodeClick={onNodeClick}
  //   />
  // );
};

export default NetworkGraph;
