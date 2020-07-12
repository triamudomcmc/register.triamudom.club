import React from 'react'

import { Flex } from '@chakra-ui/core'

import { Background } from './Background'

export const PageLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Background />
      <Flex direction="column" minHeight="100vh">
        <Flex as="main" flex="auto" direction="column">
          {children}
        </Flex>
      </Flex>
    </React.Fragment>
  )
}
