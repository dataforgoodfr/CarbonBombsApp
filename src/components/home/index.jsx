import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import CarbonBombInfo from '@/components/home/CarbonBombInfo';
import CarbonBombSection from '@/components/home/CarbonBombSection';
import CarbonBombSchema from '@/components/home/CarbonBombSchema';
import SectionKPIs from '@/components/home/SectionKPIs';
import TimeToActSection from '@/components/home/TimeToActSection';
import AnalyticsSection from '@/components/home/AnalyticsSection';
import WorldMap from '@/components/WorldMap';
import useNeo4jClient from '@/modules/hooks/useNeo4jClient';
import DataContext from '@/modules/contexts/dataContext';

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore


  const bombsQuery = `
  MATCH (p:carbon_bomb)
  WITH collect(properties(p)) as bombs,collect(distinct p.country) as countries
  MATCH (c:company)
  RETURN bombs, countries,collect(distinct c.name) as companies
  `

  const { data = { bombs: [], countries: [], companies: [] }, loading: dataLoading } = useNeo4jClient(bombsQuery);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  let query = '';

  if (selectedCountries.length === 0 && selectedCompanies.length > 0) {
    // filter only by company
    query = `
          MATCH (p:carbon_bomb)-[:OPERATES]-(c:company)
          WHERE c.name IN ${JSON.stringify(selectedCompanies.map(el => el.value))}
          WITH collect(properties(p)) as bombs
          RETURN bombs
      `;
  } else if (selectedCountries.length > 0 && selectedCompanies.length === 0) {
    // filter only by country
    query = `
          MATCH (p:carbon_bomb)
          WHERE p.country IN ${JSON.stringify(selectedCountries.map(el => el.value))}
          WITH collect(properties(p)) as bombs
          RETURN bombs
      `;
  } else if (selectedCountries.length > 0 && selectedCompanies.length > 0) {
    // filter by both country and company
    query = `
          MATCH (p:carbon_bomb)-[:OPERATES]-(c:company)
          WHERE p.country IN ${JSON.stringify(selectedCountries.map(el => el.value))} AND c.name IN ${JSON.stringify(selectedCompanies.map(el => el.value))}
          WITH collect(properties(p)) as bombs
          RETURN bombs
      `;
  } else {
    // neither filter is applied, return all carbon_bomb nodes
    query = `
          MATCH (p:carbon_bomb)
          WITH collect(properties(p)) as bombs
          RETURN bombs
      `;
  }

  const { data: dataFiltered, loading: mapLoading } = useNeo4jClient(query);


  return (
    <>
      <div className='py-20'>
        <div className='text-center'>
          <div className='mx-auto max-w-lg'>
            <div className='mb-4'>
              <h1 className='text-center text-4xl font-bold'>
                Carbon Bombs under the spotlight
              </h1>
            </div>
            <p className='text-lg'>
              Transparent data and visualization about the biggest fossil fuel
              extraction projects around the world
            </p>
            <div className='mt-4'>
              <div className='text-center'>
                <a
                  href='#map'
                  className='bg-black px-4 py-2 text-white hover:bg-gray-800'
                >
                  Check the map
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionKPIs />

      {/* <BanksSection /> */}
      {/* <OrdersOfMagnitudeSection /> */}
      <CarbonBombInfo />
      <div className='z-[9000] my-5'>
        <h2 className='mb-5 text-2xl font-bold' id='map'>
          Carbon bombs and key stakeholders worldwide
        </h2>

        <div className='flex justify-center'>
          <Select
            options={data.companies?.sort().map((company) => ({
              value: company,
              label: company,
            }))}
            className='z-[9000] mx-3 w-1/2'
            placeholder='Select a company...'
            isMulti
            onChange={(newValue) => setSelectedCompanies(newValue)}
          />
          <Select
            options={data.countries?.sort().map((country) => ({
              value: country,
              label: country,
            }))}
            className='z-[9000] mx-3 w-1/2'
            placeholder='Select a country...'
            isMulti
            onChange={(newValue) => setSelectedCountries(newValue)}
          />
        </div>
      </div>

      <>
        {dataFiltered.bombs?.length > 0 ? (
          <>
            <WorldMap bombsData={dataFiltered.bombs} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>

      <>
        {data.bombs?.length > 0 ? (
          <>
            <CarbonBombSchema />
            <CarbonBombSection bombsData={data.bombs} />
            <TimeToActSection bombsData={data.bombs} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>
      {/* <AnalyticsSection /> */}

      {/* <div>
        <NetworkGraphSection bombs={bombsFiltered} countries={selectedCountries} companies={selectedCompanies} />
      </div> */}
    </>
  );
};

export default HomePage;
