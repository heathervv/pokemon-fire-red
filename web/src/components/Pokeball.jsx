import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { sprites } from '../config'
import { Button, Image } from './global'

const Ball = styled(Button)`
  width: 20px;
  height: 20px;
`

const Pokeball = ({ pokemon, order, choosePokemon }) => (
  <Ball onClick={() => choosePokemon({ order, ...pokemon })}>
    <Image
      src={`${sprites}/items/poke-ball.png`}
      alt="Pokéball containing a Pokémon"
    />
  </Ball>
)

Pokeball.propTypes = {
  pokemon: PropTypes.object.isRequired,
  order: PropTypes.number,
  choosePokemon: PropTypes.func.isRequired
}

Pokeball.defaultProps = {
  order: 0
}

 export default Pokeball
