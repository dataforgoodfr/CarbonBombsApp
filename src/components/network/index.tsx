import React from 'react';
import {useEffect, useState } from 'react';

import NetworkGraph from '@/components/network/canvas';

import customColors from '../../../palette.js';

const NetworkGraphSection = ({ bombs, companies, countries }) => {
  const [networkData, setNetworkData] = useState({ nodes: [], edges: [] });

  const generateGraphData = (carbonBombs) => {
    const nodes = [];
    const edges = [];

    carbonBombs.forEach((carbonBomb, index) => {
      // Create a node for each CarbonBomb

      const sizeFactor = 5;
      const color = carbonBomb.New_project_source_CB
        ? customColors.customNew
        : customColors.customExisting; // Change colors based on your preference
      const radius = carbonBomb.Potential_GtCO2_source_CB * sizeFactor;

      nodes.push({
        id: `cb-${index}`,
        name: carbonBomb.Carbon_bomb_name_source_CB,
        label: carbonBomb.Carbon_bomb_name_source_CB,
        type: 'CarbonBomb',
        fill: color,
        size: radius,
        metadata: carbonBomb, // Store all objects as metadata
      });

      if (carbonBomb.Parent_company_source_GEM) {
        // For each company in Parent_company_source_GEM, create a node and an edge
        carbonBomb.Parent_company_source_GEM.forEach(
          (company, companyIndex) => {
            // Check if company already exists in nodes, if not create a new one
            if (!nodes.some((node) => node.id === `co-${company.company}`)) {
              nodes.push({
                id: `co-${company.company}`,
                name: company.company,
                label: company.company,
                type: 'Company',
              });
            }

            // Create an edge from CarbonBomb to the Company
            edges.push({
              id: `co-${company.company}->cb-${index}`,
              source: `co-${company.company}`,
              target: `cb-${index}`,
              ownershipShare: company.ownershipShare,
              label: `${company.company} is financing ${carbonBomb.Carbon_bomb_name_source_CB}`,
            });
          }
        );
      }
    });

    return { nodes, edges };
  };

  useEffect(() => {
    // Check if companies and countries are empty

    // if (bombs) {
    //   const { nodes, edges } = generateGraphData(bombs);
    //   setNetworkData({ nodes: nodes, edges: edges })
    // }

    if (companies.length === 0 && countries.length === 0) {
      setNetworkData({ nodes: [], edges: [] });
    } else {
      const { nodes, edges } = generateGraphData(bombs);
      setNetworkData({ nodes: nodes, edges: edges });
    }
  }, [bombs, companies, countries]);

  return (
    <div className='relative mt-10 h-[600px] w-full'>
      <NetworkGraph nodes={networkData.nodes} edges={networkData.edges} />
    </div>
  );
};

export default NetworkGraphSection;
