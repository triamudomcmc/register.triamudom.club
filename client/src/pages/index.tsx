import React, { useEffect, useState } from 'react'
import Link from 'components/ui/Link'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Router from 'next/router'

import useUser from 'components/auth/useUser'
import { AuthLayout } from 'components/auth/AuthLayout'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'

const Index = () => {
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
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/login`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include',
              }
            )

            data = await res.json()

            if (data.errors.body === 'Unauthorized') {
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
          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            <div>
              <label
                htmlFor="student_id"
                className="block text-sm font-medium text-gray-700"
              >
                เลขประจำตัวนักเรียน
              </label>
              <div className="mt-1">
                <Input
                  id="student_id"
                  type="text"
                  name="student_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.student_id}
                  required
                />
              </div>
              <p className="my-2 text-sm text-red-500">
                {errors.student_id && touched.student_id && errors.student_id}
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                รหัสผ่าน
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  required
                />
              </div>
              <p className="my-2 text-sm text-red-500">
                {errors.password && touched.password && errors.password}
              </p>
            </div>

            <p className="mt-2 text-sm text-red-500">{error}</p>
            <div className="mt-6 flex flex-row justify-between items-baseline">
              <Button type="submit" disabled={isSubmitting}>
                เข้าสู่ระบบ
              </Button>
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

export default Index
