import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ChoiceBubble from './ChoiceBubble'
import {
  Button,
  Paragraph,
  SpeechText,
  Arrow,
  BorderedBox
} from '../global'
import { replaceString, wrapEveryLetter } from '../../stringHelpers'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const Image = styled(BorderedBox)`
  position: absolute;
  top: 31px;
  left: 50%;
  height: 100px;
  width: 40%;
  transform: translatex(-50%);
  background: ${props => props.sprite && `url(${props.sprite}) no-repeat center rgba(255,255,255,.9)`};
  background-size: cover;
`

const Bubble = styled.div`
  position: absolute;
  left: 3%;
  bottom: 2%;
  width: 103%;
  padding: 5px 24px 5px 13px;
  box-sizing: border-box;
  background: rgba(255,255,255,.9);
  border-radius: 14px;
  border: 3px solid #8ce5f5;
  button {
    vertical-align: bottom;
  }
`

// TODO choice window
// TODO success/failure speech

const Speech = ({ pokemon, content, yesNoControl }) => {
  const [currentScreen, changeScreen] = useState(0)
  const areThereAnyScreensLeft = Object.keys(content()).length > currentScreen + 1
  const copy = replaceString(
    content(pokemon.order)[currentScreen],
    [
      { a: '{{POKEMON_NAME}}', b: pokemon.name },
      { a: '{{POKEMON_TYPE}}', b: pokemon.types[1] }
    ]
  )

  const triggerCopyChange = useCallback((forceChange) => {
    if (yesNoControl || forceChange) {
      changeScreen(areThereAnyScreensLeft ? currentScreen + 1 : currentScreen)
    }
  }, [areThereAnyScreensLeft, currentScreen, yesNoControl])

  useEffect(() => {
    triggerCopyChange(yesNoControl)
  }, [triggerCopyChange, yesNoControl])

  return (
    <Wrapper>
      <Image sprite={pokemon.sprite} />
      <Bubble>
        <Button onClick={() => triggerCopyChange(true)}>
          <SpeechText>
            <Paragraph>{wrapEveryLetter(copy)} <Arrow delay={copy.length} key={currentScreen} /></Paragraph>
          </SpeechText>
        </Button>
      </Bubble>
      <ChoiceBubble />
    </Wrapper>
  )
}

Speech.propTypes = {
  pokemon: PropTypes.shape({
    sprite: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  content: PropTypes.func.isRequired,
  arrowControl: PropTypes.object.isRequired,
  yesNoControl: PropTypes.object.isRequired
}

export default Speech
