import useSWR from 'swr'

export default function useUser() {
  const { data, mutate, error } = useSWR('http://localhost:1323/user', {
    initialData: undefined,
  })

  const loading = !data && !error
  const loggedOut = data === 'Unauthorized'

  return {
    loading,
    loggedOut,
    user: loggedOut ? null : data,
    mutate,
  }
}
