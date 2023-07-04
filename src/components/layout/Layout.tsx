import * as React from 'react';

import Seo from '@/components/Seo';

import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Seo />
      <main className='bg-gray-100'>
        <div className='container mx-auto w-4/5 px-4'>
          {children}
          <footer className='mt-10 border-t py-10 text-center'>
            {/* <div className="flex justify-center space-x-4">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div> */}
            <div className='text-bold mb-4'>Data sources</div>
            <div className='w-full text-sm'>
              <div className='mb-2'>
                <div>
                  Global Oil and Gas Extraction Tracker, Global Energy Monitor,
                  February 2023
                </div>
                <a
                  className='text-blue-700'
                  href='https://globalenergymonitor.org/creative-commons-public-license/'
                >
                  https://globalenergymonitor.org/creative-commons-public-license/
                </a>
              </div>
              <div className='mb-2'>
                <div>
                  Global Coal Mine Tracker, Global Energy Monitor, April 2023
                  release
                </div>
                <a
                  className='text-blue-700'
                  href='https://globalenergymonitor.org/creative-commons-public-license/'
                >
                  https://globalenergymonitor.org/creative-commons-public-license/
                </a>
              </div>
              <div className='mb-2'>
                <div>
                  "Carbon Bombs" - Mapping key fossil fuel projects, Kuhne and
                  co-authors, 2022, Energy Policy
                </div>
                <a
                  className='text-blue-700'
                  href='https://www.sciencedirect.com/science/article/pii/S0301421522001756'
                >
                  https://www.sciencedirect.com/science/article/pii/S0301421522001756
                </a>
              </div>
              <div className='mb-2'>
                <div>Banking on Climate Chaos database, 2022</div>
                <a
                  className='text-blue-700'
                  href='https://www.bankingonclimatechaos.org/'
                >
                  https://www.bankingonclimatechaos.org/
                </a>
              </div>
            </div>
            <p className='mt-4'>
              &copy; 2023 CarbonBombs.org - All rights reserved
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
