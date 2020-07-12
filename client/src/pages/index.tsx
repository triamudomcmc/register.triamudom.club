import React, { useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/core'
import { Formik, Field } from 'formik'
import Router from 'next/router'

import { Card } from 'components/Card'
import useUser from 'components/useUser'
import { PageLayout } from 'components/Layout'

export default () => {
  const { user, mutate } = useUser()

  useEffect(() => {
    if (user) {
      Router.replace('/dashboard')
    }
  }, [user])

  return (
    <PageLayout>
      <Flex align="center" justify="center" flexGrow={1}>
        <Box py={[8, 0]} px={[4, 0]}>
          <Box mx="auto" textAlign="center">
            <Heading fontSize={['2xl', '3xl']} color="white">
              โรงเรียนเตรียมอุดมศึกษา
            </Heading>
          </Box>
          <Card>
            <Heading size="md">เข้าสู่ระบบทะเบียนชมรม</Heading>
            <Box mt={2} fontFamily="heading">
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
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <Field name="student_id">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.student_id && form.touched.student_id
                          }
                        >
                          <FormLabel htmlFor="student_id">
                            เลขประจำตัวนักเรียน
                          </FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              children={<Icon name="edit" color="gray.300" />}
                            />
                            <Input {...field} id="student_id" />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.student_id}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          mt={4}
                        >
                          <FormLabel htmlFor="password">รหัสผ่าน</FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              children={<Icon name="edit" color="gray.300" />}
                            />
                            <Input {...field} id="password" type="password" />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={4}
                      variantColor="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      width="100%"
                      fontFamily="heading"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </Card>
        </Box>
      </Flex>
    </PageLayout>
  )
}
