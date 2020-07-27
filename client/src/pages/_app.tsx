import React from 'react'
import { AppProps } from 'next/app'

import 'styles/tailwind.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div className="antialiased">
    <Component {...pageProps} />
  </div>
)

export default MyApp
