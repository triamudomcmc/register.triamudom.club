import React, { useEffect } from 'react'
import Router from 'next/router'
import useUser from 'components/auth/useUser'
import Head from 'next/head'

const Dashboard = () => {
  const { user, loggedOut } = useUser()

  useEffect(() => {
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
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie || document.cookie.indexOf('auth') === -1) {
                location.replace('/')
              }
            `,
          }}
        />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        Dashboard
      </div>
    </>
  )
}

export default Dashboard
