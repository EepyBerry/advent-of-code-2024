import { countMatches, toAnswerString, xbRgx } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

type TreeNode = { value: any, children?: TreeNode[] }

export default class Puzzle5 extends BasePuzzle {

  private pages: string[][] = []
  private updates: string[][] = []

  run(): void {
    this.loadInputRaw('05e')
    if (!this.input) return
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                     Day 5: Print Queue              ★           ⎹`)
    console.log('  ⎸                           _    ______    _                           ⎹')
    console.log('  ⎸                     ★   (_)  |______|  (_)                          ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Sum of middle numbers:       ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Nb of X-MAS occurrences:     ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.pages = this.input.slice(0, this.input.indexOf('\r')).map(str => str.replaceAll('\r', '').split('|')).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    this.updates = this.input.slice(this.input.indexOf('\r')+1).map(str => str.replaceAll('\r', '').split(','))
  }

  protected partOne(): number {
    const orderedUpdates = this.updates.filter(u => {
      let updateRules = this.pages.filter(p => u.includes(p[0]) && u.includes(p[1]))
      console.log(updateRules)
      return this.isUpdateOrdered(u, updateRules)
    })
    console.log(orderedUpdates)
    return 0
  }

  protected partTwo(): number {
    return 0
  }

  private isUpdateOrdered(update: string[], rules: string[][]) {
    return update.every((v, idx , arr) => {
      if (idx === 0)                   return rules.every(r => r[1] !== arr[idx])
      else if (idx === arr.length - 1) return rules.every(r => r[1] === arr[idx])
      else                             return true
    })
  }
}