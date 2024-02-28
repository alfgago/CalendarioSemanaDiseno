
import { useEffect } from 'react';

import type { AppProps, AppContext, AppInitialProps } from 'next/app';

import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { queryClient } from '@/utils';

import '@/styles/fonts/stylesheet.css';
import '@/styles/styles.scss';
import 'aos/dist/aos.css';
 
import { Layout, Meta } from '@/components';
import AOS from 'aos';
import { fetchData } from './api/data';
import { parseEvents } from '@/utils/parseData';
import { contextData } from '../context/context';

function App({ Component, pageProps}: AppProps) {

  useEffect(() => {
    setTimeout(function () { AOS.init(); }, 1000);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <contextData.Provider value={pageProps.parseData}>
        <Meta />
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps } />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={true} />
      </contextData.Provider>
    </QueryClientProvider>
  );
}

App.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
  
  const data = await fetchData('Eventos', 380);
  const parseData = parseEvents(data);

  const pageProps = (await appContext.Component.getInitialProps?.(appContext.ctx));
  
  return { pageProps: { ...pageProps, parseData } };
}

export default App;
