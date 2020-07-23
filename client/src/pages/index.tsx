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
          <form onSubmit={handleSubmit} className="mt-6 w-64">
            <input
              type="text"
              name="student_id"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.student_id}
              className="form-input mt-1 block w-full rounded-lg"
              placeholder="เลขประจำตัวนักเรียน"
              aria-required
            />
            <p className="my-2 text-sm text-red-500">
              {errors.student_id && touched.student_id && errors.student_id}
            </p>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="form-input mt-1 block w-full rounded-lg"
              placeholder="รหัสผ่าน"
              aria-required
            />
            <p className="my-2 text-sm text-red-500">
              {errors.password && touched.password && errors.password}
            </p>
            <p className="mt-2 text-sm text-red-500">{error}</p>
            <div className="mt-6 flex flex-row justify-between items-baseline">
              <button
                type="submit"
                disabled={isSubmitting}
                className="focus:outline-none focus:shadow-outline-pink font-bold bg-pink-400 hover:bg-pink-500 transition duration-500 text-white py-2 px-4 rounded-full"
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
