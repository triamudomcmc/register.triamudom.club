import React from 'react'
import Head from 'next/head'

import useUser from 'components/auth/useUser'
import Card from 'components/ui/Card'
import Button from 'components/ui/Button'
import { logout } from 'utils/auth'

const Done = () => {
  const { user, mutate } = useUser()

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
        <div className="max-w-screen-lg text-lg font-display">
          <Card>
            <div className="text-center">
              <p>
                {user?.Title}
                {user?.FirstName} {user?.LastName} ห้อง {user?.Room}
              </p>
              <p>ได้ลงทะเบียนเรียนกิจกรรมชมรมในปีการศึกษา 2563 แล้ว คือ</p>
              <p className="my-4 text-2xl font-bold">
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
                await logout(mutate)
              }}
            >
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Done
