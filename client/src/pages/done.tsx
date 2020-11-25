import React, { useEffect } from 'react'
import Router from 'next/router'

import useUser from 'components/auth/useUser'
import Card from 'components/ui/Card'
import { fetcherWithToken } from 'libs/fetch'
import Button from 'components/ui/Button'

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
            <p className="my-4 font-bold text-2xl">
              ชมรมคอมพิวเตอร์ ({user?.ClubID})
            </p>
            <p>กรุณาถ่ายภาพหน้าจอเพื่อเก็บไว้เป็นหลักฐาน</p>
            <p>ขอให้นักเรียนมีความสุขในการเข้าร่วมกิจกรรมชมรม</p>
          </div>
        </Card>
        <div className="mt-4 text-right">
          <Button
            type="button"
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
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Done
