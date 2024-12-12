import { toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { Point } from "@/aoc-toolbox/types";

type RegionData = { area: number, perimeter: number }
enum PatchType {
  OUT_OF_BOUNDS,
  ALREADY_MAPPED_SAME_PLANT,
  ALREADY_MAPPED_DIFFERENT_PLANT,
  DIFFERENT_PLANT,
  VALID,
}

export default class Puzzle12 extends BasePuzzle {

  private grid: string[][] = []
  private mappedGrid: string[][] = [] // unmapped: .   mapped: X

  run(): void {
    this.loadInput('12')
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
    this.grid = this.input.map(l => l.replaceAll('\r', '').split(''))
    this.mappedGrid = this.grid.map(l => l.map(c => '.'))
  }

  protected partOne(): number {
    let total = 0
    // keep looping until every plot is mapped
    while(this.mappedGrid.some(row => row.some(p => p === '.'))) {
      let unmappedY = this.mappedGrid.findIndex(row => row.includes('.')),
          unmappedX = this.mappedGrid[unmappedY].findIndex(col => col === '.')
      let regionData = { area: 0, perimeter: 0 }
      //console.log(`mapping area from ${[unmappedX, unmappedY]} (${this.grid[unmappedY][unmappedX]})`)
      this.mapRegion({ x: unmappedX, y: unmappedY }, this.grid[unmappedY][unmappedX], regionData)
      total += regionData.area * regionData.perimeter
    }
    return total
  }

  protected partTwo(): number {
    return 0
  }

  private mapRegion(curPos: Point, plant: string, data: RegionData): void {
    if (this.mappedGrid[curPos.y][curPos.x] === 'X') {
      return
    }
    //console.log('mapping step: '+JSON.stringify(curPos))
    data.area++
    this.mappedGrid[curPos.y][curPos.x] = 'X'

    let adjacentPatchData = [
      this.checkPatchType({ x: curPos.x+1, y: curPos.y }, plant),
      this.checkPatchType({ x: curPos.x, y: curPos.y+1 }, plant),
      this.checkPatchType({ x: curPos.x-1, y: curPos.y }, plant),
      this.checkPatchType({ x: curPos.x, y: curPos.y-1 }, plant)
    ]
    data.perimeter += adjacentPatchData.filter(d => d.data === PatchType.DIFFERENT_PLANT || d.data === PatchType.OUT_OF_BOUNDS || d.data === PatchType.ALREADY_MAPPED_DIFFERENT_PLANT).length

    adjacentPatchData.filter(apd => apd.data === PatchType.VALID).forEach(apd => {
      this.mapRegion(apd.pos, plant, data)
    })
  }

  private checkPatchType(pos: Point, plant: string): { pos: Point, data: PatchType } {
    if (pos.x < 0 || pos.x >= this.grid[0].length || pos.y < 0 || pos.y >= this.grid.length) {
      return { pos, data: PatchType.OUT_OF_BOUNDS }
    }
    if (this.mappedGrid[pos.y][pos.x] === 'X') {
      return { pos, data: this.grid[pos.y][pos.x] === plant
        ? PatchType.ALREADY_MAPPED_SAME_PLANT
        : PatchType.ALREADY_MAPPED_DIFFERENT_PLANT
      }
    }
    if (this.grid[pos.y][pos.x] !== plant) {
      return { pos, data: PatchType.DIFFERENT_PLANT }
    }
    return { pos, data: PatchType.VALID }
  }
}