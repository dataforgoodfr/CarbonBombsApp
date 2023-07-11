import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import BarChartCompanyFinancing from '@/components/graphs/BarChartCompanyFinancing';
import BarChartBudget from '@/components/graphs/BarChartBudget';
import WorldMap from '@/components/WorldMap';
import useNeo4jClient from '@/modules/hooks/useNeo4jClient';
import {
  companyFinancingQuery,
  companyDetailsQuery,
  companiesNameQuery,
  companyMainFuelTypeQuery,
  companyNetworkGraphQuery,
} from '@/utils/neo4j';

import customColors from '../../palette.js';

import NetworkGraphSection from '@/components/network';
import DataContext from '@/modules/contexts/dataContext';

const pickColorForNetworkGraph = (nodeType, nodeName, selectedCompanyName) => {
  if (nodeType !== 'company') return customColors.customBomb;
  if (nodeName === selectedCompanyName)
    return customColors.customCompanySelected;

  return customColors.customCompanyLinked;
};

const prepareNetworkGraphData = (data, selectedCompanyName) => {
  if (!data) return;

  return {
    edges: [...data.r1_rels, ...data.r2_rels].map((edge) => ({
      id: edge.id.low,
      source: edge.source.low,
      target: edge.target.low,
    })),
    nodes: [
      ...data.carbon_bomb_nodes,
      ...data.co_nodes,
      ...data.carbon_bomb_nodes,
    ].map((node) => ({
      id: node.id.low,
      name: node.name,
      label: node.name,
      type: node.type[0],
      fill: pickColorForNetworkGraph(
        node.type[0],
        node.name,
        selectedCompanyName
      ),
      size: node.metadata.potential_gtco2
        ? node.metadata.potential_gtco2 * 5
        : undefined,
      metadata: node.metadata,
    })),
  };
};
//   {
//   nodes: [...data.c, ...data.co, ...data.p],
//   edges: [...data.r1, ...data.r2],
// }

const CompaniesIndex = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const { data } = useContext(DataContext);
  const [name, setName] = useState('TotalEnergies SE');
  // const [bombsFiltered, setBombsFiltered] = useState([]);
  // const [selectedCompanies, setSelectedCompanies] = useState([]);

  const { data: companyFinancing = {} } = useNeo4jClient(
    companyFinancingQuery(name)
  );

  const { data: companyDetails = {} } = useNeo4jClient(
    companyDetailsQuery(name)
  );

  const { data: companyMainFuelType = {} } = useNeo4jClient(
    companyMainFuelTypeQuery(name)
  );

  const { data: companyNames = {} } = useNeo4jClient(companiesNameQuery);

  const { data: companyNetworkGraph = {} } = useNeo4jClient(
    companyNetworkGraphQuery(name)
  );

  const networkGraphData = companyNetworkGraph?.company_nodes
    ? prepareNetworkGraphData(companyNetworkGraph, name)
    : {};

  // const { companies, loading } = useContext(ComapniesContext);

  // console.log(nodes);
  // console.log(edges);
  // if (loading) return <div className='py-12'>Loading...</div>;

  // filter only by company
  let mapQuery = `
  MATCH (p:carbon_bomb)-[:OPERATES]-(c:company {name:"${name}"})
  WITH collect(properties(p)) as bombs
  RETURN bombs
    `;

  console.log(mapQuery);
  const { data: dataFiltered, loading: mapLoading } = useNeo4jClient(mapQuery);

  return (
    <div>
      <div className='flex justify-end py-10'>
        <div className='mx-3 w-1/2'>
          <div className='mb-2'>Search for a company</div>
          <Select
            // options={data.companies?.map((company) => ({
            //   value: company,
            //   label: company,
            // }))}
            defaultValue={{
              value: 'TotalEnergies SE',
              label: 'TotalEnergies SE',
            }}
            options={companyNames}
            placeholder='Select a company...'
            onChange={(item) => setName(item.value)}
          />
        </div>
      </div>
      <div className='mb-12 flex gap-x-8 gap-y-4'>
        <div className='h-72 w-3/5 min-w-[35rem] rounded-xl bg-white p-10 shadow'>
          <div className='mb-8 flex items-center gap-x-8'>
            <div className='text-3xl font-bold'>{companyDetails?.name}</div>
            <div className='max-w-[12rem]'>
              <img
                className='mr-8 w-24'
                src={
                  companyDetails?.url_logo !== 'None'
                    ? companyDetails?.url_logo
                    : ''
                }
              />
            </div>
          </div>
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>Country</div>
            <div className='font-bold'>{companyDetails?.country}</div>
          </div>
          {/* <div className='flex gap-x-4'>
                <div className='w-40 text-gray-500'>CEO Name</div>
                <div className='font-bold'>His name</div>
              </div> */}
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>Main fuel type</div>
            <div className='font-bold'>
              {companyMainFuelType?.main_fuel_type}
            </div>
          </div>
        </div>
        <div className='flex h-72 w-2/5 flex-col gap-y-4'>
          <div className='flex h-1/2 gap-x-4'>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Number of carbon bombs owned</div>
              <div className='text-3xl font-bold'>
                {companyDetails?.nb_cBombs?.low}
              </div>
            </div>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Average carbon bomb ownership</div>
              <div className='text-3xl font-bold'>
                {`${companyDetails?.avg_ownership_share?.toFixed(1)} %`}
              </div>
            </div>
          </div>
          <div className='flex h-1/2 gap-x-4'>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Combined potential CO2 from carbon bombs</div>
              <div className='text-2xl font-bold'>
                {`${companyDetails?.tot_gtCO2_potential?.toFixed(1)} GtCO2e`}
              </div>
            </div>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Financing received from banks ('18-'22)</div>
              <div className='text-3xl font-bold'>
                {companyFinancing
                  ? `${(
                      companyFinancing?.last5yFossilFinancing /
                      10 ** 9
                    ).toFixed(1)} Mds$`
                  : 'unknown'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex h-[34rem] w-full min-w-[21rem] flex-col flex-col items-center justify-center gap-y-4 rounded-xl bg-white p-2 shadow'>
        {/* <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'> */}
        {dataFiltered.bombs?.length > 0 ? (
          <>
            <WorldMap bombsData={dataFiltered.bombs} />
          </>
        ) : (
          <p>Loading Map...</p>
        )}
      </div>

      {!!companyFinancing?.length && (
        <div className='flex h-[34rem] w-full min-w-[21rem] flex-col flex-col items-center justify-center gap-y-4 rounded-xl bg-white shadow'>
          <div className='text-xl'>
            Total financing to fossil fuel producers by year
          </div>
          <BarChartCompanyFinancing company={companyFinancing} />
        </div>
      )}
      <NetworkGraphSection data={networkGraphData} />
      {/* <div className='flex gap-x-8 gap-y-4'>
        <div className='h-[34rem] w-3/5 min-w-[25rem] rounded-xl bg-white shadow'>
          <WorldMap bombsData={bombsFiltered} className='h-full w-full' />
        </div>
        <div className='flex h-[34rem] w-2/5 min-w-[25rem] flex-col items-center justify-center gap-y-4 rounded-xl bg-white shadow'>
          <BarChartBudget bombsData={bombsFiltered} />
        </div>
      </div> */}
    </div>
  );
};

export default CompaniesIndex;
