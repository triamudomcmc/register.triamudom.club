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
      <form onSubmit={handleSubmit} className="mt-4 w-64">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            ชื่อจริง
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <p className="my-2 text-sm text-red-500">
            {errors.firstName && touched.firstName && errors.firstName}
          </p>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            นามสกุล
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <p className="my-2 text-sm text-red-500">
            {errors.lastName && touched.lastName && errors.lastName}
          </p>
        </div>

        <div>
          <label
            htmlFor="studentID"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            เลขประจำตัวนักเรียน
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="studentID"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.studentID}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <p className="my-2 text-sm text-red-500">
            {errors.studentID && touched.studentID && errors.studentID}
          </p>
        </div>

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

        <div>
          <label
            htmlFor="room"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            ห้อง
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="room"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.room}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <p className="my-2 text-sm text-red-500">
            {errors.room && touched.room && errors.room}
          </p>
        </div>

        <div>
          <label
            htmlFor="number"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            เลขที่
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.number}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <p className="my-2 text-sm text-red-500">
            {errors.number && touched.number && errors.number}
          </p>
        </div>

        <div>
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
  const { user } = useUser()
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
