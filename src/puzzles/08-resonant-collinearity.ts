import type { Vector2 } from "@toolbox/types";
import { addPoints, hasPoint, pointDiff, pointPairs, sortPoints, subtractPoints, uniquePoints } from "@toolbox/math-utils";
import { formatAnswer } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";

type Frequency = { freq: string, pos: Vector2[] }

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
    console.log(`  ⎸                 ★        _    ______    _                           ⎹`)
    console.log(`  ⎸       ★                 (_)  |______|  (_)                          ⎹`)
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Total antinodes:             ${formatAnswer(this.partOne())} ⎹`)
    console.log(`  ⎸ Total harmonic antinodes:    ${formatAnswer(this.partTwo())} ⎹`)
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
    const antinodes: Vector2[] = []
    this.freqs.forEach(f => this.scanFrequency(f, antinodes))
    return antinodes.length
  }

  protected partTwo(): number {
    const antinodes: Vector2[] = []
    this.freqs.forEach(f => {
      antinodes.push(...f.pos)
      this.scanHarmonicFrequency(f, antinodes)
    })
    // this.displayGrid(antinodes)
    return uniquePoints(antinodes).length
  }

  // ----------------------------------------------------------------------------------------------

  private scanFrequency(freq: Frequency, antinodes: Vector2[]): Vector2[] {
    let antPairs: Vector2[][] = pointPairs(freq.pos)
    antPairs.forEach(p => sortPoints(p))
    antPairs.forEach(p => {
      const diff = pointDiff(p[0], p[1])
      let p0Antinode = subtractPoints(p[0], diff)
      let p1Antinode = addPoints(p[1], diff)
      if (this.isPointValid(p0Antinode) && !hasPoint(antinodes, p0Antinode)) {
        antinodes.push(p0Antinode)
      }
      if (this.isPointValid(p1Antinode) && !hasPoint(antinodes, p1Antinode)) {
        antinodes.push(p1Antinode)
      }
    })
    return antinodes
  }

  private scanHarmonicFrequency(freq: Frequency, antinodes: Vector2[]): Vector2[] {
    let antPairs: Vector2[][] = pointPairs(freq.pos)
    antPairs.forEach(p => p.sort((a, b) => a.y-b.y !== 0 ? a.y-b.y : a.x-b.x))
    antPairs.forEach(p => {
      const diff = pointDiff(p[0], p[1])
      let p0Antinode = p[0]
      let p1Antinode = p[1]
      while (this.isPointValid(p0Antinode)) {
        p0Antinode = subtractPoints(p0Antinode, diff)
        if (this.isPointValid(p0Antinode) && !hasPoint(antinodes, p0Antinode)) {
          antinodes.push(p0Antinode)
        }
      }
      while (this.isPointValid(p1Antinode)) {
        p1Antinode = addPoints(p1Antinode, diff)
        if (this.isPointValid(p1Antinode) && !hasPoint(antinodes, p1Antinode)) {
          antinodes.push(p1Antinode)
        }
      }
    })
    return antinodes
  }

  private isPointValid(p: Vector2) {
    return p.x >= 0 && p.x < this.grid[0].length
      && p.y >= 0 && p.y < this.grid.length
  }

  private displayGrid(antinodes: Vector2[]) {
    antinodes.forEach(un => {
      if (this.grid[un.y][un.x] !== '.') return
      this.grid[un.y][un.x] = '#'
    })
    console.log(this.grid.map(l => l.join('')).join('\n'))
  }
}