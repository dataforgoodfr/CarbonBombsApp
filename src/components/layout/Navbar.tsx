import Link from 'next/link';
import * as React from 'react';

const Navbar = () => {
  return (
    <nav className='sticky left-0 top-0 z-[9999] flex flex-wrap items-center justify-between bg-white bg-white p-3 px-6 shadow-xl'>
      <div className='mr-6 flex flex-shrink-0 items-center justify-center text-black'>
        <Link href='/' className='text-xl font-semibold tracking-tight'>
          Carbon Bombs
        </Link>
        <Link
          href='/'
          className='ml-4 block text-black hover:text-gray-500 lg:inline-block'
        >
          Home
        </Link>
      </div>

      <div className='block lg:hidden'>
        <button className='flex items-center rounded border border-black px-3 py-2 text-black hover:border-black hover:text-black'>
          <svg
            className='h-3 w-3 fill-current'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z' />
          </svg>
        </button>
      </div>
      <div className='hidden pr-12 lg:flex lg:items-center'>
        <div>
          <Link
            href='faq'
            className='mr-4 block text-black hover:text-gray-500 lg:inline-block'
          >
            FAQ
          </Link>
          <Link
            href='banks'
            className='mr-4 block text-black hover:text-gray-500 lg:inline-block'
          >
            Banks involved
          </Link>
          <Link
            href='companies'
            className='mr-4 block text-black hover:text-gray-500 lg:inline-block'
          >
            Companies involved
          </Link>
          <a
            className='mr-4'
            target="_blank"
            href='https://github.com/dataforgoodfr/CarbonBombs/raw/main/data_cleaned/carbon_bombs_all_datasets.xlsx'
            download
          >
            Download Data
          </a>
          {/* <a
            href='#map'
            className='mr-4 block text-black hover:text-gray-500 lg:inline-block'
          >
            Map
          </a>
          <a
            href='#data'
            className='mr-4 block text-black hover:text-gray-500 lg:inline-block'
          >
            Data
          </a>
          <a
            href='#about'
            className='mr-4 block text-black hover:text-gray-500 lg:inline-block'
          >
            About
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
