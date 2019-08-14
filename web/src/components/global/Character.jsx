import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const reveal = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Character = styled.span`
  opacity: 0;
  animation: ${reveal} .05s;
  animation-fill-mode: forwards;
  animation-delay: ${props => props.delay && `${50 * props.delay}ms`};
`

export { Character }
