import React, { useEffect } from 'react'
import Router from 'next/router'
import useUser from 'components/useUser'
import { Card } from 'components/Card'

export default () => {
  const { user, loading, loggedOut, mutate } = useUser()

  useEffect(() => {
    if (loggedOut) {
      Router.replace('/')
    }
  }, [loggedOut])

  if (loggedOut) return 'Redirecting...'

  return (
    <div>
      <div>
        <div>
          <Card>
            <div>
              <p>
                {user?.Title}
                {user?.FirstName} {user?.LastName} ห้อง {user?.Room}
              </p>
              <p>ได้ลงทะเบียนเรียนกิจกรรมชมรมในปีการศึกษา 2563 แล้ว คือ</p>
              <p>{user?.ClubID}</p>
              <p>กรุณาถ่ายภาพหน้าจอเพื่อเก็บไว้เป็นหลักฐาน</p>
              <p>ขอให้นักเรียนมีความสุขในการเข้าร่วมกิจกรรมชมรม</p>
            </div>
          </Card>
        </div>
        <div>
          <button
            onClick={async () => {
              try {
                await fetch(`http://localhost:1323/logout`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                })
              } catch (_) {
                window.location.reload()
              }

              mutate(null) // optimistically update the data and revalidate
              Router.replace('/')
            }}
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  )
}
