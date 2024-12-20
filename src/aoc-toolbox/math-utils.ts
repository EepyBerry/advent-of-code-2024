import { CardinalOrientation, Matrix2, Vector2 } from "./types"

// ------------------------------------------------------------------------------------------------
// POINT OPERATIONS

export const VEC2_ZERO = { x:0, y: 0 }
export const ORIENTATIONS = [
  CardinalOrientation.NORTH, CardinalOrientation.EAST,
  CardinalOrientation.SOUTH, CardinalOrientation.WEST
]

export function clonePoint(p: Vector2) {
  return { x: p.x, y: p.y }
}
export function pointEquals(p1: Vector2, p2: Vector2): boolean {
  return p1.x === p2.x && p1.y === p2.y
}
export function pointDiff(p1: Vector2, p2: Vector2): Vector2 {
  return { x: p2.x - p1.x, y: p2.y - p1.y }
}
export function addPoints(p1: Vector2, p2: Vector2): Vector2 {
  return { x: p1.x + p2.x, y: p1.y + p2.y }
}
export function subtractPoints(p1: Vector2, p2: Vector2): Vector2 {
  return { x: p1.x - p2.x, y: p1.y - p2.y }
}
export function sortPoints(arr: Vector2[]) {
  return arr.sort((a, b) => a.y-b.y !== 0 ? a.y-b.y : a.x-b.x)
}
export function uniquePoints(arr: Vector2[]): Vector2[] {
  return arr.filter((v1, i, a) => 
    a.findIndex(v2 => v2.x === v1.x && v2.y === v1.y) === i
  )
}

export function hasPoint(arr: Vector2[], point: Vector2): boolean {
  return arr.find(p => p.x === point.x && p.y === point.y) !== undefined
}

export function pointPairs(arr: Vector2[]): Vector2[][] {
  return arr.flatMap((a, ai) => 
    arr.flatMap((b, bi) => 
      (ai > bi) ? [[a,b]] : []
    )
  )
}

export function pointFromIndex(pos: Vector2, n: number) {
  switch (n) {
    case 0: return { x: pos.x, y: pos.y-1 }
    case 1: return { x: pos.x+1, y: pos.y }
    case 2: return { x: pos.x, y: pos.y+1 }
    case 3: return { x: pos.x-1, y: pos.y }
  }
  throw new Error('Cannot get point: index must be 0, 1, 2 or 3')
}
export function pointFromOrientation(pos: Vector2, orientation: CardinalOrientation) {
  switch (orientation) {
    case CardinalOrientation.NORTH: return { x: pos.x, y: pos.y-1 }
    case CardinalOrientation.EAST:  return { x: pos.x+1, y: pos.y }
    case CardinalOrientation.SOUTH: return { x: pos.x, y: pos.y+1 }
    case CardinalOrientation.WEST:  return { x: pos.x-1, y: pos.y }
  }
}

// ------------------------------------------------------------------------------------------------
// NUMBER OPERATIONS

/**
 * **Recursive** Greatest Common Divisor (or Factor)
 * @returns the GCD of a & b
 * @remarks *Do **not** use this function for large numbers!*
 */
export function rgcd(a: number, b: number) {
  if (b === 0) return a
  return rgcd(b, a % b)
}

/**
 * True modulus operation (in JS, % is the remainder operation)
 * @param n dividend
 * @param d divisor
 */
export function mod(n: number, d: number) {
  return ((n % d) + d) % d
}

// ------------------------------------------------------------------------------------------------
// ARRAY OPERATIONS

export function pairs(arr: any[]) {
  return arr.flatMap((a, ai) => 
    arr.flatMap((b, bi) => 
      (ai > bi) ? [[a,b]] : []
    )
  )
}
export function minOf(arr: number[]) {
  return Math.min(...arr)
}

// ------------------------------------------------------------------------------------------------
// MATRIX OPERATIONS

export function cramerize2(m: Matrix2, c: number[]): number[] {
  let c1 = c[0], c2 = c[1]

  const determinant = m.a1*m.b2 - m.a2*m.b1
  if (determinant === 0) {
    throw new Error('Cannot cramerize: matrix determinant is zero (thus not invertible)')
  }

  const dx = c1*m.b2 - m.b1*c2
  const dy = m.a1*c2 - c1*m.a2
  return [dx/determinant, dy/determinant]
}