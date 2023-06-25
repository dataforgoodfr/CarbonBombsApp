import * as React from 'react';
import { useEffect, useState } from 'react';

import Select from 'react-select';

import CarbonBombSection from '@/components/home/CarbonBombSection';
import SectionKPIs from '@/components/home/SectionKPIs';
import TimeToActSection from '@/components/home/TimeToActSection';
import WorldMap from '@/components/WorldMap';



const HomePage = () => {
  const [data, setData] = useState([]);
  const [bombsFiltered, setBombsFiltered] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const jsonData = await res.json();
      setData(jsonData);
      setBombsFiltered(jsonData.bombs);

      console.log(jsonData.companies)

    };

    fetchData();
  }, []);




  useEffect(() => {
    const filterData = () => {
      if (selectedCompanies.length || selectedCountries.length) {
        const filtered = data.bombs.filter(item =>
          (!selectedCompanies.length || item.Parent_company_source_GEM.some(company => selectedCompanies.find(option => option.value === company.company))) &&
          (!selectedCountries.length || selectedCountries.some(option => option.value === item.Country_source_CB))
        );
        setBombsFiltered(filtered);
      } else {
        setBombsFiltered(data.bombs);
      }
    }

    filterData();
  }, [selectedCompanies, selectedCountries]);


  return (
    <>
      <div className='my-20'>
        <div className='text-center'>
          <div className='mx-auto max-w-lg'>
            <div className='mb-4'>
              <h1 className='text-center text-4xl font-bold'>
                Transparent data and <br /> visualization about carbon bombs
              </h1>
            </div>
            <p className='text-lg'>
              CarbonBombs.org is a tool to follow the evolution of carbon bombs
              in the world.
            </p>
            <div className='mt-4'>
              <div className='text-center'>
                <a
                  href='#data'
                  className='bg-black px-4 py-2 text-white hover:bg-gray-800'
                >
                  Play with data
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionKPIs />
      {/* <CarbonBombInfo /> */}

      <>
        {data.bombs?.length > 0 ? (
          <>
            <CarbonBombSection bombsData={data.bombs} />
            <TimeToActSection bombsData={data.bombs} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </>

      {/* <BanksSection /> */}
      {/* <OrdersOfMagnitudeSection /> */}
      <div className="flex justify-center my-5 z-[9000]">
        <Select
          options={data.companies?.map(company => ({ value: company, label: company }))}
          className="mx-3 w-1/2 z-[9000]"
          placeholder="Select a company..."
          isMulti
          onChange={setSelectedCompanies}
        />
        <Select
          options={data.countries?.map(country => ({ value: country, label: country }))}
          className="mx-3 w-1/2 z-[9000]"
          placeholder="Select a country..."
          isMulti
          onChange={setSelectedCountries}
        />
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
    </>
  );
};

export default HomePage;

