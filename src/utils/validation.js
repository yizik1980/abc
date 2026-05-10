const FONT_SIZE = 260
const FONT = `bold ${FONT_SIZE}px Arial`
// Stroke width of the reference path — user needs to trace this outline
const REF_STROKE = 22
const PASS_THRESHOLD = 30

function buildReferenceCanvas(letter, width, height) {
  const offscreen = document.createElement('canvas')
  offscreen.width = width
  offscreen.height = height
  const ctx = offscreen.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
  ctx.font = FONT
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // Draw only the stroke path so validation checks tracing, not full fill
  ctx.strokeStyle = 'black'
  ctx.lineWidth = REF_STROKE
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.strokeText(letter, width / 2, height / 2)
  return offscreen
}

export function validateDrawing(mainCanvas, letter) {
  const { width, height } = mainCanvas
  const ref = buildReferenceCanvas(letter, width, height)
  const refCtx = ref.getContext('2d')
  const refData = refCtx.getImageData(0, 0, width, height).data

  const mainCtx = mainCanvas.getContext('2d')
  const mainData = mainCtx.getImageData(0, 0, width, height).data

  let refPixels = 0
  let coveredPixels = 0

  for (let i = 0; i < refData.length; i += 4) {
    if (refData[i] > 128) continue // only check dark (stroke) pixels in reference
    refPixels++
    const brightness = (mainData[i] + mainData[i + 1] + mainData[i + 2]) / 3
    if (brightness < 210) coveredPixels++ // user painted here
  }

  if (refPixels === 0) return 0
  return Math.round((coveredPixels / refPixels) * 100)
}

export { PASS_THRESHOLD }

export function drawReferenceLetterOnCanvas(canvas, letter) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#f4f4f4'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = FONT
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // Faint filled guide for the user to see the shape
  ctx.fillStyle = 'rgba(180, 180, 180, 0.25)'
  ctx.fillText(letter, canvas.width / 2, canvas.height / 2)
  // Dashed stroke outline — shows the exact path to trace
  ctx.strokeStyle = 'rgba(150, 130, 190, 0.45)'
  ctx.lineWidth = REF_STROKE
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.setLineDash([18, 10])
  ctx.strokeText(letter, canvas.width / 2, canvas.height / 2)
  ctx.setLineDash([])
}
