import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import CarbonBombInfo from '@/components/home/CarbonBombInfo';
import CarbonBombSection from '@/components/home/CarbonBombSection';
import SectionKPIs from '@/components/home/SectionKPIs';
import TimeToActSection from '@/components/home/TimeToActSection';
import WorldMap from '@/components/WorldMap';

import DataContext from '@/modules/contexts/dataContext';


const HomePage = () => {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data } = useContext(DataContext);
  const [bombsFiltered, setBombsFiltered] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const filterData = () => {
      if (selectedCompanies.length || selectedCountries.length) {
        const filtered = data.bombs.filter(
          (item) =>
            (!selectedCompanies.length ||
              item.Parent_company_source_GEM.some((company) =>
                selectedCompanies.find(
                  (option) => option.value === company.company
                )
              )) &&
            (!selectedCountries.length ||
              selectedCountries.some(
                (option) => option.value === item.Country_source_CB
              ))
        );
        setBombsFiltered(filtered);
      } else {
        setBombsFiltered(data.bombs);
      }
    };

    filterData();
  }, [data, selectedCompanies, selectedCountries]);

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
      {/* <CarbonBombInfo /> */}

      {/* <BanksSection /> */}
      {/* <OrdersOfMagnitudeSection /> */}
      <div className='z-[9000] my-5'>
        <h2 className='mb-5 text-2xl font-bold' id='map'>
          Carbon bombs and key stakeholders worldwide
        </h2>
        <div className='flex justify-center'>
          <Select
            options={data.companies?.map((company) => ({
              value: company,
              label: company,
            }))}
            className='z-[9000] mx-3 w-1/2'
            placeholder='Select a company...'
            isMulti
            onChange={(newValue) => setSelectedCompanies(newValue as any)}
          />
          <Select
            options={data.countries?.map((country) => ({
              value: country,
              label: country,
            }))}
            className='z-[9000] mx-3 w-1/2'
            placeholder='Select a country...'
            isMulti
            onChange={(newValue) => setSelectedCountries(newValue as any)}
          />
        </div>
      </div>
      {/* <DataSection /> */}

      <>
        {bombsFiltered?.length > 0 ? (
          <>
            <WorldMap bombsData={bombsFiltered} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>

      <>
        {data.bombs?.length > 0 ? (
          <>
            <CarbonBombInfo />
            <CarbonBombSection bombsData={data.bombs} />
            <TimeToActSection bombsData={data.bombs} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>

      {/* <div>
        <NetworkGraphSection bombs={bombsFiltered} countries={selectedCountries} companies={selectedCompanies} />
      </div> */}
    </>
  );
};

export default HomePage;
