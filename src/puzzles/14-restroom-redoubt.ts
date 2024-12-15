import { sleep, formatAnswer } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { Vector2 } from "@/aoc-toolbox/types";
import { mod } from "@/aoc-toolbox/math-utils";

type Robot = { start: Vector2, mvt: Vector2 }

export default class Puzzle14 extends BasePuzzle {

  private robots: Robot[] = []
 
  run(): void {
    this.loadInput('14')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                  Day 14: Restroom Redoubt           ★           ⎹`)
    console.log(`  ⎸                          _    ______    _                           ⎹`)
    console.log(`  ⎸                     ★   (_)  |______|  (_)                          ⎹`)
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Safety factor:               ${formatAnswer(this.partOne())} ⎹`)
    console.log(`  ⎸ Easter egg at second:        ${formatAnswer(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }


  protected setup(): void {
    this.robots = this.input.map(l => {
      let coords = [...l.matchAll(/-{0,1}\d{1,}/g)]
      return { start: { x: parseInt(coords[0][0]), y: parseInt(coords[1][0]) }, mvt: { x: parseInt(coords[2][0]), y: parseInt(coords[3][0]) } }
    })
  }

  protected partOne(): number {
    let quadrantData: number[] = [0,0,0,0]
    let w = 101, h = 103, t = 100
    this.robots.forEach(rbt => {
      let newCoords = { x: mod(rbt.start.x + (t*rbt.mvt.x), w), y: mod(rbt.start.y + (t*rbt.mvt.y), h) }
      let quadrant = this.getQuadrant(newCoords, w, h)
      if (quadrant === undefined) return;
      quadrantData[quadrant]++
    })
    return quadrantData.reduce((acc, cur) => acc *= cur, 1)
  }

  protected partTwo(): number {
    let w = 101, h = 103, t = 1
    for (; t <= Number.MAX_SAFE_INTEGER; t++) {
      let positions = this.robots.map(rbt => {
        return { x: mod(rbt.start.x + (t*rbt.mvt.x), w), y: mod(rbt.start.y + (t*rbt.mvt.y), h) }
      })
      let maxAligned = this.countMaxConsecutivePositions(w, h, positions)
      if (maxAligned === 31) { // length of the border on X axis
        //this.printGrid(w,h,positions)
        break
      }
    }
    return t
  }
  
  // ----------------------------------------------------------------------------------------------

  private getQuadrant(coords: Vector2, w: number, h: number): number | undefined {
    const isWidthOdd = w % 2 === 1
    const isHeightOdd = h % 2 === 1

    // Exit cases
    if (isWidthOdd && coords.x === Math.floor(w/2))  return undefined
    if (isHeightOdd && coords.y === Math.floor(h/2)) return undefined

    // Quadrant cases (in order: 0,0 => 0 | 1,0 => 1 | 1,0 => 2 | 1,1 => 3)
    if ((coords.x < Math.floor(w/2)) && (coords.y < Math.floor(h/2))) return 0
    if ((coords.x >= Math.ceil(w/2)) && (coords.y < Math.floor(h/2))) return 1
    if ((coords.x < Math.floor(w/2)) && (coords.y >= Math.ceil(h/2))) return 2
    if ((coords.x >= Math.ceil(w/2)) && (coords.y >= Math.ceil(h/2))) return 3
    return undefined
  }

  private countMaxConsecutivePositions(w: number, h: number, coords: Vector2[]): number {
    const grid = Array(h).fill('').map(_ => Array(w).fill(' '))
    coords.forEach(c => grid[c.y][c.x] = '█')

    let max = 0, count = 0
    grid.forEach(row => row.forEach(col => {
      if (col === '█') count++
      else count = 0

      if (count > max) max = count
    }))
    return max
  }

  // debug
  private printGrid(w: number, h: number, coords: Vector2[]) {
    const grid = Array(h).fill('').map(_ => Array(w).fill(' '))
    coords.forEach(c => grid[c.y][c.x] = '█')
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
    console.log(grid.map(row => row.join('')).join('\n'))
  }
}