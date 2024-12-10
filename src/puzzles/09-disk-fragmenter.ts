import { toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";

type DiskBlock = { id: number }
type DiskChunk = { blocks: DiskBlock[] }

const EMPTY_BLOCK = { id: -1 }

export default class Puzzle9 extends BasePuzzle {

  private p1Disk: DiskBlock[] = []
  private p2Disk: DiskChunk[] = []

  run(): void {
    this.loadInput('09')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                 ★      Day 9: Disk Fragmenter                       ⎹`)
    console.log('  ⎸                          _    ______    _                           ⎹')
    console.log('  ⎸   ★                     (_)  |______|  (_)                ★         ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Fragmented disk checksum:    ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Disk checksum:               ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  // note: input is 20k chars, worst case scenario gives 180k objects exactly
  protected setup(): void {
    let fileId = 0
    this.input[0].split('').forEach((block, i) => {
      if (i % 2 === 0) {
        this.p1Disk.push(...Array(parseInt(block)).fill({ id: fileId }))
        if (parseInt(block) > 0) {
          this.p2Disk.push({ blocks: Array(parseInt(block)).fill({ id: fileId }) })
        }
        fileId++
      } else {
        this.p1Disk.push(...Array(parseInt(block)).fill(EMPTY_BLOCK))
        if (parseInt(block) > 0) {
          this.p2Disk.push({ blocks: Array(parseInt(block)).fill(EMPTY_BLOCK) })
        }
      }
    })
  }

  protected partOne(): number {
    let endIdx = this.p1Disk.length-1
    for (let blockIdx = 0; blockIdx < this.p1Disk.length; blockIdx++) {
      if (endIdx <= blockIdx) break;
      if (this.p1Disk[blockIdx].id !== -1) continue;
      
      this.p1Disk[blockIdx] = this.p1Disk[endIdx]
      this.p1Disk[endIdx] = EMPTY_BLOCK
      while (this.p1Disk[endIdx].id === -1) {
        endIdx--
      }
    }
    return this.p1Disk
      .filter(b => b.id !== -1)
      .reduce((acc, cur, idx) => acc += (idx * cur.id!), 0)
  }

  protected partTwo(): number {
    for (let chunkIdx = this.p2Disk.length-1; chunkIdx >= 0; chunkIdx--) {
      let curChunk = this.p2Disk[chunkIdx]
      if (this.isChunkEmpty(curChunk)) continue;

      let maybeChunkIdx = this.p2Disk.findIndex((c,i) => i < chunkIdx && this.hasAvailableSpace(c, curChunk.blocks.length))
      if (maybeChunkIdx === -1) continue;

      this.moveFile(curChunk, this.p2Disk[maybeChunkIdx])
    }
    return this.p2Disk
      .flatMap(b => b.blocks)
      .reduce((acc, cur, idx) => {
        if (cur.id === -1) return acc
        return acc + (idx * cur.id!)
      }, 0)
  }

  // ----------------------------------------------------------------------------------------------

  private isChunkEmpty(chunk: DiskChunk): boolean {
    return chunk.blocks.every(b => b.id === -1)
  }
  private hasAvailableSpace(chunk: DiskChunk, blockSize: number): boolean {
    return chunk.blocks.filter(b => b.id === -1).length >= blockSize
  }

  private moveFile(from: DiskChunk, to: DiskChunk) {
    let startingAvailableBlockId = to.blocks.findIndex(b => b.id === -1)
    for (let i = 0; i < from.blocks.length; i++) {
      to.blocks[startingAvailableBlockId+i] = { ...from.blocks[i] }
    }
    from.blocks.forEach(b => b.id = -1)
  }

  private displayDisk(b: DiskChunk[]) {
    console.log(b.map(l => l.blocks.map(f => f.id >= 0 ? f.id : '.').join('')).join(''))
  }
}