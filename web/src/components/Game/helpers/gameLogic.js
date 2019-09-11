import { objectsToDrawOnCanvas, drawToCanvas } from './canvasLogic'
import Pokeball from '../Pokeball'

import spriteProfOak from '../../../images/sprite_prof_oak.png'
import spritePlayer from '../../../images/sprite_player.png'

const spriteXAnimation = 24
const spriteConfig = {
  imgWidth: 15,
  imgHeight: 19,
  imgX: 24, // 0, 24, 48
  imgY: 0, // 0, 21, 42, 63
  width: 15,
  height: 19
}

let playerPosition = {
  x: 140,
  y: 190
}

const PLAYER = {
  UP: {
    sprite: 63,
    move: -1
  },
  DOWN: {
    sprite: 0,
    move: 1
  },
  LEFT: {
    sprite: 21,
    move: -1
  },
  RIGHT: {
    sprite: 42,
    move: 1
  }
}

const initializeGame = (context, direction, structures, starters) => {
  objectsToDrawOnCanvas.push(...structures)
  objectsToDrawOnCanvas.push(...starters)
  objectsToDrawOnCanvas.push({ ...spriteConfig, x: 140, y: 80, img: spriteProfOak })

  drawToCanvas(
    context,
    [ spritePlayer, { ...spriteConfig, ...playerPosition, imgY: PLAYER.UP.sprite} ]
  )
}

const movePlayer = (canvas, context, direction) => {
  const moveAmount = 5
  const edgeBuffer = 15
  const newPosition = {...playerPosition}

  switch(direction) {
    case 'UP':
    case 'DOWN':
      const yDirectionalMove = PLAYER[direction].move * moveAmount
      const yNewPosition = newPosition.y + yDirectionalMove

      if (yNewPosition >= 0 && yNewPosition <= canvas.height - edgeBuffer && !collisionDetected(yNewPosition, newPosition.x)) {
        newPosition.y = yNewPosition
      }
    break
    case 'LEFT':
    case 'RIGHT':
      const xDirectionalMove = PLAYER[direction].move * moveAmount
      const xNewPosition = newPosition.x + xDirectionalMove

      if (xNewPosition >= 0 && xNewPosition <= canvas.width - edgeBuffer && !collisionDetected(newPosition.y, xNewPosition)) {
        newPosition.x = xNewPosition
      }
    break
    default:
      console.log('Direction not supported.')
    break
  }

  drawToCanvas(
    context,
    [ spritePlayer, { ...spriteConfig, ...newPosition, imgY: PLAYER[direction].sprite} ]
  )

  playerPosition = { ...newPosition }
}

const interactWithGame = (canvas, context, button, selectPokemon) => {
  switch(button) {
    case 'A':
      const starters = objectsToDrawOnCanvas.filter(object => object instanceof Pokeball)

      for (let i = 0; i < starters.length; i += 1) {
          if (
            playerPosition.x > starters[i].x - 10
            && playerPosition.x < starters[i].x + 10
            && playerPosition.y === starters[i].y + 31
          ) {
            selectPokemon(starters[i].pokemon)
          }
      }
    break
    case 'B':
      // TODO - hook control up.
    break
    default:
      console.log('Button not supported.');
    break
  }
}

const collisionDetected = (playerYPosition, playerXPosition) => {
  const buffer = 15

  const playerIsCollidingWithObject = (y, x, object) => (
    (x + buffer) > object.x
    && x < (object.x + object.width)
    && y < (object.y + object.height)
    && (y + buffer) > object.y
  )

  let collision = false
  for(let i = 0; i < objectsToDrawOnCanvas.length; i += 1) {
    const object = objectsToDrawOnCanvas[i]

    if (playerIsCollidingWithObject(playerYPosition, playerXPosition, object)) {
      collision = true
      break
    }
  }

  return collision
}

export {
  initializeGame,
  movePlayer,
  interactWithGame
}
