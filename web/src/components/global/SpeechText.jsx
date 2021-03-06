import styled from '@emotion/styled'

const SpeechText = styled.div`
  > * {
    display: inline-block;
    text-align: left;
    font-family: monospace;
    font-size: ${props => props.size ? `${props.size}px` : '12px'};
    color: ${props => props.color ? props.color : 'blue'};
    font-weight: ${props => props.bold ? '800' : '400'};
    text-shadow: 1px 1px 1px #ddd;
  }
`

export { SpeechText }
