import React, { useEffect } from 'react'
import Router from 'next/router'
import { Text, Button, Flex, Box } from '@chakra-ui/core'
import useUser from 'components/useUser'
import { PageLayout } from 'components/Layout'
import { Card } from 'components/Card'

export default () => {
  const { user, loading, loggedOut, mutate } = useUser()

  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    if (loggedOut) {
      Router.replace('/')
    }
  }, [loggedOut])

  if (loggedOut) return 'Redirecting...'

  return (
    <PageLayout>
      <Flex align="center" justify="center" flexGrow={1}>
        <Flex direction="column" maxW={900}>
          <Flex>
            <Card>
              <Box fontSize="lg" textAlign="center" fontWeight={600}>
                <Text fontFamily="heading">
                  {user?.Title}
                  {user?.FirstName} {user?.LastName} ห้อง {user?.Room}
                </Text>
                <Text fontFamily="heading">
                  ได้ลงทะเบียนเรียนกิจกรรมชมรมในปีการศึกษา 2563 แล้ว คือ
                </Text>
                <Text
                  fontWeight={700}
                  fontFamily="heading"
                  fontSize="2xl"
                  my={4}
                >
                  {user?.ClubID}
                </Text>
                <Text fontFamily="heading">
                  กรุณาถ่ายภาพหน้าจอเพื่อเก็บไว้เป็นหลักฐาน
                </Text>
                <Text fontFamily="heading">
                  ขอให้นักเรียนมีความสุขในการเข้าร่วมกิจกรรมชมรม
                </Text>
              </Box>
            </Card>
          </Flex>
          <Flex justify="flex-end" width="100%">
            <Button
              fontFamily="heading"
              mt={4}
              onClick={async () => {
                try {
                  await fetch(`http://localhost:1323/logout`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                  })
                } catch (_) {
                  window.location.reload()
                }

                mutate(null) // optimistically update the data and revalidate
                Router.replace('/')
              }}
            >
              ออกจากระบบ
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </PageLayout>
  )
}
