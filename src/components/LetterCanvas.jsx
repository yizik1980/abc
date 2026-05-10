import { useRef, useEffect, useCallback } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { selectedColor } from '../signals/gameState'
import { drawReferenceLetterOnCanvas } from '../utils/validation'

const CANVAS_W = 600
const CANVAS_H = 380
const BRUSH_SIZE = 14

export default function LetterCanvas({ letter, canvasRef }) {
  useSignals()
  const isDrawing = useRef(false)
  const lastPos = useRef(null)

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawReferenceLetterOnCanvas(canvas, letter)
  }, [letter, canvasRef])

  useEffect(() => {
    initCanvas()
  }, [initCanvas])

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  function startDraw(e) {
    e.preventDefault()
    isDrawing.current = true
    const canvas = canvasRef.current
    lastPos.current = getPos(e, canvas)
  }

  function draw(e) {
    e.preventDefault()
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)

    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = selectedColor.value
    ctx.lineWidth = BRUSH_SIZE
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    lastPos.current = pos
  }

  function stopDraw() {
    isDrawing.current = false
    lastPos.current = null
  }

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="letter-canvas"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <div className="canvas-letter-reflection">{letter}</div>
    </div>
  )
}
