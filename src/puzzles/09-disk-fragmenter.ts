import { swapArrayElements, toAnswerString } from "../aoc-toolbox/utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

type FileFragment = { id?: number }
type DiskBlock = { id?: number, length: number }
const EMPTY_BLOCK = { id: undefined }

export default class Puzzle9 extends BasePuzzle {

  private p1Disk: FileFragment[] = []
  private p2Disk: FileFragment[] = []

  run(): void {
    this.loadInput('09')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                 ★      Day 9: Disk Fragmenter                       ⎹`)
    console.log('  ⎸                          _    ______    _                 ★         ⎹')
    console.log('  ⎸   ★                     (_)  |______|  (_)                          ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Disk checksum:               ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Similarity score:            ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  // note: input is 20k chars, worst case scenario gives 180k objects exactly
  protected setup(): void {
    let fileId = 0
    this.input[0].split('').forEach((block, i) => {
      if (i % 2 === 0) {
        this.p1Disk.push(...Array(parseInt(block)).fill({ id: fileId }))
        fileId++
      } else {
        this.p1Disk.push(...Array(parseInt(block)).fill(EMPTY_BLOCK))
      }
    })
  }

  // TODO: complete this
  protected partOne(): number {
    //this.printBlocks(this.p1Blocks)
    let e = this.p1Disk.length-1
    for (let b = 0; b < this.p1Disk.length; b++) {
      if (e <= b) break;
      if (this.p1Disk[b].id !== undefined) continue;
      
      this.p1Disk[b] = this.p1Disk[e]
      this.p1Disk[e] = EMPTY_BLOCK
      //this.printBlocks(this.p1Blocks)
      while (this.p1Disk[e].id === undefined) {
        e--
      }
    }
    return this.p1Disk.filter(b => b.id !== undefined).reduce((cur, acc, idx) => cur += (idx * acc.id!), 0)
  }

  // TODO: complete this
  protected partTwo(): number {
    return 0
  }

  private printBlocks(b: FileFragment[]) {
    console.log(b.map(l => l.id ?? '.').join(''))
  }
}