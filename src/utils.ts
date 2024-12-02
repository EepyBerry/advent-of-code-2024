export function toAnswerString(n: number) {
  return numberPadEnd(n, 38, ' ')
}

export function numberPadEnd(n: number, width: number, pad: string) {
  return n.toString().padEnd(width, pad)
}