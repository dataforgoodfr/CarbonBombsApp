import * as React from 'react';
import Footer from '@/components/layout/Footer';

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
          <Footer />
        </div>
      </main>
    </>
  );
}
