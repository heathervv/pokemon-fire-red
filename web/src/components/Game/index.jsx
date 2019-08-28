import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { canvas } from './helpers/config'
import { initializeGame, movePlayer } from './helpers/logic'

import background from '../../images/lab_inside.jpg'

const Canvas = styled.canvas`
  background: url(${background}) no-repeat;
  background-size: cover;
`

class Game extends Component {
  constructor() {
    super()

    this.canvas = {
      ref: React.createRef(),
      width: 295,
      height: 223
    }
  }

  componentDidMount() {
    const { arrowControl } = this.props
    const ctx = this.canvas.ref.current.getContext('2d')

    initializeGame(ctx, arrowControl.direction)
  }

  componentDidUpdate(prevProps) {
    const { arrowControl } = this.props
    const ctx = this.canvas.ref.current.getContext('2d')

    if (prevProps.arrowControl !== arrowControl) {
      movePlayer(this.canvas, ctx, arrowControl.direction)
    }
  }

  render() {
    return (
      <Canvas
        ref={this.canvas.ref}
        width={canvas.width}
        height={canvas.height}
      />
    )
  }
}

Game.propTypes = {
  arrowControl: PropTypes.object.isRequired
}

export default Game
