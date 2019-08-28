import { canvas } from './config'

const draw = (context, renderElement) => {
  drawToCanvas(context)
  renderElement()

  requestAnimationFrame(() => draw(context, renderElement))
}

const addRectangleToCanvas = (context, x, y, width, height, color = 'transparent') => {
  context.fillStyle = color
  context.fillRect(x, y, width, height)
}

const addImageToCanvas = ({ context, imgX, imgY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight, img }) => {
  const image = new Image()
  image.src = img

  draw(context, () => context.drawImage(image, imgX, imgY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight))
}

const drawToCanvas = (context) => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

export {
  addRectangleToCanvas,
  addImageToCanvas,
  drawToCanvas
}
