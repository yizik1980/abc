import { signal, computed } from '@preact/signals-react'
import { pickRandomLetters } from '../data/letters'
import { translations } from '../data/i18n'

export const language = signal('he')
export const t = computed(() => translations[language.value])

export const gamePhase = signal('welcome') // 'welcome' | 'stage' | 'result' | 'completion'
export const userName = signal('')
export const difficulty = signal(1) // 1 | 2 | 3
export const currentStage = signal(0)
export const selectedColor = signal('#e74c3c')
export const stageResults = signal([])
export const validationScore = signal(null)
export const selectedLetters = signal(pickRandomLetters(10))

export const progress = computed(() => `${currentStage.value + 1} / 10`)

export function resetGame() {
  gamePhase.value = 'welcome'
  userName.value = ''
  currentStage.value = 0
  selectedColor.value = '#e74c3c'
  stageResults.value = []
  validationScore.value = null
  selectedLetters.value = pickRandomLetters(10)
  // difficulty stays as chosen — user can change on welcome screen
}
