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
    return this.equations.filter(eq => this.testEquation(eq[0], eq.slice(1)))
      .map(eq => eq[0])
      .reduce((acc, cur) => acc += cur, 0)
  }

  protected partTwo(): number {
    return 0
  }

  private testEquation(value: number, numbers: number[]): boolean {
    const pdts = this.getOpProducts(numbers.length-1)
    return pdts.some(pdt => this.buildEquation(numbers, pdt)() === value)
  }

  private buildEquation(numbers: number[], opProduct: string): Function {
    return Function("return " + patchString('('.repeat(numbers.length-1) + numbers.join(')#'), opProduct))
  }

  private getOpProducts(length: number) {
    const products: string[] = []
    for (let b = 0; b < Math.pow(2, length); b++) {
      products.push(ntob(b, 2, length).replaceAll('0', '*').replaceAll('1', '+'))
    }
    return products
  }
}