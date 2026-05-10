import { useSignals } from '@preact/signals-react/runtime'
import { validationScore, currentStage, selectedLetters, t } from '../signals/gameState'
import { PASS_THRESHOLD } from '../utils/validation'

export default function ResultOverlay({ onContinue, onRetry }) {
  useSignals()
  const score = validationScore.value
  const passed = score >= PASS_THRESHOLD
  const { letter, isUppercase } = selectedLetters.value[currentStage.value]
  const tr = t.value

  return (
    <div className="result-overlay">
      <div className="result-card">
        <div className="result-icon">{passed ? '🌟' : '💪'}</div>
        <h2 className="result-title">{passed ? tr.resultPass : tr.resultFail}</h2>
        <p className="result-letter">
          {tr.resultLetter}{' '}
          <strong className="result-letter-big">{letter}</strong>
          <span className="result-case-tag">{isUppercase ? tr.uppercase : tr.lowercase}</span>
        </p>
        <div className="score-bar-container">
          <div
            className="score-bar-fill"
            style={{ width: `${score}%`, backgroundColor: passed ? '#2ecc71' : '#f39c12' }}
          />
        </div>
        <p className="result-score">{tr.resultCoverage} {score}%</p>
        <p className="result-message">{passed ? tr.resultMsgPass : tr.resultMsgFail}</p>

        <div className="result-actions">
          {!passed && (
            <button className="btn-retry" onClick={onRetry}>{tr.retryButton}</button>
          )}
          <button className="btn-continue" onClick={onContinue}>
            {currentStage.value < 9 ? tr.continueButton : tr.seeResultsButton}
          </button>
        </div>
      </div>
    </div>
  )
}
