import { useSignals } from '@preact/signals-react/runtime'
import { selectedColor } from '../signals/gameState'

const COLORS = [
  '#e74c3c', // red
  '#e67e22', // orange
  '#f1c40f', // yellow
  '#2ecc71', // green
  '#3498db', // blue
  '#9b59b6', // purple
  '#1abc9c', // teal
  '#2c3e50', // dark
]

export default function ColorPicker() {
  useSignals()

  return (
    <div className="color-picker">
      <span className="color-picker-label">🎨 Color:</span>
      {COLORS.map(color => (
        <button
          key={color}
          className={`color-swatch ${selectedColor.value === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => (selectedColor.value = color)}
          title={color}
        />
      ))}
    </div>
  )
}
