import { deepClone, toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";

export default class Puzzle11 extends BasePuzzle {

  private stones: number[][] = []

  run(): void {
    this.loadInput('11')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                      Day 11: Plutonian Pebbles      ★               ⎹`)
    console.log(`  ⎸          ★               _    ______    _                           ⎹`)
    console.log(`  ⎸                         (_)  |______|  (_)                     ★    ⎹`)
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Total stones (25 blinks):    ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Total stones (75 blinks):    ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    let stoneNums: number[] = this.input[0].split(' ').map(n => parseInt(n))
    stoneNums.forEach(n => this.addToStoneBlock(this.stones, n, 1))
  }

  protected partOne(): number {
    let stones: number[][] = deepClone(this.stones)
    for(let counter = 0; counter < 25; counter++) {
      this.blink(stones)
    }
    return stones.reduce((acc, cur) => acc += cur[1], 0)
  }

  protected partTwo(): number {
    let stones: number[][] = deepClone(this.stones)
    for(let counter = 0; counter < 75; counter++) {
      this.blink(stones)
    }
    return stones.reduce((acc, cur) => acc += cur[1], 0)
  }
  
  // ----------------------------------------------------------------------------------------------

  private blink(stones: number[][]) {
    let newStones: number[][] = []
    for (let b = 0; b < stones.length; b++) {
      let blockNum = stones[b][0],
          blockcount = stones[b][1]
      if (blockNum === 0) {
        this.addToStoneBlock(newStones, 1, blockcount)
      } else if (blockNum.toString().length % 2 === 0) {
        let splitStones = this.splitEvenNumber(blockNum)
        this.addToStoneBlock(newStones, splitStones[0], blockcount)
        this.addToStoneBlock(newStones, splitStones[1], blockcount)
      } else {
        this.addToStoneBlock(newStones, blockNum * 2024, blockcount)
      }
    }
    stones.splice(0)
    stones.push(...newStones)
  }

  private addToStoneBlock(stones: number[][], n: number, count: number) {
    let idx = this.getStoneBlockIndex(stones, n)
    if (idx >= 0) stones[idx][1] += count
    else          stones.push([n, count])
  }

  private getStoneBlockIndex(stones: number[][], n: number): number {
    return stones.findIndex(block => block[0] === n)
  }

  private splitEvenNumber(n: number): number[] {
    let nstr = n.toString()
    return [parseInt(nstr.substring(0, nstr.length/2)), parseInt(nstr.substring(nstr.length/2))]
  }
}