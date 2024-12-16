import { concatInts, formatAnswer } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { dgr, dre, dnl, dnr, ddl, dt, ddr, s, dsept, dsepb, dpl, dpa, dph, dul, dur } from "@/aoc-toolbox/pretty-print";

export default class Puzzle7 extends BasePuzzle {

  private equations: number[][] = []

  run(): void {
    this.loadInput('07')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    const title = 'Bridge Repair'
    console.log(`\n  ${dgr} _____________________________________________________________________ ${dre}`)
    console.log(`  ${dnl}                                                                     ${dnr}`)
    console.log(`  ${ddl}   #                    ${   dt(7, title)  }                         ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}             #           ${     dsept     }                          ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                         ${     dsepb     }                      #   ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                                                                     ${ddr}`)
    console.log(`  ${ddl} ${dpl('Total calibration result:  ')}  ${dpa(this.partOne())      } ${ddr}`)
    console.log(`  ${ddl} ${dph('Updated calibration result:')}  ${dpa(this.partTwo())      } ${ddr}`)
    console.log(`  ${dul}_____________________________________________________________________${dur}`)
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