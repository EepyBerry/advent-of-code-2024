import type { Point } from "./types"

export const POINT_ZERO = { x:0, y: 0 }

export function clonePoint(p: Point) {
  return { x: p.x, y: p.y }
}
export function pointEquals(p1: Point, p2: Point): boolean {
  return p1.x === p2.x && p1.y === p2.y
}
export function pointDiff(p1: Point, p2: Point): Point {
  return { x: p2.x - p1.x, y: p2.y - p1.y }
}
export function addPoints(p1: Point, p2: Point): Point {
  return { x: p1.x + p2.x, y: p1.y + p2.y }
}
export function subtractPoints(p1: Point, p2: Point): Point {
  return { x: p1.x - p2.x, y: p1.y - p2.y }
}
export function sortPoints(arr: Point[]) {
  return arr.sort((a, b) => a.y-b.y !== 0 ? a.y-b.y : a.x-b.x)
}
export function uniquePoints(arr: Point[]): Point[] {
  return arr.filter((v1, i, a) => 
    a.findIndex(v2 => v2.x === v1.x && v2.y === v1.y) === i
  )
}

export function hasPoint(arr: Point[], point: Point): boolean {
  return arr.find(p => p.x === point.x && p.y === point.y) !== undefined
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