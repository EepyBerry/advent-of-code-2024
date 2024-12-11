import { deepClone, toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";

export default class Puzzle11 extends BasePuzzle {

  private stones: number[][] = []
  private readonly CHUNK_SIZE = 32768

  run(): void {
    this.loadInput('11')
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
    console.log(`  ⎸ Total stones (25 blinks):    ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Total stones (75 blinks):    ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.stones.push(this.input[0].split(' ').map(n => parseInt(n)))
    console.log(this.stones)
  }

  protected partOne(): number {
    let stonesCopy: number[][] = deepClone(this.stones)
    console.log(stonesCopy.map(k => k.join(' ')).join(', '))
    for (let c = 0; c < 25; c++) {
      this.blink(stonesCopy)
      this.rechunk(stonesCopy)
    }
    return stonesCopy.reduce((acc, cur) => acc += cur.length, 0)
  }

  protected partTwo(): number {
    let stonesCopy: number[][] = deepClone(this.stones)
    console.log(stonesCopy.map(k => k.join(' ')).join(', '))
    for (let c = 0; c < 75; c++) {
      this.blink(stonesCopy)
      this.rechunk(stonesCopy)
      console.log(c)
    }
    return stonesCopy.reduce((acc, cur) => acc += cur.length, 0)
  }
  
  // ----------------------------------------------------------------------------------------------

  private blink(stones: number[][]): void {
    let curStone: number, splitStones: number[]
    for (let c = 0; c < stones.length; c++) {
      for (let i = 0; i < stones[c].length; i++) {
        curStone = stones[c][i]
        if (curStone === 0) {
          stones[c][i] = 1
        }
        else if (curStone.toString().length % 2 === 0) {
          splitStones = this.splitEvenNumber(curStone)
          stones[c][i] = splitStones[1]
          stones[c].splice(i, 0, splitStones[0])
          i++
        }
        else {
          stones[c][i] *= 2024
        }
      }
    }
  }

  private rechunk(stones: number[][]) {
    for (let c = 0; c < stones.length; c++) {
      if (stones[c].length <= this.CHUNK_SIZE) continue;
      let subchunks: number[][] = []
      for (let i = 0; i < stones[c].length; i += this.CHUNK_SIZE) {
        subchunks.push(stones[c].slice(i, i + this.CHUNK_SIZE))
      }
      stones.splice(c, 1, ...subchunks)
    }
  }

  private splitEvenNumber(n: number): number[] {
    let nstr = n.toString()
    return [parseInt(nstr.substring(0, nstr.length/2)), parseInt(nstr.substring(nstr.length/2))]
  }
}