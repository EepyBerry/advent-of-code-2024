import { toAnswerString } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

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

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                         Day 3: Mull It Over                         ⎹`)
    console.log('  ⎸   ★                      _    ______    _               ★           ⎹')
    console.log('  ⎸                         (_)  |______|  (_)      ★                   ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ mul() instructions total:    ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Nb of safe-ish reports:      ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
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