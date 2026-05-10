import { useSignals } from '@preact/signals-react/runtime'
import { t } from '../signals/gameState'
import { pronounceWord } from '../utils/audio'

export default function LetterExamples({ letter, isUppercase, items, selectedWords, onToggle }) {
  useSignals()
  const tr = t.value
  const correctTotal = items.filter(i => i.correct).length
  const correctSelected = items.filter(i => i.correct && selectedWords.has(i.word)).length
  const allDone = correctSelected === correctTotal

  function handleCardClick(word) {
    pronounceWord(word)
    onToggle(word)
  }

  return (
    <div className="letter-examples">
      <div className="examples-header">
        <h3 className="examples-title">
          {tr.selectIconsTitle}{' '}
          <span className="letter-highlight">{letter.toUpperCase()}</span>
          <span className="case-tag"> ({isUppercase ? tr.uppercase : tr.lowercase})</span>
        </h3>
        <span className={`selection-badge ${allDone ? 'done' : ''}`}>
          {correctSelected}/{correctTotal}
        </span>
      </div>

      <div className="examples-grid">
        {items.map(({ emoji, word }) => {
          const selected = selectedWords.has(word)
          return (
            <button
              key={word}
              className={`example-card interactive ${selected ? 'selected' : ''}`}
              onClick={() => handleCardClick(word)}
              type="button"
              title={word}
            >
              {selected && <span className="card-check">✓</span>}
              <span className="example-emoji">{emoji}</span>
              <span className="example-word">{word}</span>
              <span className="card-sound">🔊</span>
            </button>
          )
        })}
      </div>

      <p className={`selection-hint ${allDone ? 'hint-done' : ''}`}>
        {allDone
          ? '✅ ' + (tr.dir === 'rtl' ? 'מצוין! עכשיו לחץ שלב הבא' : 'Great! Now click Next Stage')
          : tr.selectIconsHint}
      </p>
    </div>
  )
}
