const BASE_FONT_SIZE = 260
const REF_STROKE = 22
export const PASS_THRESHOLD = 30

function getFontSize(text, canvasWidth) {
  if (text.length <= 1) return BASE_FONT_SIZE
  // Fit the word within 88% of canvas width; bold char ~0.65× size wide
  const maxPx = canvasWidth * 0.88
  const estimated = Math.floor(maxPx / (text.length * 0.65))
  return Math.min(BASE_FONT_SIZE, Math.max(36, estimated))
}

function makeFont(size) {
  return `bold ${size}px Arial`
}

function buildReferenceCanvas(text, width, height) {
  const size = getFontSize(text, width)
  const offscreen = document.createElement('canvas')
  offscreen.width = width
  offscreen.height = height
  const ctx = offscreen.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
  ctx.font = makeFont(size)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = REF_STROKE
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.strokeText(text, width / 2, height / 2)
  return offscreen
}

export function validateDrawing(mainCanvas, text) {
  const { width, height } = mainCanvas
  const ref = buildReferenceCanvas(text, width, height)
  const refCtx = ref.getContext('2d')
  const refData = refCtx.getImageData(0, 0, width, height).data

  const mainCtx = mainCanvas.getContext('2d')
  const mainData = mainCtx.getImageData(0, 0, width, height).data

  let refPixels = 0
  let coveredPixels = 0

  for (let i = 0; i < refData.length; i += 4) {
    if (refData[i] > 128) continue
    refPixels++
    const brightness = (mainData[i] + mainData[i + 1] + mainData[i + 2]) / 3
    if (brightness < 210) coveredPixels++
  }

  if (refPixels === 0) return 0
  return Math.round((coveredPixels / refPixels) * 100)
}

export function drawReferenceLetterOnCanvas(canvas, text) {
  const ctx = canvas.getContext('2d')
  const size = getFontSize(text, canvas.width)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#f4f4f4'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = makeFont(size)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // Faint fill guide
  ctx.fillStyle = 'rgba(180, 180, 180, 0.25)'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  // Dashed stroke path to trace
  ctx.strokeStyle = 'rgba(150, 130, 190, 0.45)'
  ctx.lineWidth = REF_STROKE
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.setLineDash([18, 10])
  ctx.strokeText(text, canvas.width / 2, canvas.height / 2)
  ctx.setLineDash([])
}
