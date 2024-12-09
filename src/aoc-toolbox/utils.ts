export function setCharAt(str: string, index: number, chr: string) {
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

export function toAnswerString(n: number) {
  return numPadEnd(n, 38, ' ');
}

// --------------------------------------------------------------------------------------------------------------------

export function numPadEnd(n: number, width: number, pad: string) {
  return n.toString().padEnd(width, pad);
}
export function numToBase(n: number, r: number, length: number) {
  return n.toString(r).padStart(length, '0')
}

// --------------------------------------------------------------------------------------------------------------------

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