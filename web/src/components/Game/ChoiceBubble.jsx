import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  Paragraph,
  SpeechText,
  Arrow,
  BorderedBox
} from '../global'

const ChoiceWindow = styled(BorderedBox)`
  position: absolute;
  right: 3px;
  bottom: 55px;
  width: 80px;
  padding: 8px;

  button {
    display: block;
    text-transform: uppercase;
    width: 100%;
    text-align: left;
  }
`

const Box = styled.span`
  display: inline-block;
  width: 7px;
  height: 12px;
`

const ChoiceBubble = ({ active }) => (
  <ChoiceWindow>
    <SpeechText color="#606060" size="14">
      {
        active === 0 ? (
          <Arrow rotate="true" color="#606060" />
        ) : (
          <Box />
        )
      }
      <Paragraph>Yes</Paragraph>
    </SpeechText>
    <SpeechText color="#606060" size="14">
      {
        active === 1 ? (
          <Arrow rotate="true" color="#606060" />
        ) : (
          <Box />
        )
      }
      <Paragraph>No</Paragraph>
    </SpeechText>
  </ChoiceWindow>
  )

ChoiceBubble.propTypes = {
  active: PropTypes.number
}

ChoiceBubble.defaultProps = {
  active: 0
}

export default ChoiceBubble
