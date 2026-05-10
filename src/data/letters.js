const LETTER_DATA = {
  A: { hint: 'Draw two diagonals meeting at the top, then a crossbar', examples: [{ emoji: '🍎', word: 'Apple' }, { emoji: '🐜', word: 'Ant' }, { emoji: '🐊', word: 'Alligator' }, { emoji: '🥑', word: 'Avocado' }] },
  B: { hint: 'Draw a vertical line with two bumps on the right', examples: [{ emoji: '🐻', word: 'Bear' }, { emoji: '🦋', word: 'Butterfly' }, { emoji: '🎈', word: 'Balloon' }, { emoji: '🐝', word: 'Bee' }] },
  C: { hint: 'Draw a curve that opens to the right', examples: [{ emoji: '🐱', word: 'Cat' }, { emoji: '🥕', word: 'Carrot' }, { emoji: '🦀', word: 'Crab' }, { emoji: '☁️', word: 'Cloud' }] },
  D: { hint: 'Draw a vertical line then a large curve on the right', examples: [{ emoji: '🐕', word: 'Dog' }, { emoji: '🐬', word: 'Dolphin' }, { emoji: '🦆', word: 'Duck' }, { emoji: '🐉', word: 'Dragon' }] },
  E: { hint: 'Draw a vertical line with three horizontal lines going right', examples: [{ emoji: '🐘', word: 'Elephant' }, { emoji: '🦅', word: 'Eagle' }, { emoji: '🥚', word: 'Egg' }, { emoji: '🌍', word: 'Earth' }] },
  F: { hint: 'Draw a vertical line with two horizontal lines going right', examples: [{ emoji: '🐟', word: 'Fish' }, { emoji: '🦊', word: 'Fox' }, { emoji: '🐸', word: 'Frog' }, { emoji: '🌸', word: 'Flower' }] },
  G: { hint: 'Draw a C-shape then add a horizontal bar on the right', examples: [{ emoji: '🦒', word: 'Giraffe' }, { emoji: '🦍', word: 'Gorilla' }, { emoji: '🍇', word: 'Grape' }, { emoji: '🐐', word: 'Goat' }] },
  H: { hint: 'Draw two vertical lines connected by a horizontal bar in the middle', examples: [{ emoji: '🐴', word: 'Horse' }, { emoji: '🦛', word: 'Hippo' }, { emoji: '🎩', word: 'Hat' }, { emoji: '🍯', word: 'Honey' }] },
  I: { hint: 'Draw a straight line from top to bottom', examples: [{ emoji: '🦎', word: 'Iguana' }, { emoji: '🍦', word: 'Ice Cream' }, { emoji: '🏝️', word: 'Island' }, { emoji: '🖋️', word: 'Ink' }] },
  J: { hint: 'Draw a vertical line that curves left at the bottom', examples: [{ emoji: '🐆', word: 'Jaguar' }, { emoji: '🪼', word: 'Jellyfish' }, { emoji: '🧃', word: 'Juice' }, { emoji: '🧥', word: 'Jacket' }] },
  K: { hint: 'Draw a vertical line then two diagonals meeting at the middle', examples: [{ emoji: '🦘', word: 'Kangaroo' }, { emoji: '🐨', word: 'Koala' }, { emoji: '🪁', word: 'Kite' }, { emoji: '🔑', word: 'Key' }] },
  L: { hint: 'Draw a vertical line then a horizontal line at the bottom', examples: [{ emoji: '🦁', word: 'Lion' }, { emoji: '🍋', word: 'Lemon' }, { emoji: '🐞', word: 'Ladybug' }, { emoji: '🍃', word: 'Leaf' }] },
  M: { hint: 'Draw two vertical lines with two diagonals meeting in the middle', examples: [{ emoji: '🐒', word: 'Monkey' }, { emoji: '🐭', word: 'Mouse' }, { emoji: '🍄', word: 'Mushroom' }, { emoji: '🌙', word: 'Moon' }] },
  N: { hint: 'Draw two vertical lines connected by a diagonal', examples: [{ emoji: '🐳', word: 'Narwhal' }, { emoji: '🪺', word: 'Nest' }, { emoji: '🌙', word: 'Night' }, { emoji: '🍜', word: 'Noodle' }] },
  O: { hint: 'Draw a full circle', examples: [{ emoji: '🐙', word: 'Octopus' }, { emoji: '🍊', word: 'Orange' }, { emoji: '🦉', word: 'Owl' }, { emoji: '🫒', word: 'Olive' }] },
  P: { hint: 'Draw a vertical line with a bump on the upper right', examples: [{ emoji: '🐧', word: 'Penguin' }, { emoji: '🦜', word: 'Parrot' }, { emoji: '🍕', word: 'Pizza' }, { emoji: '🎃', word: 'Pumpkin' }] },
  Q: { hint: 'Draw a full circle then a small diagonal at the bottom right', examples: [{ emoji: '🐦', word: 'Quail' }, { emoji: '👸', word: 'Queen' }, { emoji: '🦘', word: 'Quokka' }, { emoji: '✒️', word: 'Quill' }] },
  R: { hint: 'Draw a vertical line, a bump on the upper right, then a diagonal leg', examples: [{ emoji: '🐰', word: 'Rabbit' }, { emoji: '🦝', word: 'Raccoon' }, { emoji: '🌈', word: 'Rainbow' }, { emoji: '🌹', word: 'Rose' }] },
  S: { hint: 'Draw a curve to the left then a curve to the right', examples: [{ emoji: '🐍', word: 'Snake' }, { emoji: '⭐', word: 'Star' }, { emoji: '🍓', word: 'Strawberry' }, { emoji: '🌞', word: 'Sun' }] },
  T: { hint: 'Draw a horizontal line on top then a vertical line in the middle', examples: [{ emoji: '🐯', word: 'Tiger' }, { emoji: '🐢', word: 'Turtle' }, { emoji: '🌳', word: 'Tree' }, { emoji: '🚂', word: 'Train' }] },
  U: { hint: 'Draw two vertical lines connected by a curve at the bottom', examples: [{ emoji: '☂️', word: 'Umbrella' }, { emoji: '🦄', word: 'Unicorn' }, { emoji: '🛸', word: 'UFO' }, { emoji: '🦔', word: 'Urchin' }] },
  V: { hint: 'Draw two diagonals meeting at a point at the bottom', examples: [{ emoji: '🦅', word: 'Vulture' }, { emoji: '🎻', word: 'Violin' }, { emoji: '🌋', word: 'Volcano' }, { emoji: '🚐', word: 'Van' }] },
  W: { hint: 'Draw four diagonals like two V shapes side by side', examples: [{ emoji: '🐋', word: 'Whale' }, { emoji: '🐺', word: 'Wolf' }, { emoji: '🍉', word: 'Watermelon' }, { emoji: '🪱', word: 'Worm' }] },
  X: { hint: 'Draw two diagonals crossing each other', examples: [{ emoji: '🦊', word: 'Fox' }, { emoji: '🎵', word: 'Xylophone' }, { emoji: '📦', word: 'Box' }, { emoji: '🔬', word: 'X-ray' }] },
  Y: { hint: 'Draw two diagonals meeting in the middle then a vertical line down', examples: [{ emoji: '🐃', word: 'Yak' }, { emoji: '🪀', word: 'Yo-yo' }, { emoji: '⛵', word: 'Yacht' }, { emoji: '🥛', word: 'Yogurt' }] },
  Z: { hint: 'Draw a horizontal line, a diagonal, then a horizontal line', examples: [{ emoji: '🦓', word: 'Zebra' }, { emoji: '🎈', word: 'Zeppelin' }, { emoji: '🤐', word: 'Zipper' }, { emoji: '🦁', word: 'Zoo' }] },
}

const LOWERCASE_HINTS = {
  a: 'Draw a small circle on the left then a vertical stroke on the right',
  b: 'Draw a vertical line then a bump on the lower right',
  c: 'Draw a small curve that opens to the right',
  d: 'Draw a small circle then a vertical line on the right going up',
  e: 'Draw a horizontal line then curve up and around',
  f: 'Draw a curve at the top then a vertical line with a crossbar',
  g: 'Draw a small circle then a curved tail going below the line',
  h: 'Draw a vertical line then an arch with a leg on the right',
  i: 'Draw a short vertical stroke with a dot above',
  j: 'Draw a short vertical stroke that curves left at the bottom, with a dot above',
  k: 'Draw a vertical line then two small diagonals meeting at the middle',
  l: 'Draw a tall vertical line that curves at the bottom',
  m: 'Draw two arches side by side with legs going down',
  n: 'Draw a single arch with a leg going down on the right',
  o: 'Draw a small full circle',
  p: 'Draw a vertical line going below then a bump on the upper right',
  q: 'Draw a small circle then a vertical line on the right going below',
  r: 'Draw a short vertical line then a small curve to the right',
  s: 'Draw a small S-shaped curve',
  t: 'Draw a tall vertical line with a small crossbar near the top',
  u: 'Draw a small U-shape with a leg on the right',
  v: 'Draw two small diagonals meeting at the bottom',
  w: 'Draw four small diagonals like two small v shapes',
  x: 'Draw two small diagonals crossing each other',
  y: 'Draw two diagonals meeting in the middle then a tail going below',
  z: 'Draw a small horizontal line, a diagonal, then a horizontal line',
}

export const ALL_LETTERS = [
  ...Object.entries(LETTER_DATA).map(([letter, data]) => ({
    letter,
    isUppercase: true,
    hint: data.hint,
    examples: data.examples,
  })),
  ...Object.entries(LETTER_DATA).map(([upper, data]) => {
    const lower = upper.toLowerCase()
    return {
      letter: lower,
      isUppercase: false,
      hint: LOWERCASE_HINTS[lower],
      examples: data.examples,
    }
  }),
]

export function pickRandomLetters(count = 10) {
  const shuffled = [...ALL_LETTERS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getDecoys(excludeLetter, count = 4) {
  const upper = excludeLetter.toUpperCase()
  const pool = ALL_LETTERS.filter(l => l.letter.toUpperCase() !== upper)
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const result = []
  const seen = new Set()
  for (const l of shuffled) {
    for (const ex of l.examples) {
      if (!seen.has(ex.word) && result.length < count) {
        seen.add(ex.word)
        result.push(ex)
      }
    }
    if (result.length >= count) break
  }
  return result
}
