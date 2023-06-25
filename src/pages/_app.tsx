import { AppProps } from 'next/app';
import { DataProvider } from '@/modules/contexts/dataContext';
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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </DataProvider>
);

export default App;
