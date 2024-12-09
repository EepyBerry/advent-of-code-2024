import { toAnswerString } from "../aoc-toolbox/utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle9 extends BasePuzzle {

  private disk: string = ''

  run(): void {
    this.loadInput('09e')
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
    console.log(`  ⎸ Dick checksum:               ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Similarity score:            ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.disk = this.input[0]
    // nothing :c
  }

  // TODO: complete this
  protected partOne(): number {
    let diskCopy = this.disk
    let checksum = 0
    let defragedDisk = '', block = '', blockData = 0
    for (let i = 0, fileId = 0; i < diskCopy.length; i++, fileId += i % 2) {
      block = diskCopy[i]
      blockData = parseInt(block)
      if (i % 2 === 0) {
        // Add existing block
        defragedDisk += block.repeat(blockData)
        checksum += i * blockData
      } else {
        // Fetch - decompress - checksum
        defragedDisk += diskCopy[diskCopy.length - 1]

        // defragedDisk += '.'.repeat(parseInt(block))
        checksum += i * (diskCopy.length - 1)
      }
    }
    console.log(defragedDisk)
    return checksum
  }
  
  // TODO: complete this
  protected partTwo(): number {
    return 0
  }
}