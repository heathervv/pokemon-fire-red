import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Paragraph } from './global'

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
  color: blue;
  font-family: monospace;
  text-shadow: 1px 1px 1px #ddd;
  .name {
    text-transform: uppercase;
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

// TODO confirmation speech
// TODO choice window
// TODO success/failure speech
// TODO Randomize text per pokemon

const Speech = ({ pokemon }) => {
  return (
    <Wrapper>
      <Image sprite={pokemon.sprite} />
      <Bubble>
        <Paragraph>I see! <span className="name">{pokemon.name}</span> is your choice. It's very easy to raise. <Arrow /></Paragraph>
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
