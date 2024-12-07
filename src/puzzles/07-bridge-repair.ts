import { ntob, toAnswerString } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle7 extends BasePuzzle {

  private equations: number[][] = []
  private permCache1: { nums: number, perms: string[][] }[] = []
  private permCache2: { nums: number, perms: string[][] }[] = []

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
    this.equations.forEach(eq => {
      if (!this.permCache1.find(pc => pc.nums === eq.length-2)) {
        this.permCache1.push({ nums: eq.length-2, perms: this.generatePermutations(eq.length-2, ['+', '*'])})
      }
      if (!this.permCache2.find(pc => pc.nums === eq.length-2)) {
        this.permCache2.push({ nums: eq.length-2, perms: this.generatePermutations(eq.length-2, ['+', '*', '|'])})
      }
    })
    this.permCache1.sort((a, b) => a.nums - b.nums)
    this.permCache2.sort((a, b) => a.nums - b.nums)
  }

  protected partOne(): number {
    return this.equations.filter(eq => this.testEquation(eq[0], eq.slice(1), ['*', '+']))
      .map(eq => eq[0])
      .reduce((acc, cur) => acc += cur, 0)
  }

  protected partTwo(): number {
    return this.equations.filter(eq => this.testEquation(eq[0], eq.slice(1), ['|', '*', '+']))
    .map(eq => eq[0])
    .reduce((acc, cur) => acc += cur, 0)
  }

  // ----------------------------------------------------------------------------------------------

  private testEquation(value: number, numbers: number[], ops: string[]): boolean {
    let eqTotal = 0
    let permSeed = 0
    let permStack: string[] = [], numStack: number[] = []
    const maxIterations = Math.pow(ops.length, numbers.length-1)
    while(permSeed < maxIterations) {
      numStack.push(...numbers)
      permStack.push(...this.getPermutation(numbers.length-1, permSeed, ops.length-1))

      eqTotal = numStack[0]
      numStack.splice(0, 1)
      while (numStack.length > 0) {
        eqTotal = this.calc(eqTotal, numStack[0], permStack[0])
        numStack.splice(0, 1)
        permStack.splice(0, 1)
        if (eqTotal > value) break
      }
      if (eqTotal === value) {
        return true
      }
      numStack.splice(0)
      permStack.splice(0)
      permSeed++
    }
    return false
  }
  
  private generatePermutations(length: number, ops: string[]) {
    const products: string[][] = []
    for (let b = 0; b < Math.pow(ops.length, length); b++) {
      products.push(this.setOps(ntob(b, ops.length, length), ops).split(''))
    }
    return products
  }

  private getPermutation(length: number, seed: number, t: number): string[] {
    return t === 1
      ? this.permCache1.find(pc => pc.nums === length)!.perms[seed]
      : this.permCache2.find(pc => pc.nums === length)!.perms[seed]
  }

  private setOps(nstr: string, digitOps: string[]): string {
    digitOps.forEach((d, i) => nstr = nstr.replaceAll(i.toString(), d))
    return nstr
  }

  private calc(a: number, b: number, op: string): number {
    switch (op) {
      case '|': return parseInt(a.toString() + b.toString())
      case '*': return a*b
      case '+': return a+b
    }
    return -1
  }
}