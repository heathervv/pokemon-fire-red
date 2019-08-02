import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getStarters } from '../apiClient'
import Pokeball from './Pokeball'

const GameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const GameWindow = styled.div`
  width: 730px;
  height: 600px;
  border-radius: 7px;
  /* TEMPORARY------------ */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  /* TEMPORARY------------ */
`

const Game = () => {
  const [pokemonStarters, setPokemon] = useState([])

  useEffect(() => {
    getStarters()
      .then((response) => {
        setPokemon(response)
      })
  }, [])

  return (
    <GameWrapper>
      <GameWindow>
        {
          pokemonStarters.map(pokemon => (
            <Pokeball key={pokemon.id} pokemon={pokemon.id} />
          ))
        }
      </GameWindow>
    </GameWrapper>
  )
}

export default Game
