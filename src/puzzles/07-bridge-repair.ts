import { concatInts, toAnswerString } from "../aoc-toolbox/utils.ts";
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
    console.log(`  ⎸   ★                    Day 7: Bridge Repair                         ⎹`)
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
    return this.equations
      .filter(eq => this.testEquation(eq[0], eq.slice(1), 2))
      .map(eq => eq[0])
      .reduce((acc, cur) => acc += cur, 0)
  }

  protected partTwo(): number {
    return this.equations
      .filter(eq => this.testEquation(eq[0], eq.slice(1), 3))
      .map(eq => eq[0])
      .reduce((acc, cur) => acc += cur, 0)
  }

  // ----------------------------------------------------------------------------------------------

  private testEquation(target: number, numbers: number[], opLength: number): boolean {
    return this.runEquationStep(numbers[0], target, numbers.slice(1), opLength)
  }

  private runEquationStep(total: number, target: number, numbers: number[], opLength: number): boolean {
    if (total > target) return false
    if (numbers.length === 0) return total == target

    return this.runEquationStep(total+numbers[0], target, numbers.slice(1), opLength)
      || this.runEquationStep(total*numbers[0], target, numbers.slice(1), opLength)
      || (opLength === 3 ? this.runEquationStep(concatInts(total, numbers[0]), target, numbers.slice(1), opLength) : false)
  }
}