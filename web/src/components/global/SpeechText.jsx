import styled from '@emotion/styled'

const SpeechText = styled.div`
  > * {
    text-align: left;
    font-family: monospace;
    font-size: 12px;
    color: ${props => props.color ? props.color : 'blue'};
    text-shadow: 1px 1px 1px #ddd;
  }
`

export { SpeechText }
