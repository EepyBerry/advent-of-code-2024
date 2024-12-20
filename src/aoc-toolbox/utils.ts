import { CardinalOrientation, Vector2 } from "./types";

export function setCharAt(str: string, index: number, chr: string): string {
  if(index > str.length-1) {
    return str;
  }
  return str.substring(0,index) + chr + str.substring(index+1);
}
export function insertAt(str: string, chunk: string, position: number) {
  return str.substring(0, position) + chunk + str.substring(position)
}
export function moveStringAt(str: string, chunk: string, position: number) {
  return str.substring(0, position) + chunk + str.substring(position, str.length-chunk.length-1)
}
export function swapArrayElements(arr: any[], from: number, to: number) {
  [arr[from], arr[to]] = [arr[to], arr[from]]
}

export function patchString(str: string, patch: string, token: string = '#') {
  [...str.matchAll(new RegExp(`${token}`, 'g'))].forEach((match, idx) => {
    str = setCharAt(str, match.index, patch[idx])
  })
  return str
}
export function concatInts(a: number, b: number) {
  return parseInt(a.toString() + b.toString())
}

export function formatAnswer(n: number|string) {
  return typeof n === 'number' ? numPadEnd(n, 38, ' ') : n.padEnd(38, ' ');
}

// --------------------------------------------------------------------------------------------------------------------

export function numPadEnd(n: number, width: number, pad: string) {
  return n.toString().padEnd(width, pad);
}
export function numToBase(n: number, r: number, length: number) {
  return n.toString(r).padStart(length, '0')
}

// --------------------------------------------------------------------------------------------------------------------

export function insertInArray(arr: any[], value: any, position: number): void {
  arr.splice(position, 0, value)
}
export function deepClone(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}
export function pairs(arr: any[]) {
  return arr.flatMap((a, ai) => 
    arr.flatMap((b, bi) => 
      (ai > bi) ? [[a,b]] : []
    )
  )
}

// --------------------------------------------------------------------------------------------------------------------

export function countMatches(str: string, rgx: RegExp) {
  return [...str.matchAll(rgx)].length;
}

// --------------------------------------------------------------------------------------------------------------------

export function isHorizontal(orientation: CardinalOrientation) {
  return [CardinalOrientation.EAST,CardinalOrientation.WEST].includes(orientation)
}
export function getNextCardinalPosition(curPos: Vector2, orientation: CardinalOrientation) {
  switch (orientation) {
    case CardinalOrientation.NORTH: return { x: curPos.x, y: curPos.y-1 }
    case CardinalOrientation.EAST:  return { x: curPos.x+1, y: curPos.y }
    case CardinalOrientation.SOUTH: return { x: curPos.x, y: curPos.y+1 }
    case CardinalOrientation.WEST:  return { x: curPos.x-1, y: curPos.y }
  }
}

// --------------------------------------------------------------------------------------------------------------------

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))