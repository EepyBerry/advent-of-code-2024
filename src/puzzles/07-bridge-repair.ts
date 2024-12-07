import { ntob, patchString, toAnswerString } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle7 extends BasePuzzle {

  private equations: number[][] = []

  run(): void {
    this.loadInput('07')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                     Day 7: Bridge Repair                        ⎹`)
    console.log('  ⎸             ★            _    ______    _                           ⎹')
    console.log('  ⎸                         (_)  |______|  (_)                      ★   ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Total calibration result:    ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Updated calibration result:  ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.input.forEach(l => this.equations.push([...l.matchAll(/\d{1,}/g).map(m => parseInt(m[0]))]))
  }

  protected partOne(): number {
    return this.equations.filter(eq => this.testEquation(eq[0], eq.slice(1), ['*', '+']))
      .map(eq => eq[0])
      .reduce((acc, cur) => acc += cur, 0)
  }

  protected partTwo(): number {
    return this.equations.filter(eq => this.testEquation(eq[0], eq.slice(1), ['*', '+', '|']))
    .map(eq => eq[0])
    .reduce((acc, cur) => acc += cur, 0)
  }

  // ----------------------------------------------------------------------------------------------

  private testEquation(value: number, numbers: number[], ops: string[]): boolean {
    const pdts = this.getOpPermutations(numbers.length-1, ops)
    let eqTotal = 0
    let numStack = [...numbers], permStack = []
    for (let p = 0; p < pdts.length; p++) {
      numStack = [...numbers]
      permStack = [...pdts[p]]
      eqTotal = numStack[0]
      numStack.splice(0, 1)
      while (numStack.length > 0) {
        eqTotal = this.calc(eqTotal, numStack[0], permStack[0])
        numStack.splice(0, 1)
        permStack.splice(0, 1)
        if (eqTotal > value) break
      }
      if (eqTotal === value) return true
    }
    return false
  }

  private getOpPermutations(length: number, ops: string[]) {
    const products: string[][] = []
    for (let b = 0; b < Math.pow(ops.length, length); b++) {
      products.push(this.setOps(ntob(b, ops.length, length), ops).split(''))
    }
    return products
  }

  private setOps(nstr: string, digitOps: string[]) {
    digitOps.forEach((d, i) => nstr = nstr.replaceAll(i.toString(), d))
    return nstr
  }

  private calc(a: number, b: number, op: string): number {
    switch (op) {
      case '*': return a*b
      case '+': return a+b
      case '|': return parseInt(a.toString() + b.toString())
    }
    return -1
  }
}