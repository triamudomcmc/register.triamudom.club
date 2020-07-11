import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { customTheme } from 'design/theme'
import { GlobalStyle } from 'design'
import { SWRConfig } from 'swr'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <React.Fragment>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <GlobalStyle />
      <SWRConfig
        value={{
          fetcher: (input: RequestInfo) =>
            fetch(input, { credentials: 'include' }).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  </React.Fragment>
)

export default MyApp
