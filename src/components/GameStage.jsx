import { useRef, useState, useEffect, useMemo } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import {
  currentStage, validationScore, stageResults,
  gamePhase, userName, selectedLetters, t,
} from '../signals/gameState'
import { getDecoys } from '../data/letters'
import { pronounceLetter } from '../utils/audio'
import { validateDrawing, drawReferenceLetterOnCanvas, PASS_THRESHOLD } from '../utils/validation'
import LetterCanvas from './LetterCanvas'
import ColorPicker from './ColorPicker'
import LetterExamples from './LetterExamples'
import ResultOverlay from './ResultOverlay'
import LangToggle from './LangToggle'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function GameStage() {
  useSignals()
  const canvasRef = useRef(null)
  const stage = currentStage.value
  const { letter, hint, examples, isUppercase } = selectedLetters.value[stage]
  const tr = t.value

  // Build shuffled icon grid once per stage (correct + decoys)
  const allItems = useMemo(() => {
    const correct = examples.map(e => ({ ...e, correct: true }))
    const decoys = getDecoys(letter, 4).map(e => ({ ...e, correct: false }))
    return shuffle([...correct, ...decoys])
  }, [stage]) // eslint-disable-line react-hooks/exhaustive-deps

  const [selectedWords, setSelectedWords] = useState(new Set())

  // Reset selections when stage changes
  useEffect(() => {
    setSelectedWords(new Set())
  }, [stage])

  function toggleWord(word) {
    setSelectedWords(prev => {
      const next = new Set(prev)
      next.has(word) ? next.delete(word) : next.add(word)
      return next
    })
  }

  const allCorrectSelected = useMemo(
    () => allItems.filter(i => i.correct).every(i => selectedWords.has(i.word)),
    [allItems, selectedWords]
  )

  function handleNextStage() {
    const canvas = canvasRef.current
    if (!canvas) return
    pronounceLetter(letter)
    const score = validateDrawing(canvas, letter)
    validationScore.value = score
    stageResults.value = [...stageResults.value, { letter, score, passed: score >= PASS_THRESHOLD }]
    gamePhase.value = 'result'
  }

  function handleClearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    drawReferenceLetterOnCanvas(canvas, letter)
  }

  function handleContinue() {
    validationScore.value = null
    if (currentStage.value < 9) {
      currentStage.value += 1
      gamePhase.value = 'stage'
    } else {
      gamePhase.value = 'completion'
    }
  }

  function handleRetry() {
    stageResults.value = stageResults.value.slice(0, -1)
    validationScore.value = null
    gamePhase.value = 'stage'
    handleClearCanvas()
  }

  return (
    <div className="game-stage" dir={tr.dir}>
      <header className="stage-header">
        <div className="stage-info">
          <span className="stage-badge">
            {tr.stageBadge} {stage + 1} {tr.of} 10
          </span>
          <span className="stage-user">👋 {userName.value}</span>
          <LangToggle />
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((stage + 1) / 10) * 100}%` }} />
        </div>
      </header>

      <div className="stage-body">
        <div className="canvas-area">
          <div className="hint-text">{tr.hintPrefix} {hint}</div>
          <ColorPicker />
          <LetterCanvas letter={letter} canvasRef={canvasRef} />
          <div className="canvas-controls">
            <button className="btn-clear" onClick={handleClearCanvas}>{tr.clearButton}</button>
            <button
              className="btn-next"
              onClick={handleNextStage}
              disabled={!allCorrectSelected}
              title={!allCorrectSelected ? (tr.dir === 'rtl' ? 'יש לבחור את כל המילים הנכונות תחילה' : 'Select all correct words first') : ''}
            >
              {stage < 9 ? tr.nextButton : tr.finishButton}
            </button>
          </div>
        </div>

        <LetterExamples
          letter={letter}
          isUppercase={isUppercase}
          items={allItems}
          selectedWords={selectedWords}
          onToggle={toggleWord}
        />
      </div>

      {gamePhase.value === 'result' && (
        <ResultOverlay onContinue={handleContinue} onRetry={handleRetry} />
      )}
    </div>
  )
}
