import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import Layout from '../components/layout/Layout';
import theme from '@/styles/theme';
import './app.css';

import type { AppProps } from 'next/app';
import store from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  const { marginTop, title, ...restPageProps } = pageProps;

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...restPageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
