import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Router from 'next/router'

import useUser from 'components/useUser'
import { AuthLayout } from 'components/AuthLayout'

export default () => {
  const { user, mutate } = useUser()
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      Router.replace('/dashboard')
    }
  }, [user])

  return (
    <AuthLayout title="เข้าสู่ระบบลงทะเบียนชมรม">
      <Formik
        initialValues={{ student_id: '', password: '' }}
        validationSchema={Yup.object({
          student_id: Yup.string()
            .length(5, 'โปรดใส่เลข 5 หลัก')
            .required('โปรดกรอกเลขประจำตัวนักเรียน'),
          password: Yup.string().required('โปรดกรอกรหัสผ่าน'),
        })}
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

            if (data === 'Unauthorized') {
              setError('ชื่อผู้ใช้กับรหัสผ่านไม่ตรงกัน')
            }
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
          <form onSubmit={handleSubmit} className="mt-4 w-64">
            <div>
              <label
                htmlFor="student_id"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                เลขประจำตัวนักเรียน
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="student_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.student_id}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              <p className="my-2 text-sm text-red-500">
                {errors.student_id && touched.student_id && errors.student_id}
              </p>
            </div>

            <div className="mt-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                รหัสผ่าน
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
              <p className="my-2 text-sm text-red-500">
                {errors.password && touched.password && errors.password}
              </p>
            </div>

            <p className="mt-2 text-sm text-red-500">{error}</p>
            <div className="mt-6 flex flex-row justify-between items-baseline">
              <button
                type="submit"
                disabled={isSubmitting}
                className="focus:outline-none focus:shadow-outline-pink font-bold bg-pink-500 hover:bg-pink-400 transition duration-500 text-white py-2 px-4 rounded-full"
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
