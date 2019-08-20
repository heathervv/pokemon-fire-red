import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  Button,
  Paragraph,
  SpeechText,
  Arrow,
  BorderedBox
} from './global'

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
    <Button>
      <SpeechText color="#606060" size="14">
        {
          active === 1 ? (
            <Arrow rotate="true" color="#606060" />
          ) : (
            <Box />
          )
        }
        <Paragraph>Yes</Paragraph>
      </SpeechText>
    </Button>
    <Button>
      <SpeechText color="#606060" size="14">
        {
          active === 2 ? (
            <Arrow rotate="true" color="#606060" />
          ) : (
            <Box />
          )
        }
        <Paragraph>No</Paragraph>
      </SpeechText>
    </Button>
  </ChoiceWindow>
  )

ChoiceBubble.propTypes = {
  active: PropTypes.number
}

ChoiceBubble.defaultProps = {
  active: 1
}

export default ChoiceBubble
