import { addImageToCanvas, addRectangleToCanvas } from './createElement'

import playerForward from'../../../images/person_forward.png'
import playerBack from'../../../images/person_back.png'
import playerRight from'../../../images/person_right.png'
import playerLeft from'../../../images/person_left.png'

const spriteConfig = {
  imgWidth: 43,
  imgHeight: 55,
  imgX: 0,
  imgY: 0,
  canvasWidth: 12,
  canvasHeight: 15
}

let playerPosition = {
  canvasX: 140,
  canvasY: 190
}

const PLAYER = {
  UP: {
    sprite: playerForward,
    move: -1
  },
  DOWN: {
    sprite: playerBack,
    move: 1
  },
  LEFT: {
    sprite: playerLeft,
    move: -1
  },
  RIGHT: {
    sprite: playerRight,
    move: 1
  }
}

const labStructures = [
  { x: 0, y: 0, width: 295, height: 60 },
  { x: 182, y: 95, width: 68, height: 33 },
  { x: 182, y: 173, width: 112, height: 45 },
  { x: 0, y: 173, width: 112, height: 45 },
  { x: 0, y: 63, width: 17, height: 48 },
  { x: 22, y: 80, width: 42, height: 53 },
]

const collisionDetected = (playerYPosition, playerXPosition) => {
  const buffer = 15

  const playerIsCollidingWithObject = (y, x, object) => (
    (x + buffer) > object.x
    && x < (object.x + object.width)
    && y < (object.y + object.height)
    && (y + buffer) > object.y
  )

  let collision = false
  for(let i = 0; i < labStructures.length; i += 1) {
    const object = labStructures[i]

    if (playerIsCollidingWithObject(playerYPosition, playerXPosition, object)) {
      collision = true
      break
    }
  }

  return collision
}

const drawPlayer = (context, img, config) => {
  addImageToCanvas({
    context,
    img,
    ...config
  })
}

const drawObjects = (context) => {
  for (let i = 0; i < labStructures.length; i += 1) {
    const object = labStructures[i]

    addRectangleToCanvas(context, ...Object.values(object))
  }
}

const initializeGame = (context, direction) => {
  drawPlayer(
    context,
    PLAYER[direction].sprite,
    { ...spriteConfig, ...playerPosition}
  )
  drawObjects(context)
}

const movePlayer = (canvas, context, direction) => {
  const moveAmount = 5
  const edgeBuffer = 15
  const newPosition = {...playerPosition}

  switch(direction) {
    case 'UP':
    case 'DOWN':
      const yDirectionalMove = PLAYER[direction].move * moveAmount
      const yNewPosition = newPosition.canvasY + yDirectionalMove

      if (yNewPosition >= 0 && yNewPosition <= canvas.height - edgeBuffer && !collisionDetected(yNewPosition, newPosition.canvasX)) {
        newPosition.canvasY = yNewPosition
      }
    break;
    case 'LEFT':
    case 'RIGHT':
      const xDirectionalMove = PLAYER[direction].move * moveAmount
      const xNewPosition = newPosition.canvasX + xDirectionalMove

      if (xNewPosition >= 0 && xNewPosition <= canvas.width - edgeBuffer && !collisionDetected(newPosition.canvasY, xNewPosition)) {
        newPosition.canvasX = xNewPosition
      }
    break;
    default:
      console.log('Direction not handled.')
    break;
  }

  drawPlayer(
    context,
    PLAYER[direction].sprite,
    { ...spriteConfig, ...newPosition}
  )
  drawObjects(context)

  playerPosition = { ...newPosition }
}

export {
  initializeGame,
  movePlayer
}
