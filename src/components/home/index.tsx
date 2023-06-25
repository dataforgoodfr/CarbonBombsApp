import * as React from 'react';
import { useEffect, useState } from 'react';

import CarbonBombSection from '@/components/home/CarbonBombSection';
import SectionKPIs from '@/components/home/SectionKPIs';
import TimeToActSection from '@/components/home/TimeToActSection';
import WorldMap from '@/components/WorldMap';

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const jsonData = await res.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

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
      <CarbonBombSection bombsData={data.bombs} />
      <TimeToActSection bombsData={data.bombs} />
      {/* <BanksSection /> */}
      {/* <OrdersOfMagnitudeSection /> */}
      <WorldMap bombsData={data.bombs} />
      {/* <DataSection /> */}
    </>
  );
};

export default HomePage;
