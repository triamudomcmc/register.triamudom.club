import React, { useEffect } from 'react'
import Router from 'next/router'

import useUser from 'components/useUser'
import { Card } from 'components/Card'
import { fetcherWithToken } from 'libs/fetch'

const Done = () => {
  const { user, loggedOut, mutate } = useUser()

  useEffect(() => {
    if (loggedOut) {
      Router.replace('/')
    }
  }, [loggedOut])

  if (loggedOut) return 'Redirecting...'
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-screen-lg font-display text-lg">
        <Card>
          <div className="text-center">
            <p>
              {user?.Title}
              {user?.FirstName} {user?.LastName} ห้อง {user?.Room}
            </p>
            <p>ได้ลงทะเบียนเรียนกิจกรรมชมรมในปีการศึกษา 2563 แล้ว คือ</p>
            <p className="my-4 font-semibold text-2xl">
              ชมรมคอมพิวเตอร์ ({user?.ClubID})
            </p>
            <p>กรุณาถ่ายภาพหน้าจอเพื่อเก็บไว้เป็นหลักฐาน</p>
            <p>ขอให้นักเรียนมีความสุขในการเข้าร่วมกิจกรรมชมรม</p>
          </div>
        </Card>
        <div className="mt-4 text-right">
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-pink-500 hover:bg-pink-400 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition ease-in-out duration-150"
              onClick={async () => {
                try {
                  await fetcherWithToken(
                    `${process.env.NEXT_PUBLIC_API_URL}/logout`,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  )
                } catch (_) {
                  window.location.reload()
                }

                mutate(null)
                Router.replace('/')
              }}
            >
              ออกจากระบบ
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Done
