# Letter Tracing Game

An interactive English letter-learning game for kids, built with React and Signals. Players trace letters on a canvas, listen to words, and identify which words start with each letter.

---

## Features

- **10 random stages per session** — drawn from all 52 English letters (A–Z uppercase + a–z lowercase)
- **Canvas tracing** — trace the letter's stroke path with the mouse; a dashed guide shows exactly where to draw
- **Color palette** — choose from 8 colors before drawing
- **Icon selection quiz** — 8 word cards (4 correct + 4 decoys) shown below the canvas; must select all correct words to unlock the Next Stage button
- **Word audio** — click any word card to hear it spoken in English (Web Speech API)
- **Letter audio** — the letter is pronounced when the stage is submitted
- **Bilingual UI** — Hebrew (default, RTL) and English (LTR), switchable at any time with the globe button
- **Score tracking** — each stage records coverage percentage and pass/fail; summary shown at the end
- **Play Again** — reshuffles a new random set of 10 letters

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [React 18](https://react.dev/) | UI framework |
| [@preact/signals-react](https://github.com/preactjs/signals) | Reactive global state |
| Canvas API | Drawing surface and offscreen validation |
| Web Speech API | Letter and word pronunciation |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The dev server runs at `http://localhost:5173` (or the next available port).

---

## Project Structure

```
src/
├── main.jsx                  Entry point
├── App.jsx                   Root — switches screens based on gamePhase signal
├── App.css                   All styles
│
├── signals/
│   └── gameState.js          Global signals: gamePhase, userName, currentStage,
│                             selectedColor, stageResults, selectedLetters, language, t
│
├── data/
│   ├── letters.js            52 letter definitions + pickRandomLetters() + getDecoys()
│   └── i18n.js               Hebrew and English translation strings
│
├── utils/
│   ├── audio.js              pronounceLetter() and pronounceWord() via SpeechSynthesis
│   └── validation.js         validateDrawing() and drawReferenceLetterOnCanvas()
│
└── components/
    ├── WelcomeScreen.jsx     Name input + game instructions
    ├── GameStage.jsx         Main stage: canvas + color picker + icon quiz
    ├── LetterCanvas.jsx      Canvas drawing surface (mouse and touch)
    ├── ColorPicker.jsx       8-color swatch row
    ├── LetterExamples.jsx    Interactive icon selection grid (8 cards)
    ├── ResultOverlay.jsx     Post-stage modal: score bar + pass/fail + continue
    ├── CompletionScreen.jsx  Final summary table + Play Again
    └── LangToggle.jsx        Hebrew / English switcher button
```

---

## Game Flow

```
WelcomeScreen
  └── Enter name → Start Game
        |
        v
  GameStage (x10 stages)
  ├── Hint text describing how to draw the letter
  ├── Color picker (8 colors)
  ├── Canvas — trace the dashed letter outline with the mouse
  ├── Icon grid — 8 cards (4 correct + 4 decoys)
  │     └── Click any card → word is spoken aloud
  │     └── Select all 4 correct cards to unlock Next Stage
  └── Next Stage button (locked until all correct icons selected)
        |
        v
  ResultOverlay
  ├── Stroke-path coverage score (pass threshold: 30%)
  ├── Pass → Continue   |   Fail → Try Again or Continue
  └── Continue
        |
        v
  After stage 10 → CompletionScreen
  ├── Stages passed count and average score
  ├── Per-stage results table (letter, score, pass/fail)
  └── Play Again → resets everything and picks a new random 10 letters
```

---

## Letter Data

All 52 letters are defined in `src/data/letters.js`:

- **26 uppercase (A–Z)** — each with a drawing hint and 4 emoji word examples
- **26 lowercase (a–z)** — same word examples, with dedicated lowercase drawing hints

Each letter object contains:

```js
{
  letter: 'A',           // the character to display and trace
  isUppercase: true,     // used to label the case in the UI
  hint: 'Draw two...',   // shown above the canvas as a drawing tip
  examples: [            // 4 word-emoji pairs used in the icon grid
    { emoji: '🍎', word: 'Apple' },
    ...
  ]
}
```

### Decoy generation

When building the 8-card icon grid, `getDecoys(excludeLetter, 4)` picks 4 random word examples from other letters in the pool, ensuring no word appears twice and none starts with the current letter.

---

## Canvas Validation

Validation uses a **stroke-path reference** rather than a filled shape, so the user only needs to trace the outline:

1. An offscreen canvas renders the letter with `strokeText` at line width 22 px
2. The dark pixels of that stroke become the reference set
3. The same pixel positions are sampled on the user's canvas
4. `score = coveredPixels / referencePixels * 100`
5. **Pass threshold: 30%** — enough to confirm tracing without requiring full fill

The on-canvas guide uses `setLineDash([18, 10])` so the user can see the exact path to follow, with a faint filled shape behind it as a shape reference.

---

## Localisation

Two locales are supported in `src/data/i18n.js`:

| | Hebrew (`he`) | English (`en`) |
|---|---|---|
| Default | Yes | No |
| Text direction | RTL | LTR |
| Toggle label shown | `English` | `עברית` |

The `language` signal drives a computed `t` signal that every component reads. Switching language is instant and works on any screen.

---

## State Management

All state lives in `src/signals/gameState.js` using `@preact/signals-react`:

| Signal | Type | Description |
|--------|------|-------------|
| `gamePhase` | string | `'welcome'`, `'stage'`, `'result'`, or `'completion'` |
| `userName` | string | Entered on the welcome screen |
| `currentStage` | number | 0–9 |
| `selectedColor` | string | Hex color for the brush |
| `stageResults` | array | `{ letter, score, passed }` per completed stage |
| `selectedLetters` | array | 10 randomly picked letter objects for this session |
| `language` | string | `'he'` or `'en'` |
| `t` | computed | Current translation object from `i18n.js` |

`resetGame()` resets all signals and calls `pickRandomLetters(10)` to generate a fresh session.
