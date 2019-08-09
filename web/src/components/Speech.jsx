import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Button, Paragraph } from './global'
import { choosingStarters } from '../content'
import { replaceString } from '../helpers'

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const Image = styled.div`
  position: absolute;
  top: 31px;
  left: 50%;
  height: 100px;
  width: 40%;
  box-sizing: border-box;
  border-radius: 3px;
  border: 3px solid #322975;
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
  p {
    text-align: left;
    font-family: monospace;
    font-size: 12px;
    color: blue;
    text-shadow: 1px 1px 1px #ddd;
  }
`

const Arrow = styled.span`
  position: relative;
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #222;

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 7px solid red;
    transform: translate(-8px, -8px);
  }
`

// TODO text writing animation
// TODO choice window
// TODO success/failure speech

const Speech = ({ pokemon }) => {
  const [currentScreen, changeScreen] = useState(0)
  const copy = choosingStarters(pokemon.order)[currentScreen]

  return (
    <Wrapper>
      <Image sprite={pokemon.sprite} />
      <Bubble>
        <Button onClick={() => changeScreen(currentScreen + 1)}>
          <Paragraph>
            {
              replaceString(
                copy,
                [
                  { a: '{{POKEMON_NAME}}', b: pokemon.name },
                  { a: '{{POKEMON_TYPE}}', b: pokemon.types[1] }
                ]
              )
            } <Arrow />
          </Paragraph>
        </Button>
      </Bubble>
    </Wrapper>
  )
}

Speech.propTypes = {
  pokemon: PropTypes.shape({
    sprite: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default Speech
