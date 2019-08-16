/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import background from'../images/person_sprite.png';

const PlayerMap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const Sprite = styled.div`
  width: 15px;
  height: 19px;
  background: ${props => props.direction && `url(${background}) -198px ${props.direction}px`};
  background-size: 260px;
  transform: ${props => props.location && `translate(${props.location[0]}px, ${props.location[1]}px)`};
  transition: transform .2s ease-in-out;
`

const DIRECTIONS = {
  UP: {
    sprite: -97,
    animate: [0, -10]
  },
  DOWN: {
    sprite: -10,
    animate: [0, 10]
  },
  LEFT: {
    sprite: -39,
    animate: [-10, 0]
  },
  RIGHT: {
    sprite: -68,
    animate: [10, 0]
  }
}

const Player = ({ move }) => {
  const [initialized, changeInitialization] = useState(false)
  const [position, moveCharacter] = useState([137, 223])

  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        moveCharacter([position[0], 193])
        changeInitialization(true)
      }, 500)
    }
  }, [initialized])

  useEffect(() => {
    DIRECTIONS[move.direction].animate.map((number, i) => {
      // Only move in one direction
      if (number !== 0) {
        const newPosition = [...position]
        newPosition[i] = position[i] + number

        // Prevent sprite from going off screen
        const isStillOnScreen =
          newPosition[0] >= 0
          && newPosition[0] <= 281
          && newPosition[1] >= 0
          && newPosition[1] <= 206

        if (isStillOnScreen) moveCharacter(newPosition)
      }

      return true
    })
  }, [move])

  return (
    <PlayerMap>
      <Sprite location={position} direction={DIRECTIONS[move.direction].sprite} />
    </PlayerMap>
  )
}

Player.propTypes = {
  move: PropTypes.object.isRequired
}

export default Player
