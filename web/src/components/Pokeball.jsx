import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { sprites } from '../config'
import { Button, Image } from './global'

const Ball = styled(Button)`
  width: 20px;
  height: 20px;
`

const Pokeball = ({ pokemon, choosePokemon }) => (
  <Ball onClick={() => choosePokemon(pokemon)}>
    <Image
      src={`${sprites}/items/poke-ball.png`}
      alt="Pokéball containing a Pokémon"
    />
  </Ball>
)

Pokeball.propTypes = {
  pokemon: PropTypes.object.isRequired,
  choosePokemon: PropTypes.func.isRequired
}

 export default Pokeball
