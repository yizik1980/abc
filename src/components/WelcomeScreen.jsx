import { useSignals } from '@preact/signals-react/runtime'
import { userName, gamePhase, language, t, difficulty } from '../signals/gameState'

const LEVELS = [
  { id: 1, icon: '✏️' },
  { id: 2, icon: '📝' },
  { id: 3, icon: '🔤' },
]

export default function WelcomeScreen() {
  useSignals()
  const tr = t.value

  const labelKey  = id => `diff${id}Label`
  const descKey   = id => `diff${id}Desc`

  function handleStart() {
    if (userName.value.trim()) gamePhase.value = 'stage'
  }

  return (
    <div className="welcome-screen" dir={tr.dir}>
      <div className="lang-toggle-bar">
        <button className="btn-lang" onClick={() => (language.value = language.value === 'he' ? 'en' : 'he')}>
          🌐 {tr.langToggle}
        </button>
      </div>

      <div className="welcome-card">
        <div className="welcome-logo">✏️</div>
        <h1 className="welcome-title">{tr.welcomeTitle}</h1>
        <p className="welcome-subtitle">{tr.welcomeSubtitle}</p>

        <div className="welcome-input-group">
          <label htmlFor="username">{tr.nameLabel}</label>
          <input
            id="username"
            type="text"
            placeholder={tr.namePlaceholder}
            value={userName.value}
            onChange={e => (userName.value = e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            maxLength={20}
          />
        </div>

        <div className="difficulty-section">
          <p className="difficulty-title">{tr.difficultyTitle}</p>
          <div className="difficulty-cards">
            {LEVELS.map(({ id, icon }) => (
              <button
                key={id}
                className={`diff-card ${difficulty.value === id ? 'active' : ''}`}
                onClick={() => (difficulty.value = id)}
                type="button"
              >
                <span className="diff-icon">{icon}</span>
                <span className="diff-label">{tr[labelKey(id)]}</span>
                <span className="diff-desc">{tr[descKey(id)]}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn-start"
          onClick={handleStart}
          disabled={!userName.value.trim()}
        >
          {tr.startButton}
        </button>
      </div>

      <div className="instructions-panel">
        <h2>{tr.instructionsTitle}</h2>
        <ol>
          {tr.instructions.map((line, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
        </ol>
      </div>
    </div>
  )
}
