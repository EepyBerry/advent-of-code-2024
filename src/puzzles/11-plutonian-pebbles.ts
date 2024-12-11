import { deepClone, toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";

type StoneChunk = { stones: number[] }

export default class Puzzle11 extends BasePuzzle {

  private stones: StoneChunk = { stones: [] }
  private readonly CHUNK_SIZE = 8192

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
    console.log(`  ⎸ Total stones (25 blinks):    ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Total stones (75 blinks):    ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.stones.stones.push(...this.input[0].split(' ').map(n => parseInt(n)))
    console.log(this.stones)
  }

  protected partOne(): number {
    let stonesCopy = deepClone(this.stones)
    let total = 0
    for (let c = 0; c < 25; c++) {
      total += this.blink(stonesCopy)
    }
    return total
  }

  protected partTwo(): number {
    return 0
  }
  
  // ----------------------------------------------------------------------------------------------

  private blink(chunk: StoneChunk): number {
    const newChunks: StoneChunk[] = [{ stones: [] }]
    let curStone: number, splitStones: number[]
    let chunkIdx = 0
    for (let i = 0; i < chunk.stones.length; i++) {
      curStone = chunk.stones[i]
      if (curStone === 0) {
        newChunks[chunkIdx].stones.push(1)
      }
      else if (curStone.toString().length % 2 === 0) {
        splitStones = this.splitEvenNumber(curStone)
        newChunks[chunkIdx].stones.push(splitStones[0])
        newChunks[chunkIdx].stones.push(splitStones[1])
      }
      else {
        newChunks[chunkIdx].stones.push(curStone * 2024)
      }

      // add new chunk when current chunk is too large
      if (newChunks[chunkIdx].stones.length >= this.CHUNK_SIZE) {
        newChunks.push({ stones: [] })
        chunkIdx++
      }
    }
    console.log(newChunks)
    return newChunks.reduce((acc, cur) => acc += cur.stones.length, 0)
  }

  private splitEvenNumber(n: number): number[] {
    let nstr = n.toString()
    return [parseInt(nstr.substring(0, nstr.length/2)), parseInt(nstr.substring(nstr.length/2))]
  }
}