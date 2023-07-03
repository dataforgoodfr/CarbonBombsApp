import Link from 'next/link';
import React, { useContext } from 'react';

import BanksContext from '@/modules/contexts/banksContext';

const groupByFirstLetter = (banks) => {
  return banks.reduce((result, bank) => {
    const letter = bank.Name[0].toUpperCase();
    if (!result[letter]) {
      result[letter] = [];
    }
    result[letter].push(bank);
    return result;
  }, {});
};

const BanksIndex = () => {
  const { banks, loading } = useContext(BanksContext);
  const banksGroupedByLetter = groupByFirstLetter(banks);

  if (loading) return <div className='py-12'>Loading...</div>;

  return (
    <div className='pt-12'>
      <h2 className='mb-6 text-2xl font-bold text-black'>
        {`Browse carbon bombs projects among ${banks?.length} banks`}
      </h2>
      <div className='container mx-auto px-4 pt-4'>
        {Object.keys(banksGroupedByLetter)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <div className='text-2xl font-bold'>{letter}</div>
              <hr className='mb-2' />
              {banksGroupedByLetter[letter].map((bank, index) => (
                <Link
                  key={index}
                  href={`/banks/${encodeURIComponent(bank.Name)}`}
                  className='mb-1 block cursor-pointer hover:text-blue-500'
                >
                  {bank.Name}
                </Link>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BanksIndex;
