import { fetcherWithToken } from 'libs/fetch'
import Router  from 'next/router'

export const logout = async (mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>) => {
    try {
      await fetcherWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      Router.replace('/')
    } catch (_) {
      window.location.reload()
    }

    mutate(null)
}