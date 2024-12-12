import { deepClone, toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { CardinalOrientation, Point } from "@/aoc-toolbox/types";

type PerimeterSegment = { orientation: CardinalOrientation, fencePoint: Point }
type RegionData = { area: number, perimeterSegments: PerimeterSegment[] }
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
    console.log(`  ⎸ Total discounted price:      ${toAnswerString(this.partTwo())} ⎹`)
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
      let regionData: RegionData = { area: 0, perimeterSegments: [] }
      //console.log(`mapping area from ${[unmappedX, unmappedY]} (${this.grid[unmappedY][unmappedX]})`)
      this.mapRegion({ x: unmappedX, y: unmappedY }, this.grid[unmappedY][unmappedX], regionData)
      //console.log(JSON.stringify(regionData))
      total += regionData.area * regionData.perimeterSegments.length
    }

    // reset mapped grid before exiting (for part 2)
    this.mappedGrid.splice(0)
    this.mappedGrid = this.grid.map(l => l.map(c => '.'))
    return total
  }

  protected partTwo(): number {
    let total = 0
    // keep looping until every plot is mapped
    while(this.mappedGrid.some(row => row.some(p => p === '.'))) {
      let unmappedY = this.mappedGrid.findIndex(row => row.includes('.')),
          unmappedX = this.mappedGrid[unmappedY].findIndex(col => col === '.')
      let regionData: RegionData = { area: 0, perimeterSegments: [] }
      console.log(`mapping area from ${[unmappedX, unmappedY]} (${this.grid[unmappedY][unmappedX]})`)
      this.mapRegion({ x: unmappedX, y: unmappedY }, this.grid[unmappedY][unmappedX], regionData)
      console.log(JSON.stringify(regionData))
      total += regionData.area * this.countSides(deepClone(regionData.perimeterSegments))
    }
    return total
  }

  private mapRegion(curPos: Point, plant: string, data: RegionData): void {
    if (this.mappedGrid[curPos.y][curPos.x] === 'X') {
      return
    }
    //console.log('mapping step: '+JSON.stringify(curPos))
    data.area++
    this.mappedGrid[curPos.y][curPos.x] = 'X'

    let adjacentPatchData = [
      this.checkGardenPatch(curPos, CardinalOrientation.EAST, plant),
      this.checkGardenPatch(curPos, CardinalOrientation.SOUTH, plant),
      this.checkGardenPatch(curPos, CardinalOrientation.WEST, plant),
      this.checkGardenPatch(curPos, CardinalOrientation.NORTH, plant)
    ]
    let adjacentPerimeters = adjacentPatchData.filter(d => !!d.perimeterData)
    data.perimeterSegments.push(...adjacentPerimeters.map(p => p.perimeterData!))

    adjacentPatchData.filter(apd => apd.type === PatchType.VALID).forEach(apd => {
      this.mapRegion(apd.pos, plant, data)
    })
  }

  private checkGardenPatch(refPos: Point, orientation: CardinalOrientation, plant: string): { pos: Point, type: PatchType, perimeterData?: PerimeterSegment } {
    let actualPos: Point = this.computeActualPos(refPos, orientation)

    // out of bounds
    if (!this.isWithinBounds(actualPos)) {
      return {
        pos: actualPos,
        type: PatchType.OUT_OF_BOUNDS,
        perimeterData: this.computePerimeterData(refPos, orientation)
      }
    }
    // hit a mapped plant (same or different)
    if (this.mappedGrid[actualPos.y][actualPos.x] === 'X') {
      return {
        pos: actualPos,
        type: this.grid[actualPos.y][actualPos.x] === plant
          ? PatchType.ALREADY_MAPPED_SAME_PLANT
          : PatchType.ALREADY_MAPPED_DIFFERENT_PLANT,
        perimeterData: this.grid[actualPos.y][actualPos.x] === plant ? undefined : this.computePerimeterData(refPos, orientation)
      }
    }
    // hit an unmapped, different plant
    if (this.grid[actualPos.y][actualPos.x] !== plant) {
      return {
        pos: actualPos,
        type: PatchType.DIFFERENT_PLANT,
        perimeterData: this.computePerimeterData(refPos, orientation)
      }
    }
    // is ok :>
    return { pos: actualPos, type: PatchType.VALID }
  }

  private computeActualPos(refPos: Point, orientation: CardinalOrientation) {
    switch (orientation) {
      case CardinalOrientation.NORTH: return { x: refPos.x, y: refPos.y-1 }
      case CardinalOrientation.EAST:  return { x: refPos.x+1, y: refPos.y }
      case CardinalOrientation.SOUTH: return { x: refPos.x, y: refPos.y+1 }
      case CardinalOrientation.WEST:  return { x: refPos.x-1, y: refPos.y }
    }
  }

  private computePerimeterData(refPos: Point, orientation: CardinalOrientation): PerimeterSegment {
    switch (orientation) {
      case CardinalOrientation.NORTH: return { orientation, fencePoint: { x: refPos.x, y: refPos.y-0.5 } }
      case CardinalOrientation.EAST:  return { orientation, fencePoint: { x: refPos.x+0.5, y: refPos.y } }
      case CardinalOrientation.SOUTH: return { orientation, fencePoint: { x: refPos.x, y: refPos.y+0.5 } }
      case CardinalOrientation.WEST:  return { orientation, fencePoint: { x: refPos.x-0.5, y: refPos.y } }
    }
  }

  private isWithinBounds(pos: Point) {
    return pos.x >= 0
      && pos.x < this.grid[0].length
      && pos.y >= 0
      && pos.y < this.grid.length
  }

  private countSides(perimeter: PerimeterSegment[]): number {
    let total = 0
    let refSegment: PerimeterSegment
    while(perimeter.length > 0) {
      console.log(perimeter.length)
      refSegment = perimeter[0]
      this.findContiguousSegments(refSegment, perimeter)
      total++
    }
    return total
  }

  private findContiguousSegments(refSegment: PerimeterSegment, perimeter: PerimeterSegment[]): void {
    let sideIndices: number[] = [0] // always the first in the list
    let isHorizontalSide = refSegment.orientation === CardinalOrientation.NORTH || refSegment.orientation === CardinalOrientation.SOUTH

    let prevSegmentIdx, nextSegmentIdx, depth = 1
    let searchPrevious = true, searchNext = true
    while(searchPrevious || searchNext) {
      prevSegmentIdx = perimeter.findIndex(p =>
        p.orientation === refSegment.orientation
        && (isHorizontalSide
          ? (refSegment.fencePoint.x-depth === p.fencePoint.x && refSegment.fencePoint.y === p.fencePoint.y)
          : (p.fencePoint.y-depth === refSegment.fencePoint.y && refSegment.fencePoint.x === p.fencePoint.x)
        )
      )
      nextSegmentIdx = perimeter.findIndex(p =>
        p.orientation === refSegment.orientation
        && (isHorizontalSide
          ? (refSegment.fencePoint.x+depth === p.fencePoint.x && refSegment.fencePoint.y === p.fencePoint.y)
          : (p.fencePoint.y+depth === refSegment.fencePoint.y && refSegment.fencePoint.x === p.fencePoint.x)
        )
      )
      if (prevSegmentIdx === -1) searchPrevious = false
      if (nextSegmentIdx === -1) searchNext = false

      if (prevSegmentIdx >= 0) sideIndices.push(prevSegmentIdx)
      if (nextSegmentIdx >= 0) sideIndices.push(nextSegmentIdx)
      depth++
    }
    console.log(sideIndices)
    sideIndices.reverse().forEach(s => perimeter.splice(s, 1))
  }
}