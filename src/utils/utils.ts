export function setCharAt(str: string, index: number, chr: string) {
  if(index > str.length-1) {
    return str;
  }
  return str.substring(0,index) + chr + str.substring(index+1);
}
export function toAnswerString(n: number) {
  return numPadEnd(n, 38, ' ');
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