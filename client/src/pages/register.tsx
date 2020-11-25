import React, { useEffect, useState } from 'react'

import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import Router from 'next/router'

import useUser from 'components/auth/useUser'
import { AuthLayout } from 'components/auth/AuthLayout'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import Link from 'components/ui/Link'
import Modal from 'components/ui/Modal'
import { useUI } from 'components/ui/context'

/**
 * @todo Add Terms and Conditions
 * @body Generate HTML from official document (WIP)
 */
const RegisterForm = ({ setError, error, setStatus }) => {
  const { displayModal, closeModal, openModal } = useUI()

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        studentID: '',
        password: '',
        room: '',
        number: '',
        level: '',
        tos: false,
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
        tos: Yup.bool().oneOf([true], 'โปรดอ่านและยินยอมเงื่อนไขการใช้งาน'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        let data: any
        setSubmitting(true)

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/register`,
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
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              ชื่อจริง
            </label>
            <div className="mt-1">
              <Input
                id="firstName"
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                required
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
            <div className="mt-1">
              <Input
                id="lastName"
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                required
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
            <div className="mt-1">
              <Input
                id="studentID"
                type="text"
                name="studentID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.studentID}
                required
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
            <div className="mt-1">
              <Input
                id="room"
                type="text"
                name="room"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.room}
                required
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
            <div className="mt-1">
              <Input
                id="number"
                type="text"
                name="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.number}
                required
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

          <div>
            <div className="flex items-center mt-4">
              <input
                id="tos"
                name="tos"
                type="checkbox"
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label
                className="block ml-2 text-sm text-gray-900"
                onClick={openModal}
              >
                ยอมรับข้อตกลงและเงื่อนไขการใช้งาน
              </label>
            </div>

            <Modal open={displayModal} onClose={closeModal}>
              <div>
                <div className="w-full p-4 overflow-y-scroll h-96"></div>
                <Button onClick={closeModal} className="mt-8">
                  อ่านแล้ว
                </Button>
              </div>
            </Modal>

            <p className="my-2 text-sm text-red-500">
              {errors.tos && touched.tos && errors.tos}
            </p>
          </div>

          <p className="mt-2 text-sm text-red-500">{error}</p>

          <div className="flex flex-row items-baseline justify-between mt-6">
            <Button type="submit" disabled={isSubmitting}>
              ลงทะเบียน
            </Button>
            <Link href="/">
              <a className="text-gray-600">เข้าสู่ระบบ</a>
            </Link>
          </div>
        </form>
      )}
    </Formik>
  )
}

const Register = () => {
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
              <a className="px-4 py-2 font-bold text-white transition duration-500 bg-pink-400 rounded-full focus:outline-none focus:ring hover:bg-pink-500">
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

export default Register
