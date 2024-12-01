export function formatPuzzleAnswer(label: string, answer: number) {
  return `  ⎸  ${label.padEnd(32, ' ') + answer.toString().padEnd(35, ' ')} ⎹`
}