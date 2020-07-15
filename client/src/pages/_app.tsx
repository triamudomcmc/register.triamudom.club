import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'

import 'styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <React.Fragment>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>

    <SWRConfig
      value={{
        fetcher: (input: RequestInfo) =>
          fetch(input, { credentials: 'include' }).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  </React.Fragment>
)

export default MyApp
