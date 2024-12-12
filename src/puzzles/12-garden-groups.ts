import { toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { Point } from "@/aoc-toolbox/types";

enum PatchType {
  OUT_OF_BOUNDS,
  ALREADY_MAPPED,
  DIFFERENT_PLANT,
  VALID,
}

export default class Puzzle12 extends BasePuzzle {

  private grid: string[][] = []
  private mappedGrid: string[][] = [] // unmapped: .   mapped: X

  run(): void {
    this.loadInput('12e')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                        Day 12: Garden Groups                        ⎹`)
    console.log('  ⎸   ★                      _    ______    _               ★           ⎹')
    console.log('  ⎸                         (_)  |______|  (_)      ★                   ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Total garden price:          ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Nb of safe-ish reports:      ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
  }

  protected partOne(): number {
    let iterations = 0
    const maxIterations = this.grid.length * this.grid[0].length
    // keep looping until every plot is mapped
    while(this.mappedGrid.some(row => row.every(p => p === '.')) && iterations < maxIterations) {
      iterations++
      let unmappedY = this.mappedGrid.findIndex(row => row.includes('.')),
          unmappedX = this.mappedGrid[unmappedY].findIndex(col => col === '.')
      this.mapRegion({ x: unmappedX, y: unmappedY }, this.grid[unmappedY][unmappedX], 1)
    }
    return 0
  }

  protected partTwo(): number {
    return 0
  }

  private mapRegion(curPos: Point, plant: string, area: number): void {
    area++
    this.mappedGrid[curPos.y][curPos.x] = 'X'

    let adjacentPatchData = [
      this.checkPatchType(plant, { x: curPos.x+1, y: curPos.y }),
      this.checkPatchType(plant, { x: curPos.x, y: curPos.y+1 }),
      this.checkPatchType(plant, { x: curPos.x-1, y: curPos.y }),
      this.checkPatchType(plant, { x: curPos.x, y: curPos.y-1 })
    ]
  }

  private checkPatchType(plant: string, pos: Point): { pos: Point, data: PatchType } {
    if (pos.x < 0 || pos.x >= this.grid[0].length || pos.y < 0 && pos.y >= this.grid.length) {
      return { pos, data: PatchType.OUT_OF_BOUNDS }
    }
    if ( this.mappedGrid[pos.y][pos.x] === 'X') {
      return {pos, data: PatchType.ALREADY_MAPPED }
    }
    if (this.grid[pos.y][pos.x] !== plant) {
      return { pos, data: PatchType.DIFFERENT_PLANT }
    }
    return { pos, data: PatchType.VALID }
  }
}