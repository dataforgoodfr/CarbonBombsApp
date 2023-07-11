import React, { useState } from 'react';
import Select from 'react-select';

import BarChartBankFinancing from '@/components/graphs/BarChartBankFinancing';
import BarChartBankTopContributor from '@/components/graphs/BarChartBankTopContributor';

import useNeo4jClient from '@/modules/hooks/useNeo4jClient';
import {
  bankDetailsQuery,
  banksNameQuery,
  topContributorBankQuery,
} from '@/utils/neo4j';

const BanksIndex = () => {
  // const { data } = useContext(DataContext);
  const [name, setName] = useState('ICBC');
  // const [bombsFiltered, setBombsFiltered] = useState([]);
  // const [selectedCompanies, setSelectedCompanies] = useState([]);

  // useEffect(() => {
  //   const filterData = () => {
  //     if (selectedCompanies.length) {
  //       const filtered = data.bombs.filter(
  //         (item) =>
  //           !selectedCompanies.length ||
  //           item.Parent_company_source_GEM.some((company) =>
  //             selectedCompanies.find(
  //               (option) => option.value === company.company
  //             )
  //           )
  //       );
  //       setBombsFiltered(filtered);
  //     } else {
  //       setBombsFiltered(data.bombs);
  //     }
  //   };

  //   filterData();
  // }, [data, selectedCompanies]);

  // const { banks, loading } = useContext(BanksContext);
  // const banksGroupedByLetter = groupByFirstLetter(banks);

  // if (loading) return <div className='py-12'>Loading...</div>;

  const { data: bank = {}, loading: detailsLoading } = useNeo4jClient(
    bankDetailsQuery(name)
  );

  const { data: topContributorBank = {} } = useNeo4jClient(
    topContributorBankQuery(name)
  );

  console.log(topContributorBank);

  const { data: banksName = [], loading: namesLoading } =
    useNeo4jClient(banksNameQuery);

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
            defaultValue={{ value: 'ICBC', label: 'ICBC' }}
            options={namesLoading ? [] : banksName}
            placeholder='Select a bank...'
            onChange={(item) => setName(item.value)}
          />
        </div>
      </div>
      <div className='mb-12 flex gap-x-8 gap-y-4'>
        <div className='h-72 w-3/5 min-w-[25rem] rounded-xl bg-white p-10 shadow'>
          <div className='mb-8 flex items-center gap-x-4'>
            <div className='text-3xl font-bold'>{bank?.name}</div>
            <div className='max-w-[12rem]'>
              <img src={bank?.url_logo} />
            </div>
          </div>
          <div className='mb-3 flex gap-x-4'>
            <div className='w-40 text-gray-500'>Headquarters</div>
            <div className='max-w-[50%] whitespace-pre-wrap font-bold'>
              {`${bank?.address}, ${bank?.country}`}
            </div>
          </div>
          <div className='flex gap-x-4'>
            <div className='w-40 text-gray-500'>CEO Name</div>
            <div className='font-bold'>{bank?.ceo_name}</div>
          </div>
        </div>
        <div className='flex h-72 w-2/5 flex-col gap-y-4'>
          <div className='flex h-1/2 gap-x-4'>
            <div className='flex w-1/2 min-w-[10rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Financing to fossil fuel producers</div>
              <div className='text-3xl font-bold'>{`${(
                bank?.totalFossilFinancing /
                10 ** 9
              ).toFixed(1)} Md$`}</div>
            </div>
            <div className='flex w-1/2 min-w-[10rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
              <div>Number of fussil fuel producers financed</div>
              <div className='text-3xl font-bold'>
                {bank?.FF_companies_financed?.low}
              </div>
            </div>
          </div>
          <div className='flex h-1/2 min-w-[21rem] flex-col gap-y-4 rounded-xl bg-white p-4 text-sm shadow'>
            <div>Fossil Fuel financing trends ('22 vs prev 6y)</div>
            <div className='text-3xl font-bold'>{`${(
              bank?.var22VsPrev6y * 100
            ).toFixed(1)}%`}</div>
          </div>
        </div>
      </div>
      <div className='flex gap-x-8 gap-y-4'>
        {/* <div className='h-[34rem] w-3/5 min-w-[25rem] rounded-xl bg-white shadow'>
          <WorldMap bombsData={bombsFiltered} className='h-full w-full' />
        </div> */}
        <div className='flex h-[34rem] w-full min-w-[21rem] flex-col flex-col items-center justify-center gap-y-4 rounded-xl bg-white shadow'>
          <div className='text-xl'>
            Total financing to fossil fuel producers by year
          </div>
          <BarChartBankFinancing bank={bank} />
        </div>
        <div className='flex h-[34rem] w-full min-w-[21rem] flex-col flex-col items-center justify-center gap-y-4 rounded-xl bg-white shadow'>
          <div className='text-xl'>
            Top 5 financing of fossil fuels companies
          </div>
          <BarChartBankTopContributor topContributorBank={topContributorBank} />
        </div>
      </div>
    </div>
  );
};

export default BanksIndex;
