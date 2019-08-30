import { sprites } from './helpers/config'

class Pokeball {
  constructor(pokemon, position) {
    this.pokemon = pokemon.id
    this.imgX = 0
    this.imgY = 0
    this.imgWidth = 25
    this.imgHeight = 25
    this.x = position.x
    this.y = position.y
    this.width = 15
    this.height = 15
    this.img = `${sprites}/items/poke-ball.png`
  }
}

export default Pokeball
