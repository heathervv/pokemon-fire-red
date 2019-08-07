import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getStarters } from '../apiClient'
import Pokeball from './Pokeball'

const Game = ({ turnGameboyOn }) => {
  const [pokemonStarters, setPokemon] = useState([])

  useEffect(() => {
    getStarters()
      .then((response) => {
        setPokemon(response)
        turnGameboyOn(true)
      })
  }, [turnGameboyOn])

  return (
    <div>
      {
        pokemonStarters.map(pokemon => (
          <Pokeball key={pokemon.id} pokemon={pokemon.id} />
        ))
      }
    </div>
  )
}

Game.propTypes = {
  turnGameboyOn: PropTypes.func.isRequired
}

export default Game
