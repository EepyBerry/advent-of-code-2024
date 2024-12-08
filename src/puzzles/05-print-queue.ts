import { toAnswerString } from "../aoc-toolbox/utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle5 extends BasePuzzle {

  private rules: string[][] = []
  private updates: string[][] = []
 
  run(): void {
    this.loadInputRaw('05')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                     Day 5: Print Queue              ★           ⎹`)
    console.log('  ⎸                          _    ______    _                           ⎹')
    console.log('  ⎸                     ★   (_)  |______|  (_)                          ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Sum of mid. numbers:         ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Sum of sorted mid. numbers:  ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.rules = this.input
      .slice(0, this.input.indexOf('\r'))
      .map(str => str.replaceAll('\r', '').split('|'))
      .toSorted((a, b) => parseInt(a[0]) - parseInt(b[0]))
    this.updates = this.input
      .slice(this.input.indexOf('\r')+1, this.input.length-1)
      .map(str => str.replaceAll('\r', '').split(','))
  }

  protected partOne(): number {
    return this.updates
      .filter(u => this.isUpdateOrdered(u))
      .reduce((acc, cur) => acc += parseInt(cur[Math.floor(cur.length / 2)]), 0)
  }

  protected partTwo(): number {
    return this.updates
      .filter(u => !this.isUpdateOrdered(u))
      .map(u => this.orderUpdate(u))
      .reduce((acc, cur) => acc += parseInt(cur[Math.floor(cur.length / 2)]), 0)
  }
  
  // ----------------------------------------------------------------------------------------------

  private isUpdateOrdered(update: string[]): boolean {
    const rules = this.getRelevantRules(update)
    return update.every((v, idx , arr) => rules.filter(r => r[0] === v).length === arr.length - 1 - idx)
  }

  private orderUpdate(update: string[]): string[] {
    const numOccurs: { v: string, c: number }[] = []
    this.getRelevantRules(update)
      .map(r => r[0])
      .sort((a, b) => parseInt(b) - parseInt(a))
      .forEach(v => {
        const oIdx = numOccurs.findIndex(o => o.v === v)
        if (oIdx >= 0) numOccurs[oIdx].c++
        else numOccurs.push({ v, c: 1 })
      })
    numOccurs.push({ v: update.find(v => !(numOccurs.map(o => o.v)).includes(v))!, c: 1 })
    return numOccurs.sort((a, b) => b.c - a.c).map(o => o.v)
  }

  private getRelevantRules(update: string[]) {
    return this.rules.filter(p => update.includes(p[0]) && update.includes(p[1]))
  }
}