import { AppProps } from 'next/app';
import { DataProvider } from '@/modules/contexts/dataContext';
import { BanksProvider } from '@/modules/contexts/banksContext';
import { CompaniesProvider } from '@/modules/contexts/companiesContext';
import { CarbonBombsProvider } from '@/modules/contexts/carbonBombsContext';
import '@fontsource/inter';
import '@fontsource/poppins';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Layout from '@/components/layout/Layout';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const App = ({ Component, pageProps }: AppProps) => (
  <DataProvider>
    <BanksProvider>
      <CompaniesProvider>
        <CarbonBombsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CarbonBombsProvider>
      </CompaniesProvider>
    </BanksProvider>
  </DataProvider>
);

export default App;
