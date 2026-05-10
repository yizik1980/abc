import { useState, useEffect } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { t } from '../signals/gameState'
import { pronounceWord } from '../utils/audio'

const VOWELS = ['A', 'E', 'I', 'O', 'U']

function parseWord(word) {
  const upper = word.toUpperCase()
  return upper.split('').map((ch, i) => ({
    index: i,
    char: ch,
    isVowel: VOWELS.includes(ch),
  }))
}

export default function VowelFill({ word, onComplete, isComplete }) {
  useSignals()
  const tr = t.value
  const chars = parseWord(word)
  const vowelPositions = chars.filter(c => c.isVowel).map(c => c.index)

  const [fills, setFills] = useState({})        // { index: 'A' }
  const [selected, setSelected] = useState(null) // index of selected blank
  const [checked, setChecked] = useState(false)

  // Reset when word changes
  useEffect(() => {
    setFills({})
    setSelected(null)
    setChecked(false)
  }, [word])

  const allFilled = vowelPositions.every(i => fills[i])
  const allCorrect = vowelPositions.every(i => fills[i] === chars[i].char)

  useEffect(() => {
    if (allFilled && allCorrect) onComplete(true)
    else onComplete(false)
  }, [fills]) // eslint-disable-line react-hooks/exhaustive-deps

  function selectBlank(idx) {
    setChecked(false)
    setSelected(prev => (prev === idx ? null : idx))
  }

  function fillVowel(vowel) {
    if (selected === null) return
    setFills(prev => ({ ...prev, [selected]: vowel }))
    // Auto-advance to next unfilled blank
    const next = vowelPositions.find(i => i > selected && !fills[i])
    setSelected(next ?? null)
    setChecked(false)
  }

  function clearBlank(idx) {
    setFills(prev => { const n = { ...prev }; delete n[idx]; return n })
    setSelected(idx)
    setChecked(false)
  }

  function handleCheck() {
    setChecked(true)
    if (allCorrect) pronounceWord(word)
  }

  const showWrong = checked && !allCorrect

  return (
    <div className="vowel-fill">
      <h3 className="vowel-fill-title">{tr.vowelFillTitle}</h3>

      <div className="vowel-word-display">
        {chars.map(({ index, char, isVowel }) => {
          if (!isVowel) {
            return <span key={index} className="vw-letter">{char}</span>
          }
          const filled = fills[index]
          const isSelected = selected === index
          const isWrong = checked && filled && filled !== char
          const isRight = checked && filled && filled === char
          return (
            <button
              key={index}
              className={`vw-blank ${isSelected ? 'selected' : ''} ${isWrong ? 'wrong' : ''} ${isRight ? 'right' : ''}`}
              onClick={() => filled ? clearBlank(index) : selectBlank(index)}
              type="button"
            >
              {filled || ''}
            </button>
          )
        })}
      </div>

      <div className="vowel-buttons">
        {VOWELS.map(v => (
          <button
            key={v}
            className={`vw-vowel-btn ${selected === null ? 'disabled' : ''}`}
            onClick={() => fillVowel(v)}
            disabled={selected === null}
            type="button"
          >
            {v}
          </button>
        ))}
      </div>

      <div className="vowel-actions">
        <button
          className="btn-vowel-check"
          onClick={handleCheck}
          disabled={!allFilled}
          type="button"
        >
          {tr.vowelCheckBtn}
        </button>
      </div>

      {checked && (
        <p className={`vowel-feedback ${allCorrect ? 'correct' : 'wrong'}`}>
          {allCorrect ? tr.vowelFillDone : tr.vowelFillWrong}
        </p>
      )}
    </div>
  )
}
