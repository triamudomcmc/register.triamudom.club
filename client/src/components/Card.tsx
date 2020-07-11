import { Box } from '@chakra-ui/core'

export const Card = ({ children, ...restProps }) => (
  <Box
    boxShadow="0 5px 10px rgba(0, 0, 0, 0.12)"
    p={8}
    mt="24px"
    borderRadius="8px"
    backgroundColor="white"
    {...restProps}
  >
    {children}
  </Box>
)
