import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BaseContainer } from '@/components';
import React, { useEffect } from 'react';
import theme from '@/theme';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Innerspace</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <BaseContainer>
          <Component { ...pageProps } />
        </BaseContainer>
      </ThemeProvider>
    </React.Fragment>
  );
};
