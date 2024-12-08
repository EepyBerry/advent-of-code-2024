import type { Point } from "../utils/types.ts";
import { addPoints, pointDiff, pointPairs, subtractPoints } from "../utils/math-utils.ts";
import { toAnswerString } from "../utils/utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

type Frequency = { freq: string, pos: Point[] }

export default class Puzzle8 extends BasePuzzle {

  private grid: string[][] = []
  private freqs: Frequency[] = []

  run(): void {
    this.loadInput('08')
    if (!this.input) return
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                     Day 8: Resonant Collinearity           ★        ⎹`)
    console.log('  ⎸                 ★        _    ______    _                           ⎹')
    console.log('  ⎸       ★                 (_)  |______|  (_)                          ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Total antinodes:             ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Possible obstruction spots:  ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.grid = this.input.map(l => l.replaceAll('\r', '').split(''))
    this.grid.forEach((row, y) => {
      row.forEach((el, x) => {
        if (el === '.') return
        if (!this.freqs.find(a => a.freq === el)) {
          this.freqs.push({ freq: el, pos: [{x,y}] })
        } else {
          this.freqs.find(a => a.freq === el)!.pos.push({x,y})
        }
      })
    })
  }

  protected partOne(): number {
    const uniqueAntinodes: Point[] = []
    this.freqs.forEach(f => this.scanFrequency(f, uniqueAntinodes))
    return uniqueAntinodes.length
  }

  protected partTwo(): number {
    return 0
  }

  // ----------------------------------------------------------------------------------------------

  // get all antennae pairs, then add all derived antinodes if within the grid
  private scanFrequency(freq: Frequency, uniqueAntinodes: Point[]): Point[] {
    let antPairs: Point[][] = pointPairs(freq.pos)
    antPairs.forEach(p => p.sort((a, b) => a.y-b.y !== 0 ? a.y-b.y : a.x-b.x))
    antPairs.forEach(p => {
      let diff = pointDiff(p[0], p[1])
      let p0Antinode = subtractPoints(p[0], diff)
      let p1Antinode = addPoints(p[1], diff)
      if (this.isPointValid(p0Antinode) && !this.hasPoint(uniqueAntinodes, p0Antinode)) {
        uniqueAntinodes.push(p0Antinode)
      }
      if (this.isPointValid(p1Antinode) && !this.hasPoint(uniqueAntinodes, p1Antinode)) {
        uniqueAntinodes.push(p1Antinode)
      }
    })
    return uniqueAntinodes
  }

  private isPointValid(p: Point) {
    return p.x >= 0 && p.x < this.grid[0].length
      && p.y >= 0 && p.y < this.grid.length
  }

  private hasPoint(arr: Point[], point: Point): boolean {
    return arr.find(p => p.x === point.x && p.y === point.y) !== undefined
  }

  private displayGrid(antinodes: Point[]) {
    antinodes.forEach(un => {
      if (this.grid[un.y][un.x] !== '.') return
      this.grid[un.y][un.x] = '#'
    })
    console.log(this.grid.map(l => l.join('')).join('\n'))
  }
}