function speak(text, rate = 0.7) {
  if (!window.speechSynthesis) return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = rate
  utterance.pitch = 1.1
  speechSynthesis.speak(utterance)
}

export function pronounceLetter(letter) {
  speak(letter, 0.6)
}

export function pronounceWord(word) {
  speak(word, 0.8)
}
