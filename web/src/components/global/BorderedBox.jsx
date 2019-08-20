import styled from '@emotion/styled'

const BorderedBox = styled.div`
  box-sizing: border-box;
  border-radius: 3px;
  border: ${props => props.border ? `3px solid ${props.border}` : '3px solid #322975'};
  background: rgba(255,255,255,.9);
`

export { BorderedBox }
