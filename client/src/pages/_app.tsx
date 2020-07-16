import React from 'react'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import 'styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <React.Fragment>
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
