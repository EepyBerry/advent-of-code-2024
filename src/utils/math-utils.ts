import type { Point } from "./types.ts"

export function pointEquals(p1: Point, p2: Point) {
  return p1.x === p2.x && p1.y === p2.y
}
export function pointDiff(p1: Point, p2: Point): Point {
  return { x: p2.x - p1.x, y: p2.y - p1.y }
}
export function addPoints(p1: Point, p2: Point) {
  return { x: p1.x + p2.x, y: p1.y + p2.y }
}
export function subtractPoints(p1: Point, p2: Point) {
  return { x: p1.x - p2.x, y: p1.y - p2.y }
}
export function pointPairs(arr: Point[]): Point[][] {
  return arr.flatMap((a, ai) => 
    arr.flatMap((b, bi) => 
      (ai > bi) ? [[a,b]] : []
    )
  )
}
export function pairs(arr: any[]) {
  return arr.flatMap((a, ai) => 
    arr.flatMap((b, bi) => 
      (ai > bi) ? [[a,b]] : []
    )
  )
}