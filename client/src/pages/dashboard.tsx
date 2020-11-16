import React, { useEffect } from 'react'
import Router from 'next/router'
import useUser from 'components/useUser'
import { Card } from 'components/Card'
import { fetcherWithToken } from 'libs/fetch'

const Dashboard = () => {
  const { user, loading, loggedOut, mutate } = useUser()

  useEffect(() => {
    console.log(user)
    if (user?.ClubID) {
      Router.replace('/done')
    }
  }, [user])

  useEffect(() => {
    if (loggedOut) {
      Router.replace('/')
    }
  }, [loggedOut])

  if (loggedOut) return 'Redirecting...'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      Dashboard
    </div>
  )
}

export default Dashboard
