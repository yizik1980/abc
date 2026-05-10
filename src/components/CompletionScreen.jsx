import { useSignals } from '@preact/signals-react/runtime'
import { userName, stageResults, resetGame, t } from '../signals/gameState'

export default function CompletionScreen() {
  useSignals()
  const tr = t.value
  const results = stageResults.value
  const totalScore =
    results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
      : 0
  const passed = results.filter(r => r.passed).length

  return (
    <div className="completion-screen" dir={tr.dir}>
      <div className="completion-card">
        <div className="completion-trophy">🏆</div>
        <h1 className="completion-title">{tr.completionTitle}, {userName.value}!</h1>
        <p className="completion-subtitle">{tr.completionSubtitle}</p>

        <div className="completion-stats">
          <div className="stat-box">
            <span className="stat-number">{passed}/10</span>
            <span className="stat-label">{tr.stagesPassed}</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{totalScore}%</span>
            <span className="stat-label">{tr.avgScore}</span>
          </div>
        </div>

        <table className="results-table">
          <thead>
            <tr>
              <th>{tr.tableStage}</th>
              <th>{tr.tableLetter}</th>
              <th>{tr.tableScore}</th>
              <th>{tr.tableResult}</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className={r.passed ? 'row-pass' : 'row-fail'}>
                <td>{i + 1}</td>
                <td className="result-letter-cell">{r.letter}</td>
                <td>{r.score}%</td>
                <td>{r.passed ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn-play-again" onClick={resetGame}>{tr.playAgainButton}</button>
      </div>
    </div>
  )
}
