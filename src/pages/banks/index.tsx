import React, { useContext, useEffect, useState } from 'react';
import DataContext from '@/modules/contexts/dataContext';
import Select from 'react-select';
import WorldMap from '@/components/WorldMap';
import BarChartBudget from '@/components/graphs/BarChartBudget';

import BanksContext from '@/modules/contexts/banksContext';

const BanksIndex = () => {
  const { data } = useContext(DataContext);
  const [bombsFiltered, setBombsFiltered] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  useEffect(() => {
    const filterData = () => {
      if (selectedCompanies.length) {
        const filtered = data.bombs.filter(
          (item) =>
            !selectedCompanies.length ||
            item.Parent_company_source_GEM.some((company) =>
              selectedCompanies.find(
                (option) => option.value === company.company
              )
            )
        );
        setBombsFiltered(filtered);
      } else {
        setBombsFiltered(data.bombs);
      }
    };

    filterData();
  }, [data, selectedCompanies]);

  // const { banks, loading } = useContext(BanksContext);
  // const banksGroupedByLetter = groupByFirstLetter(banks);

  // if (loading) return <div className='py-12'>Loading...</div>;

  return (
    <div>
      <div className='flex justify-end py-10'>
        <div className='mx-3 w-1/2'>
          <div className='mb-2'>Search for a bank</div>
          <Select
            // options={data.companies?.map((company) => ({
            //   value: company,
            //   label: company,
            // }))}
            defaultValue={{ value: 'test', label: 'test' }}
            options={[{ value: 'test', label: 'test' }]}
            placeholder='Select a bank...'
            // onChange={setSelectedCompanies}
          />
        </div>
      </div>
      <div className='mb-12 flex gap-x-8 gap-y-4'>
        <div className='h-72 w-3/5 min-w-[25rem] rounded-xl bg-white p-10 shadow'>
          <div className='mb-8 text-3xl font-bold'>Bank name</div>
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>Headquarters</div>
            <div className='font-bold'>City, country</div>
          </div>
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>CEO Name</div>
            <div className='font-bold'>His name</div>
          </div>
        </div>
        <div className='flex h-72 w-2/5 flex-col gap-y-4'>
          <div className='flex h-1/2 gap-x-4'>
            <div className='flex w-1/2 min-w-[10rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Financing to fossil fuel producers</div>
              <div className='text-3xl font-bold'>X Mds$</div>
            </div>
            <div className='flex w-1/2 min-w-[10rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Number of fussil fuel producers financed</div>
              <div className='text-3xl font-bold'>NN</div>
            </div>
          </div>
          <div className='flex h-1/2 min-w-[21rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
            <div>{"Fossil Fuel financing trends ('22 vs prev 5y)"}</div>
            <div className='text-3xl font-bold'>+y%</div>
          </div>
        </div>
      </div>
      <div className='flex gap-x-8 gap-y-4'>
        <div className='h-[34rem] w-3/5 min-w-[25rem] rounded-xl bg-white shadow'>
          <WorldMap bombsData={bombsFiltered} className='h-full w-full' />
        </div>
        <div className='flex h-[34rem] w-2/5 min-w-[21rem] flex-col items-center justify-center gap-y-4 rounded-xl bg-white shadow'>
          <BarChartBudget bombsData={bombsFiltered} />
        </div>
      </div>
    </div>
  );
};

export default BanksIndex;
