import React, { useContext } from 'react';
import Link from 'next/link';

import DataContext from '@/modules/contexts/dataContext';

const groupByFirstLetter = (companies) => {
  return companies.reduce((result, company) => {
    const letter = company[0].toUpperCase();
    if (!result[letter]) {
      result[letter] = [];
    }

    result[letter].push(company);
    return result;
  }, {});
};

const CompanyIndex = () => {
  const { data, loading } = useContext(DataContext);
  const { companies = [] } = data;
  const companiesGroupedByLetter = groupByFirstLetter(companies);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='pt-12'>
      <h2 className='mb-6 text-2xl font-bold text-black'>
        {`Browse carbon bombs projects among ${companies?.length} companies`}
      </h2>
      <div className='container mx-auto px-4 pt-4'>
        {Object.keys(companiesGroupedByLetter)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <div className='text-2xl font-bold'>{letter}</div>
              <hr className='mb-2' />
              {companiesGroupedByLetter[letter].map((company) => (
                <Link
                  key={company}
                  href={`/companies/${encodeURIComponent(company)}`}
                  className='mb-1 block cursor-pointer hover:text-blue-500'
                >
                  {company}
                </Link>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CompanyIndex;
