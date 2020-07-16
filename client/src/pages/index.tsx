import React, { useEffect } from 'react'

import { Formik } from 'formik'
import Router from 'next/router'

import { Card } from 'components/Card'
import useUser from 'components/useUser'

export default () => {
  const { user, mutate } = useUser()

  useEffect(() => {
    if (user) {
      Router.replace('/dashboard')
    }
  }, [user])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-lg font-display">
        <div>
          <img src="/assets/logo/logo.png" className="w-64 mx-auto"></img>
        </div>
        <Card>
          <h1 className="text-lg font-bold">เข้าสู่ระบบทะเบียนชมรม</h1>
          <div>
            <Formik
              initialValues={{ student_id: '', password: '' }}
              onSubmit={async (values, actions) => {
                let data: any
                actions.setSubmitting(true)

                try {
                  const res = await fetch(`http://localhost:1323/login`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                    credentials: 'include',
                  })

                  data = await res.json()
                } catch (_) {}

                mutate(data)
                actions.setSubmitting(false)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className="mt-6 w-64">
                  <input
                    type="text"
                    name="student_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.student_id}
                    className="bg-white focus:outline-none focus:shadow-inner border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    placeholder="เลขประจำตัวนักเรียน"
                  />
                  {errors.student_id && touched.student_id && errors.student_id}
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="bg-white focus:outline-none focus:shadow-inner border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-4"
                    placeholder="รหัสผ่าน"
                  />
                  {errors.password && touched.password && errors.password}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 focus:outline-none focus:shadow-outline font-bold bg-pink-400 text-white py-2 px-4 rounded-full"
                  >
                    เข้าสู่ระบบ
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </Card>
      </div>
    </div>
  )
}
