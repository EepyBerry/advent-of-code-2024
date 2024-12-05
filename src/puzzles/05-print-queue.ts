import { countMatches, toAnswerString, xbRgx } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

type TreeNode = { value: any, children?: TreeNode[] }

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
    console.log(`  ⎸ Sum of middle numbers:       ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Nb of X-MAS occurrences:     ${toAnswerString(this.partTwo())} ⎹`)
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
    return this.updates.filter(u => {
      let updateRules = this.rules.filter(p => u.includes(p[0]) && u.includes(p[1]))
      return this.isUpdateOrdered(u, updateRules)
    }).reduce((acc, cur) => acc += parseInt(cur[Math.floor(cur.length / 2)]), 0)
  }

  protected partTwo(): number {
    return 0
  }

  private isUpdateOrdered(update: string[], rules: string[][]) {
    console.log(rules)
    return update.every((v, idx , arr) => rules.filter(r => r[0] === v).length === arr.length - 1 - idx)
  }
}