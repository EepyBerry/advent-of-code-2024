import { xbRgx } from "@toolbox/xb-rgx";
import { toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { Matrix2, Vector2 } from "@/aoc-toolbox/types";
import { cramerize2, rgcd } from "@/aoc-toolbox/math-utils";

type ClawButton = { cost: number, px: number, py: number }
type ClawMachine = { a: ClawButton, b: ClawButton, prize: Vector2 }

export default class Puzzle13 extends BasePuzzle {

  private clawMachines: ClawMachine[] = []
  private prizeRgx = /X=(\d*), Y=(\d*)/

  run(): void {
    this.loadInputRaw('13')
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
    console.log(`  ⎸ Min. nb of tokens:           ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Min. nb of tokens (10^12):   ${toAnswerString(this.partTwo())} ⎹`)
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
  }

  protected partOne(): number {
    let total = 0
    for (let machine of this.clawMachines) {
      const xy = cramerize2({
        a1: machine.a.px, b1: machine.b.px, a2: machine.a.py, b2: machine.b.py },
        [machine.prize.x, machine.prize.y]
      )
      if (!Number.isInteger(xy[0])) continue
      total += (machine.a.cost * xy[0]) + ((machine.b.cost * xy[1]))
    }
    return total
  }

  protected partTwo(): number {
    let total = 0
    this.clawMachines.forEach(c => {
      c.prize.x += 10000000000000
      c.prize.y += 10000000000000
    })
    for (let machine of this.clawMachines) {
      const xy = cramerize2({
        a1: machine.a.px, b1: machine.b.px, a2: machine.a.py, b2: machine.b.py },
        [machine.prize.x, machine.prize.y]
      )
      if (!Number.isInteger(xy[0]) || !Number.isInteger(xy[1])) continue
      total += (machine.a.cost * xy[0]) + ((machine.b.cost * xy[1]))
    }
    return total
  }

  private findMinTokensForMachine(machine: ClawMachine, max: number): number|undefined {
    let minCost = Number.MAX_SAFE_INTEGER
    for (let apress = 0; apress < max; apress++) {
      for (let bpress = 0; bpress < max; bpress++) {
        let xTest = (machine.a.px * apress) + (machine.b.px * bpress)
        let yTest = (machine.a.py * apress) + (machine.b.py * bpress)
        if (xTest !== machine.prize.x || yTest !== machine.prize.y) continue
        
        let tokenCost = (machine.a.cost * apress) + (machine.b.cost * bpress)
        if (tokenCost < minCost) {
          minCost = tokenCost
        }
      }
    }
    return minCost < Number.MAX_SAFE_INTEGER ? minCost : undefined
  }
}