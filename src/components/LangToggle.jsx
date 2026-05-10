import { useSignals } from '@preact/signals-react/runtime'
import { language, t } from '../signals/gameState'

export default function LangToggle() {
  useSignals()
  return (
    <button
      className="btn-lang"
      onClick={() => (language.value = language.value === 'he' ? 'en' : 'he')}
    >
      🌐 {t.value.langToggle}
    </button>
  )
}
