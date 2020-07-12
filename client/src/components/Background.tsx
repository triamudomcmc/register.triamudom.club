import React from 'react'
import styled from '@emotion/styled'
import { Box } from '@chakra-ui/core'

const Bg = styled.div`
  height: 100%;
  filter: blur(0.75em);
  transform: scale(1.1);
  picture {
    height: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`

const bgSrcSet = [
  '/assets/background/bg500.jpg 500w',
  '/assets/background/bg1378.jpg 1378w',
  '/assets/background/bg1971.jpg 1971w',
  '/assets/background/bg2453.jpg 2453w',
  '/assets/background/bg2903.jpg 2903w',
  '/assets/background/bg3307.jpg 3307w',
  '/assets/background/bg3675.jpg 3675w',
  '/assets/background/bg4026.jpg 4026w',
  '/assets/background/bg4356.jpg 4356w',
  '/assets/background/bg4477.jpg 4477w',
]

const getBgSrc = (src: String[]): string => {
  return src.join(', ')
}
export const Background = () => (
  <Box
    zIndex={-9999}
    width="100vw"
    height="100%"
    overflow="hidden"
    position="fixed"
    objectFit="cover"
  >
    <Bg>
      <picture>
        <source srcSet="/assets/background/bg.webp" type="image/webp" />
        <source
          sizes="(max-width: 4477px) 100vw, 4477px"
          srcSet={getBgSrc(bgSrcSet)}
          src="/assets/background/bg.jpg"
          type="image/jpeg"
        />
        <img
          loading="eager"
          decoding="async"
          srcSet={getBgSrc(bgSrcSet)}
          src="/assets/background/bg.jpg"
          alt="background"
          sizes="(max-width: 4477px) 100vw, 4477px"
        />
      </picture>
    </Bg>
  </Box>
)
