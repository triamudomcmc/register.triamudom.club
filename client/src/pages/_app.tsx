import React from 'react'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import 'styles/tailwind.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div className="antialiased">
    <SWRConfig
      value={{
        fetcher: (input: RequestInfo) =>
          fetch(input, { credentials: 'include' }).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  </div>
)

export default MyApp
