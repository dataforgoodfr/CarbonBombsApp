import * as React from 'react';

import Seo from '@/components/Seo';

import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Seo />
      <main>
        <div className='container mx-auto w-4/5 px-4'>
          {children}
          <footer className='mt-10 border-t py-10 text-center'>
            {/* <div className="flex justify-center space-x-4">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div> */}
            <p className='mt-4'>
              &copy; 2023 CarbonBombs.org - All rights reserved
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
