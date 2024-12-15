// chars
export const s = '\x1b[38;5;220m★\x1b[0m'
export const d = '\x1b[38;5;246m|\x1b[0m'
export const by = (author: string) => `\x1b[38;5;204m${author}\x1b[0m`

// links
export const gh = (by: string) => `\x1b[34mhttps://github.com/${by}\x1b[0m`
export const aoc = `\x1b[34mhttps://adventofcode.com\x1b[0m`

// guardian dialog
export const gb = `\x1b[38;5;130m`
export const gd = `\x1b[38;5;130m|\x1b[0m`
export const gr = `\x1b[0m`
export const gt = `\x1b[38;5;226m`
export const gs = `\x1b[38;5;220m`

// daycard
export const dt = (n: number, t: string) => `\x1b[0mDay ${n}: ${t}\x1b[0m`  // daycard title
export const dpl = (l: string) => `\x1b[92m${l}\x1b[0m`                     // daycard puzzle label
export const dph = (l: string) => `\x1b[38;5;204m${l}\x1b[0m`               // daycard puzzle label (hard)
export const dpa = (a: number) => `\x1b[0m${apad(a)}\x1b[0m`                // daycard puzzle answer
export const dgr = `\x1b[38;5;246m`                                         // daycard grey
export const dre = `\x1b[0m`                                                // daycard reset
export const dnl = `${dgr}/`                                                // daycard notch left
export const dnr = `${'\\'}${dre}`                                          // daycard notch right
export const dul = `${dgr}${'\\'}`                                          // daycard under-notch left
export const dur = `/${dre}`                                                // daycard under-notch right
export const ddl = `${dgr}⎸${dre}`                                          // daycard divider left
export const ddr = `${dgr}⎹${dre}`                                          // daycard divider right
export const dsept = `${dgr} _    ______    _ ${dre}`                       // daycard separator top
export const dsepb = `${dgr}(_)  |______|  (_)${dre}`                       // daycard separator bottom

export function apad(n: number) {
  return n.toString().padEnd(38, ' ');
}