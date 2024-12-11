import { toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";

export default class Puzzle11 extends BasePuzzle {

  private stones: number[] = []

  run(): void {
    this.loadInput('11e')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                      Day 11: Plutonian Pebbles      ★               ⎹`)
    console.log('  ⎸          ★               _    ______    _                           ⎹')
    console.log('  ⎸                         (_)  |______|  (_)                     ★    ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Nb of safe reports:          ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Nb of safe-ish reports:      ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.stones = this.input[0].split(' ').map(n => parseInt(n))
    console.log(this.stones)
  }

  protected partOne(): number {
    Array(6).fill(0).forEach(_ => this.blink())
    return this.stones.length
  }

  protected partTwo(): number {
    return 0
  }
  
  // ----------------------------------------------------------------------------------------------

  private blink() {
    const stonesToAdd: number[][] = [] // [index, value]
    let curStone: number, stoneNumStr: string
    for (let i = 0; i < this.stones.length; i++) {
      curStone = this.stones[i]
      if (curStone === 0) this.stones[i] = 0
      else if (curStone.toString().length % 2 === 0) {
        stoneNumStr = curStone.toString()
        this.stones[i] = parseInt(stoneNumStr.slice(0, stoneNumStr.length/2))
        stonesToAdd.push([i, parseInt(stoneNumStr.slice(0, stoneNumStr.length/2))])
      }
      else {
        this.stones[i] *= 1024
      }
    }
    stonesToAdd.forEach(sta => this.stones.splice(sta[0], 0, sta[1]))
    console.log(this.stones.join(' '))
  }
}