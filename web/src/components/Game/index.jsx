import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { canvas } from './helpers/config'
import { initializeGame, movePlayer, interactWithGame } from './helpers/gameLogic'
import Start from './Start'
import Pokeball from './Pokeball'
import Speech from './Speech'

import { getStarters, chooseStarter } from '../../apiClient'
import { choosingStarters } from './helpers/content'

import background from '../../images/lab_inside.jpg'

const Wrapper = styled.div`
  background: #fff;
`

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
      gameHasBeenStarted: false,
      pokemonStarters: [],
      activePokemon: null,
      chosenPokemon: null
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

    this.loadGame = this.loadGame.bind(this)
    this.viewPokemon = this.viewPokemon.bind(this)
    this.choosePokemon = this.choosePokemon.bind(this)
  }

  componentDidMount() {
    const { turnGameboyOn } = this.props

    turnGameboyOn(true)
  }

  componentDidUpdate(prevProps) {
    const { arrowControl, yesNoControl, startControl } = this.props
    const { activePokemon } = this.state
    const ctx = this.canvas.ref.current.getContext('2d')

    if (prevProps.startControl !== startControl) {
      this.loadGame()
    }

    if (prevProps.arrowControl !== arrowControl && !activePokemon) {
      movePlayer(this.canvas, ctx, arrowControl.direction)
    }

    if (prevProps.yesNoControl !== yesNoControl && !activePokemon) {
      interactWithGame(this.canvas, ctx, yesNoControl.button, this.viewPokemon)
    }
  }

  loadGame = () => {
    const { arrowControl } = this.props
    const ctx = this.canvas.ref.current.getContext('2d')

    getStarters()
      .then((response) => {
        this.setState({
          gameHasBeenStarted: true,
          pokemonStarters: response
        }, () => {
          const starters = response.map((pokemon, i) => {
            const xAxis = 20 * i
            return new Pokeball(pokemon, { x: 185 + xAxis, y: 99 })
          })

          initializeGame(ctx, arrowControl.direction, this.structures, starters)
        })
      })
  }

  viewPokemon = (pokemonId) => {
    const activePokemon = this.state.pokemonStarters.find(pokemon => pokemon.id === pokemonId)

    this.setState({ activePokemon })
  }

  choosePokemon = (pokemon) => {
    chooseStarter({ pokemon })
      .then((response) => {
        this.setState({ chosenPokemon: response })
      })
  }

  render() {
    const { pokemonStarters, activePokemon, gameHasBeenStarted } = this.state
    const { arrowControl, yesNoControl } = this.props

    return (
      <Wrapper>
        { !gameHasBeenStarted && <Start /> }
        <Canvas
          visible={pokemonStarters.length > 0}
          ref={this.canvas.ref}
          width={canvas.width}
          height={canvas.height}
        />
        {
          activePokemon &&
          <Speech
            pokemon={activePokemon}
            content={choosingStarters}
            yesNoControl={yesNoControl}
            arrowControl={arrowControl}
            deViewPokemon={() => this.viewPokemon(null)}
            choosePokemon={this.choosePokemon}
          />
        }
      </Wrapper>
    )
  }
}

Game.propTypes = {
  turnGameboyOn: PropTypes.func.isRequired,
  arrowControl: PropTypes.object.isRequired,
  yesNoControl: PropTypes.object.isRequired,
  startControl: PropTypes.bool
}

Game.defautProps = {
  startControl: false
}

export default Game
