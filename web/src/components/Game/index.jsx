import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { canvas } from './helpers/config'
import { initializeGame, movePlayer, interactWithGame } from './helpers/gameLogic'
import Pokeball from './Pokeball'
import Speech from './Speech'

import { getStarters } from '../../apiClient'
import { choosingStarters } from './helpers/content'

import background from '../../images/lab_inside.jpg'

const Canvas = styled.canvas`
  background: url(${background}) no-repeat;
  background-size: cover;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity .4s cubic-bezier(0.895, 0.030, 0.685, 0.220);
  transition-delay: .5s;
`

class Game extends PureComponent {
  constructor() {
    super()

    this.state = {
      selectedPokemon: null,
      pokemonStarters: []
    }

    this.canvas = {
      ref: React.createRef(),
      width: 295,
      height: 223
    }

    // lab structures
    this.structures = [
      { x: 0, y: 0, width: 295, height: 60 },
      { x: 182, y: 95, width: 68, height: 33 },
      { x: 182, y: 173, width: 112, height: 45 },
      { x: 0, y: 173, width: 112, height: 45 },
      { x: 0, y: 63, width: 17, height: 48 },
      { x: 22, y: 80, width: 42, height: 53 },
    ]

    this.selectPokemon = this.selectPokemon.bind(this)
  }

  componentDidMount() {
    const { arrowControl, turnGameboyOn } = this.props
    const ctx = this.canvas.ref.current.getContext('2d')

    getStarters()
      .then((response) => {
        this.setState({ pokemonStarters: response }, () => {
          const starters = response.map((pokemon, i) => {
            const xAxis = 20 * i
            return new Pokeball(pokemon, { x: 185 + xAxis, y: 99 })
          })

          initializeGame(ctx, arrowControl.direction, this.structures, starters)
          turnGameboyOn(true)
        })
      })
  }

  componentDidUpdate(prevProps) {
    const { arrowControl, yesNoControl } = this.props
    const { selectedPokemon } = this.state
    const ctx = this.canvas.ref.current.getContext('2d')

    if (prevProps.arrowControl !== arrowControl && !selectedPokemon) {
      movePlayer(this.canvas, ctx, arrowControl.direction)
    }

    if (prevProps.yesNoControl !== yesNoControl && !selectedPokemon) {
      interactWithGame(this.canvas, ctx, yesNoControl.button, this.selectPokemon)
    }
  }

  selectPokemon = (pokemonId) => {
    const selectedPokemon = this.state.pokemonStarters.find(pokemon => pokemon.id === pokemonId)

    this.setState({ selectedPokemon })
  }

  render() {
    const { pokemonStarters, selectedPokemon } = this.state
    const { arrowControl, yesNoControl } = this.props

    return (
      <>
        <Canvas
          visible={pokemonStarters.length > 0}
          ref={this.canvas.ref}
          width={canvas.width}
          height={canvas.height}
        />
        {
          selectedPokemon &&
          <Speech
            pokemon={selectedPokemon}
            content={choosingStarters}
            yesNoControl={yesNoControl}
            arrowControl={arrowControl}
          />
        }
      </>
    )
  }
}

Game.propTypes = {
  arrowControl: PropTypes.object.isRequired,
  yesNoControl: PropTypes.object.isRequired,
  turnGameboyOn: PropTypes.func.isRequired
}

export default Game
