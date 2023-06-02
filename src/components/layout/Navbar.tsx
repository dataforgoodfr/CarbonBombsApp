import * as React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-3 shadow-xl px-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight">CarbonBombs.org</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:items-center pr-12">
        <div className="text-sm">
          <a href="#map" className="block lg:inline-block text-black hover:text-gray-500 mr-4">
            Map
          </a>
          <a href="#data" className="block lg:inline-block text-black hover:text-gray-500 mr-4">
            Data
          </a>
          <a href="#about" className="block lg:inline-block text-black hover:text-gray-500 mr-4">
            About
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
