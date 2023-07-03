import React, { useContext, useEffect, useState } from 'react';
import DataContext from '@/modules/contexts/dataContext';
import Select from 'react-select';
import WorldMap from '@/components/WorldMap';
import BarChartBudget from '@/components/graphs/BarChartBudget';

const CompaniesIndex = () => {
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
            defaultValue={{ value: 'test', label: 'test' }}
            options={[{ value: 'test', label: 'test' }]}
            placeholder='Select a company...'
            // onChange={setSelectedCompanies}
          />
        </div>
      </div>
      <div className='mb-12 flex gap-x-8 gap-y-4'>
        <div className='h-72 w-3/5 min-w-[25rem] rounded-xl bg-white p-10 shadow'>
          <div className='mb-8 text-3xl font-bold'>Company name</div>
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>Headquarters</div>
            <div className='font-bold'>City, country</div>
          </div>
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>CEO Name</div>
            <div className='font-bold'>His name</div>
          </div>
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>Main fuel type</div>
            <div className='font-bold'>Oil & Gas / Coal </div>
          </div>
        </div>
        <div className='flex h-72 w-2/5 flex-col gap-y-4'>
          <div className='flex h-1/2 gap-x-4'>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Number of carbon bombs owned</div>
              <div className='text-3xl font-bold'>NN</div>
            </div>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Average carbon bomb ownership</div>
              <div className='text-3xl font-bold'>X %</div>
            </div>
          </div>
          <div className='flex h-1/2 gap-x-4'>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Combined potential CO2 from carbon bombs</div>
              <div className='text-3xl font-bold'>X GtCO2e</div>
            </div>
            <div className='flex w-1/2 min-w-[12rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Financing received from banks ('18-'22)</div>
              <div className='text-3xl font-bold'>X Mds$</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-x-8 gap-y-4'>
        <div className='h-[34rem] w-3/5 min-w-[25rem] rounded-xl bg-white shadow'>
          <WorldMap bombsData={bombsFiltered} className='h-full w-full' />
        </div>
        <div className='flex h-[34rem] w-2/5 min-w-[25rem] flex-col items-center justify-center gap-y-4 rounded-xl bg-white shadow'>
          <BarChartBudget bombsData={bombsFiltered} />
        </div>
      </div>
    </div>
  );
};

export default CompaniesIndex;
