import useSWR from 'swr'
import { fetcherWithToken } from 'libs/fetch'

export default function useUser() {
  const { data, mutate, error } = useSWR(
    'http://localhost:1323/user',
    fetcherWithToken,
    {
      initialData: undefined,
    }
  )

  const loading = !data && !error
  const loggedOut = data?.errors?.body === 'Unauthorized'

  return {
    loading,
    loggedOut,
    user: loggedOut ? null : data,
    mutate,
  }
}
