import { canvas } from './config'

const objectsToDrawOnCanvas = []

const addRectangleToCanvas = ({ context, x, y, width, height, color = 'transparent' }) => {
  context.fillStyle = color
  context.fillRect(x, y, width, height)
}

const addImageToCanvas = ({ context, imgX, imgY, imgWidth, imgHeight, x, y, width, height, img }) => {
  const image = new Image()
  image.src = img

  context.drawImage(image, imgX, imgY, imgWidth, imgHeight, x, y, width, height)
}

const clearCanvas = (context) => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

const drawToCanvas = (context, player) => {
  clearCanvas(context)

  drawObjects(context, objectsToDrawOnCanvas)
  drawPlayer(context, ...player)

  requestAnimationFrame(() => {
    drawToCanvas(context, player)
  })
}

const drawPlayer = (context, img, config) => {
  addImageToCanvas({
    context,
    img,
    ...config
  })
}

const drawObjects = (context, objects) => {
  for (let i = 0; i < objects.length; i += 1) {
    const object = objects[i]

    if (!object.img) {
      addRectangleToCanvas({ context, ...object })
    } else {
      addImageToCanvas({ context, ...object })
    }
  }
}

export {
  addRectangleToCanvas,
  addImageToCanvas,
  clearCanvas,
  objectsToDrawOnCanvas,
  drawToCanvas
}
