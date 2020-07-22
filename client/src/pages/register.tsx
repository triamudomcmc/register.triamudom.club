import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import Router from 'next/router'

import useUser from 'components/useUser'
import { AuthLayout } from 'components/AuthLayout'

const RegisterForm = ({ setError, error, setStatus }) => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      studentID: '',
      password: '',
      room: '',
      number: '',
      level: '',
    }}
    validationSchema={Yup.object({
      firstName: Yup.string().required('โปรดกรอกชื่อจริง'),
      lastName: Yup.string().required('โปรดกรอกนามสกุล'),
      studentID: Yup.string()
        .length(5, 'โปรดใส่เลข 5 หลัก')
        .required('โปรดกรอกเลขประจำตัวนักเรียน'),
      password: Yup.string().required('โปรดกรอกรหัสผ่าน'),
      room: Yup.number()
        .min(1, 'เลขห้องเรียนต้องมากกว่า 1')
        .max(999, 'เลขห้องเรียนต้องน้อยกว่า 999')
        .required('โปรดกรอกห้อง'),
      number: Yup.number()
        .lessThan(50, 'โปรดกรอกเลขที่ต่ำกว่า 50')
        .required('โปรดกรอกเลขที่'),
      level: Yup.number().required('โปรดเลือกระดับชั้น'),
    })}
    onSubmit={async (values, { setSubmitting }) => {
      let data: any
      setSubmitting(true)

      console.log(values)

      try {
        const res = await fetch(`http://localhost:1323/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        })

        data = await res.json()

        console.log(data)
        setStatus(data)

        if (data === 'Unauthorized') {
          setError('ไม่พบผู้ใช้งาน')
        }
      } catch (_) {}

      setSubmitting(false)
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
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          className="form-input mt-1 block w-full rounded-lg"
          placeholder="ชื่อ"
          aria-required
        />
        <p className="my-2 text-sm text-red-500">
          {errors.firstName && touched.firstName && errors.firstName}
        </p>

        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          className="form-input mt-1 block w-full rounded-lg"
          placeholder="นามสกุล"
          aria-required
        />
        <p className="my-2 text-sm text-red-500">
          {errors.lastName && touched.lastName && errors.lastName}
        </p>

        <input
          type="text"
          name="studentID"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.studentID}
          className="form-input mt-1 block w-full rounded-lg"
          placeholder="เลขประจำตัวนักเรียน"
          aria-required
        />
        <p className="my-2 text-sm text-red-500">
          {errors.studentID && touched.studentID && errors.studentID}
        </p>

        <div className="my-4">
          <span className="text-gray-700">ระดับชั้น</span>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <Field
                type="radio"
                name="level"
                value="4"
                className="form-radio"
              />
              <span className="ml-2">ม.4</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <Field
                type="radio"
                name="level"
                value="5"
                className="form-radio"
              />
              <span className="ml-2">ม.5</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <Field
                type="radio"
                name="level"
                value="6"
                className="form-radio"
              />
              <span className="ml-2">ม.6</span>
            </label>
          </div>
        </div>

        <input
          type="text"
          name="room"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.room}
          className="form-input mt-1 block w-full rounded-lg"
          placeholder="ห้อง"
          aria-required
        />
        <p className="my-2 text-sm text-red-500">
          {errors.room && touched.room && errors.room}
        </p>

        <input
          type="text"
          name="number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.number}
          className="form-input mt-1 block w-full rounded-lg"
          placeholder="เลขที่"
          aria-required
        />
        <p className="my-2 text-sm text-red-500">
          {errors.number && touched.number && errors.number}
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
            className="focus:outline-none focus:shadow-outline font-bold bg-pink-400 hover:bg-pink-500 transition duration-500 text-white py-2 px-4 rounded-full"
          >
            ลงทะเบียน
          </button>
          <Link href="/">
            <a className="text-gray-600">เข้าสู่ระบบ</a>
          </Link>
        </div>
      </form>
    )}
  </Formik>
)

export default () => {
  const { user, mutate } = useUser()
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (user) {
      Router.replace('/dashboard')
    }
  }, [user])

  return (
    <AuthLayout title="ยืนยันตัวตนและตั้งรหัสผ่าน">
      {status === 'Success' ? (
        <div className="mt-2 text-center">
          <p>นักเรียนได้ทำการยืนยันและตั้งรหัสผ่านในระบบลงทะเบียนชมรมแล้ว</p>
          <div className="mt-8">
            <Link href="/">
              <a className="focus:outline-none focus:shadow-outline font-bold bg-pink-400 hover:bg-pink-500 transition duration-500 text-white py-2 px-4 rounded-full">
                เข้าสู่ระบบ
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <RegisterForm error={error} setError={setError} setStatus={setStatus} />
      )}
    </AuthLayout>
  )
}
