import { BasePuzzle } from "./base-puzzle";
import { dgr, dre, dnl, dnr, ddl, dt, ddr, s, dsept, dsepb, dpl, dpa, dph, dul, dur } from "@/aoc-toolbox/pretty-print";

export default class Puzzle3 extends BasePuzzle {

  private memory: string = ''
  private mulRgx = /mul\((\d*),(\d*)\)/gm
  private conditionalMulRgx = /mul\((\d*),(\d*)\)|do\(\)|don't\(\)/gm

  run(): void {
    this.loadInput('03')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    const title = 'Mull It Over'
    console.log(`\n  ${dgr} _____________________________________________________________________ ${dre}`)
    console.log(`  ${dnl}                                                                     ${dnr}`)
    console.log(`  ${ddl}                         ${  dt(3, title)  }                         ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}   #                     ${     dsept     }               #          ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                         ${     dsepb     }      #                   ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                                                                     ${ddr}`)
    console.log(`  ${ddl} ${dpl('mul() instructions:       ')}   ${dpa(this.partOne())      } ${ddr}`)
    console.log(`  ${ddl} ${dph('Active mul() instructions:')}   ${dpa(this.partTwo())      } ${ddr}`)
    console.log(`  ${dul}_____________________________________________________________________${dur}`)
  }

  protected setup(): void {
    this.memory = this.input.join('')
  }

  protected partOne(): number {
    return [...this.memory.matchAll(this.mulRgx)]
      .map(instr => parseInt(instr[1] as string) * parseInt(instr[2] as string))
      .reduce((cur, acc) => acc += cur, 0)
  }

  protected partTwo(): number {
    let canMul = true
    return [...this.memory.matchAll(this.conditionalMulRgx)]
      .filter(instr => {
        if (instr[0] === 'do()')          canMul = true
        else if (instr[0] === 'don\'t()') canMul = false
        return canMul && instr[0] !== 'do()'
      })
      .map(instr => parseInt(instr[1] as string) * parseInt(instr[2] as string))
      .reduce((cur, acc) => acc += cur, 0)
  }
}