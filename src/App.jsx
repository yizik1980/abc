import { useSignals } from '@preact/signals-react/runtime'
import { gamePhase } from './signals/gameState'
import WelcomeScreen from './components/WelcomeScreen'
import GameStage from './components/GameStage'
import CompletionScreen from './components/CompletionScreen'
import './App.css'

export default function App() {
  useSignals()
  const phase = gamePhase.value

  return (
    <div className="app">
      {phase === 'welcome' && <WelcomeScreen />}
      {(phase === 'stage' || phase === 'result') && <GameStage />}
      {phase === 'completion' && <CompletionScreen />}
    </div>
  )
}
