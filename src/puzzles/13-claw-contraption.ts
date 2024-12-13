import { xbRgx } from "@toolbox/xb-rgx";
import { toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { Point } from "@/aoc-toolbox/types";

type ClawButton = { cost: number, px: number, py: number }
type ClawMachine = { a: ClawButton, b: ClawButton, prize: Point }

export default class Puzzle13 extends BasePuzzle {

  private clawMachines: ClawMachine[] = []
  private prizeRgx = /X=(\d*), Y=(\d*)/

  run(): void {
    this.loadInputRaw('13e')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                 ★    Day 13: Claw Contraption                       ⎹`)
    console.log('  ⎸                          _    ______    _                  ★        ⎹')
    console.log('  ⎸       ★                 (_)  |______|  (_)                          ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Nb of XMAS occurrences:      ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Nb of X-MAS occurrences:     ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    for(let i = 0; i < this.input.length-2; i+= 4) {
      let apx = this.input[i].slice(12, 14),
          apy = this.input[i].slice(18, 20)
      let bpx = this.input[i+1].slice(12, 14),
          bpy = this.input[i+1].slice(18, 20)
      let prizeData = this.input[i+2].match(this.prizeRgx)!
      this.clawMachines.push({
        a: { cost: 3, px: parseInt(apx), py: parseInt(apy) },
        b: { cost: 1, px: parseInt(bpx), py: parseInt(bpy) },
        prize: { x: parseInt(prizeData[1]), y: parseInt(prizeData[2]) }
      })
    }
    console.log(this.clawMachines)
  }

  protected partOne(): number {
    return 0
  }

  protected partTwo(): number {
    return 0
  }
}