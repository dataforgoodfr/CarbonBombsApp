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
} from '@/utils/neo4j';

import DataContext from '@/modules/contexts/dataContext';

const CompaniesIndex = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const { data } = useContext(DataContext);
  const [name, setName] = useState('Saudi Aramco');
  // const [bombsFiltered, setBombsFiltered] = useState([]);
  // const [selectedCompanies, setSelectedCompanies] = useState([]);

  const { data: companyFinancing = [] } = useNeo4jClient(
    companyFinancingQuery(name)
  );

  const { data: companyDetails = [] } = useNeo4jClient(
    companyDetailsQuery(name)
  );

  const { data: companyMainFuelType = [] } = useNeo4jClient(
    companyMainFuelTypeQuery(name)
  );

  const { data: companyNames = [] } = useNeo4jClient(companiesNameQuery);

  // const { companies, loading } = useContext(ComapniesContext);

  // if (loading) return <div className='py-12'>Loading...</div>;

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
            <div className='text-3xl font-bold'>{companyDetails[0]?.name}</div>
            <div className='max-w-[12rem]'>
              <img
                className='mr-8 w-24'
                src={
                  companyDetails[0]?.url_logo !== 'None'
                    ? companyDetails[0]?.url_logo
                    : ''
                }
              />
            </div>
          </div>
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>Country</div>
            <div className='font-bold'>{companyDetails[0]?.country}</div>
          </div>
          {/* <div className='flex gap-x-4'>
                <div className='w-40 text-gray-500'>CEO Name</div>
                <div className='font-bold'>His name</div>
              </div> */}
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>Main fuel type</div>
            <div className='font-bold'>
              {companyMainFuelType[0]?.main_fuel_type}
            </div>
          </div>
        </div>
        <div className='flex h-72 w-2/5 flex-col gap-y-4'>
          <div className='flex h-1/2 gap-x-4'>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Number of carbon bombs owned</div>
              <div className='text-3xl font-bold'>
                {companyDetails[0]?.nb_cBombs?.low}
              </div>
            </div>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Average carbon bomb ownership</div>
              <div className='text-3xl font-bold'>
                {`${companyDetails[0]?.avg_ownership_share?.toFixed(1)} %`}
              </div>
            </div>
          </div>
          <div className='flex h-1/2 gap-x-4'>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Combined potential CO2 from carbon bombs</div>
              <div className='text-2xl font-bold'>
                {`${companyDetails[0]?.tot_gtCO2_potential.toFixed(1)} GtCO2e`}
              </div>
            </div>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Financing received from banks ('18-'22)</div>
              <div className='text-3xl font-bold'>
                {companyFinancing[0]
                  ? `${(
                      companyFinancing[0]?.last5yFossilFinancing /
                      10 ** 9
                    ).toFixed(1)} Mds$`
                  : 'unknown'}
              </div>
            </div>
          </div>
        </div>
      </div>
      {companyFinancing[0] && (
        <div className='flex h-[34rem] w-full min-w-[21rem] flex-col flex-col items-center justify-center gap-y-4 rounded-xl bg-white shadow'>
          <div className='text-xl'>
            Total financing to fossil fuel producers by year
          </div>
          <BarChartCompanyFinancing company={companyFinancing[0]} />
        </div>
      )}
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