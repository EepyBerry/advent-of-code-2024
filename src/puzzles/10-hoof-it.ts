import { BasePuzzle } from "./base-puzzle";
import type { Vector2 } from "@toolbox/types";
import { hasPoint } from "@toolbox/math-utils";
import { toAnswerString } from "@toolbox/utils";

export default class Puzzle10 extends BasePuzzle {

  private grid: number[][] = []
  private trailStartPositions: Vector2[] = []

  run(): void {
    this.loadInputRaw('10')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                       Day 10: Hoof It                           ⎹`)
    console.log(`  ⎸                          _    ______    _                 ★         ⎹`)
    console.log(`  ⎸                 ★       (_)  |______|  (_)                          ⎹`)
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Trailhead score sum:         ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Trailhead rating sum:        ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.grid = this.input.map(l => l.replaceAll('\r', '').split('').map(ls => parseInt(ls)))
    this.grid.forEach((row, y) => row.forEach((col, x) => {
      if (col === 0) this.trailStartPositions.push({ x, y })
    }))
  }

  protected partOne(): number {
    return this.trailStartPositions.reduce((acc, cur) => acc += this.doStep(cur, []).length, 0)
  }

  protected partTwo(): number {
    return this.trailStartPositions.reduce((acc, cur) => acc += this.doStep(cur, [], true).length, 0)
  }

  // ----------------------------------------------------------------------------------------------

  private doStep(curPos: Vector2, reachedPeaks: Vector2[], ratingMode: boolean = false): Vector2[] {
    const curValue = this.grid[curPos.y][curPos.x]
    if (curValue === 9 && (ratingMode ? true : !hasPoint(reachedPeaks, curPos))) {
      reachedPeaks.push(curPos)
      return reachedPeaks
    }
    // scan adjacent points & recursively do a step for each valid one
    if (this.isPointValid({ x: curPos.x+1, y: curPos.y   }, curValue)) { this.doStep({ x: curPos.x+1, y: curPos.y   }, reachedPeaks, ratingMode) }
    if (this.isPointValid({ x: curPos.x,   y: curPos.y+1 }, curValue)) { this.doStep({ x: curPos.x  , y: curPos.y+1 }, reachedPeaks, ratingMode) }
    if (this.isPointValid({ x: curPos.x,   y: curPos.y-1 }, curValue)) { this.doStep({ x: curPos.x,   y: curPos.y-1 }, reachedPeaks, ratingMode) }
    if (this.isPointValid({ x: curPos.x-1, y: curPos.y   }, curValue)) { this.doStep({ x: curPos.x-1, y: curPos.y   }, reachedPeaks, ratingMode) }
    return reachedPeaks
  }

  private isPointValid(p: Vector2, curValue: number) {
    return p.x >= 0 && p.x < this.grid[0].length
      && p.y >= 0 && p.y < this.grid.length
      && (curValue + 1) === this.grid[p.y][p.x]
  }
}