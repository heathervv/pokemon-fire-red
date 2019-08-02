import React from 'react'
import PropTypes from 'prop-types'
import { sprites } from '../config'
import { Button, Image } from './global'

const Pokeball = ({ pokemon }) => (
  <Button onClick={() => { console.log(`I was clicked, I contain ${pokemon}`)}}>
    <Image
      src={`${sprites}/items/poke-ball.png`}
      alt="Pokéball containing a Pokémon"
    />
  </Button>
)

Pokeball.propTypes = {
  pokemon: PropTypes.number.isRequired
}

 export default Pokeball
