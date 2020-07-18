import React, { useEffect } from 'react'
import Link from 'next/link'

import { Formik } from 'formik'
import Router from 'next/router'

import useUser from 'components/useUser'
import { AuthLayout } from 'components/AuthLayout'

export default () => {
  const { user, mutate } = useUser()

  useEffect(() => {
    if (user) {
      Router.replace('/dashboard')
    }
  }, [user])

  return (
    <AuthLayout title="เข้าสู่ระบบลงทะเบียนชมรม">
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
            <div className="mt-6 flex flex-row justify-between items-baseline">
              <button
                type="submit"
                disabled={isSubmitting}
                className="focus:outline-none focus:shadow-outline font-bold bg-pink-400 hover:bg-pink-500 transition duration-500 text-white py-2 px-4 rounded-full"
              >
                เข้าสู่ระบบ
              </button>
              <Link href="/register">
                <a className="text-gray-600">ตั้งรหัสผ่าน</a>
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </AuthLayout>
  )
}
