import React from 'react'
import { AppProps } from 'next/app'

import 'styles/tailwind.css'
import { UIProvider } from 'components/ui/context'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <UIProvider>
    <div className="antialiased">
      <Component {...pageProps} />
    </div>
  </UIProvider>
)

export default MyApp
