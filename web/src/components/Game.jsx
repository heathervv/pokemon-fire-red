import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { getStarters } from '../apiClient'
import Pokeball from './Pokeball'
import Speech from './Speech'

import background from'../images/lab_inside.jpg';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: url(${background}) no-repeat;
  background-size: cover;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity .4s cubic-bezier(0.895, 0.030, 0.685, 0.220);
  transition-delay: .5s;
`

const InteractiveSpace = styled.div`
  position: absolute;
  top: 44%;
  right: 17%;
`

const Game = ({ turnGameboyOn }) => {
  const [pokemonStarters, setPokemonStarters] = useState([])
  const [selectedPokemon, selectPokemon] = useState(null)

  useEffect(() => {
    getStarters()
      .then((response) => {
        setPokemonStarters(response)
        turnGameboyOn(true)
      })
  }, [turnGameboyOn])

  return (
    <Background visible={pokemonStarters.length > 0}>
      <InteractiveSpace>
        {
          pokemonStarters.map((pokemon, i) => (
            <Pokeball
              key={pokemon.id}
              pokemon={pokemon}
              order={i}
              choosePokemon={selectPokemon}
            />
          ))
        }
      </InteractiveSpace>
      {
        selectedPokemon &&
        <Speech pokemon={selectedPokemon} />
      }
    </Background>
  )
}

Game.propTypes = {
  turnGameboyOn: PropTypes.func.isRequired
}

export default Game
