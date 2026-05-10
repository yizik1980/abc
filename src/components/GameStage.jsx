import { useRef, useState, useEffect, useMemo } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import {
  currentStage, validationScore, stageResults,
  gamePhase, userName, selectedLetters, t, difficulty,
} from '../signals/gameState'
import { getDecoys } from '../data/letters'
import { pronounceLetter } from '../utils/audio'
import { validateDrawing, drawReferenceLetterOnCanvas, PASS_THRESHOLD } from '../utils/validation'
import LetterCanvas from './LetterCanvas'
import ColorPicker from './ColorPicker'
import LetterExamples from './LetterExamples'
import ResultOverlay from './ResultOverlay'
import LangToggle from './LangToggle'
import VowelFill from './VowelFill'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function GameStage() {
  useSignals()
  const canvasRef = useRef(null)
  const stage = currentStage.value
  const { letter, hint, examples, isUppercase } = selectedLetters.value[stage]
  const tr = t.value
  const level = difficulty.value

  // Word used for level 2 (trace word) and level 3 (vowel fill)
  const traceWord = examples[0].word.split(' ')[0].toUpperCase()

  // Icon grid: 4 correct + 4 decoys
  const allItems = useMemo(() => {
    const correct = examples.map(e => ({ ...e, correct: true }))
    const decoys = getDecoys(letter, 4).map(e => ({ ...e, correct: false }))
    return shuffle([...correct, ...decoys])
  }, [stage]) // eslint-disable-line react-hooks/exhaustive-deps

  const [selectedWords, setSelectedWords] = useState(new Set())
  const [vowelOk, setVowelOk] = useState(false)

  useEffect(() => {
    setSelectedWords(new Set())
    setVowelOk(false)
  }, [stage])

  function toggleWord(word) {
    setSelectedWords(prev => {
      const next = new Set(prev)
      next.has(word) ? next.delete(word) : next.add(word)
      return next
    })
  }

  const iconsOk = useMemo(
    () =>
      allItems.filter(i => i.correct).every(i => selectedWords.has(i.word)) &&
      allItems.filter(i => !i.correct).every(i => !selectedWords.has(i.word)),
    [allItems, selectedWords]
  )

  const canProceed = level === 3
    ? iconsOk && vowelOk
    : iconsOk

  // ---- actions ----
  function handleNextStage() {
    const canvas = canvasRef.current
    pronounceLetter(letter)
    const score = level !== 3 && canvas
      ? validateDrawing(canvas, level === 2 ? traceWord : letter)
      : 100 // level 3 has no canvas, score = 100 if vowels correct
    validationScore.value = score
    stageResults.value = [...stageResults.value, { letter, score, passed: score >= PASS_THRESHOLD }]
    gamePhase.value = 'result'
  }

  function handleClearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    drawReferenceLetterOnCanvas(canvas, level === 2 ? traceWord : letter)
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

  const canvasText = level === 2 ? traceWord : letter
  const hintText   = level === 2 ? `${tr.wordHint}: ${traceWord}` : hint

  return (
    <div className="game-stage" dir={tr.dir}>
      <header className="stage-header">
        <div className="stage-info">
          <span className="stage-badge">{tr.stageBadge} {stage + 1} {tr.of} 10</span>
          <span className="diff-badge diff-badge--{level}">
            {level === 1 ? '✏️' : level === 2 ? '📝' : '🔤'} {tr[`diff${level}Label`]}
          </span>
          <span className="stage-user">👋 {userName.value}</span>
          <LangToggle />
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((stage + 1) / 10) * 100}%` }} />
        </div>
      </header>

      <div className="stage-body">
        {/* ── Left column: canvas (levels 1 & 2) or vowel fill (level 3) ── */}
        <div className="canvas-area">
          <div className="hint-text">{tr.hintPrefix} {hintText}</div>

          {level !== 3 && (
            <>
              <ColorPicker />
              <LetterCanvas letter={canvasText} canvasRef={canvasRef} />
              <div className="canvas-controls">
                <button className="btn-clear" onClick={handleClearCanvas}>{tr.clearButton}</button>
                <button
                  className="btn-next"
                  onClick={handleNextStage}
                  disabled={!canProceed}
                >
                  {stage < 9 ? tr.nextButton : tr.finishButton}
                </button>
              </div>
            </>
          )}

          {level === 3 && (
            <>
              <VowelFill
                word={traceWord}
                onComplete={ok => setVowelOk(ok)}
                isComplete={vowelOk}
              />
              <div className="canvas-controls">
                <button
                  className="btn-next"
                  onClick={handleNextStage}
                  disabled={!canProceed}
                >
                  {stage < 9 ? tr.nextButton : tr.finishButton}
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── Right column: icon selection ── */}
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
