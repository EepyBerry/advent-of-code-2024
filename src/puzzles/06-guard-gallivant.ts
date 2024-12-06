import { deepClone, toAnswerString } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle5 extends BasePuzzle {

  private grid: string[][] = []
  private startingPosition: number[] = [0,0]
  private dirLoop = '↑→↓←'

  run(): void {
    this.loadInput('06')
    if (!this.input) return
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                       Day 6: Guard Gallivant                ★       ⎹`)
    console.log('  ⎸                          _    ______    _                           ⎹')
    console.log('  ⎸       ★                 (_)  |______|  (_)       ★                  ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Distinct positions:          ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Possible obstruction spots:  ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.grid = this.input.map(l => l.replaceAll('\r', '').split(''))
    const startingY = this.grid.findIndex(row => row.includes('^'))
    this.startingPosition[1] = startingY
    this.startingPosition[0] = this.grid[startingY].findIndex(l => l === '^')
  }

  protected partOne(): number {
    return this.runPatrol(deepClone(this.grid), deepClone(this.startingPosition)).length
  }

  protected partTwo(): number {
    let gridCopy = deepClone(this.grid)
    const positions = this.runPatrol(gridCopy, deepClone(this.startingPosition))
    return positions.slice(1).filter((pos) => {
      gridCopy = deepClone(this.grid)
      gridCopy[pos[1]][pos[0]] = 'O'
      return this.runPatrol(gridCopy, deepClone(this.startingPosition), true).length === 0
    }).length
  }

  // ----------------------------------------------------------------------------------------------

  private runPatrol(gridCopy: string[][], curPos: number[], stopOnLoop: boolean = false): number[][] {
    const distinctPositions: number[][] = []
    let targetPos: number[] = [],
        dirIdx = 0
    let iterations = 0, maxIterations = 10000
    while (this.isPositionValid(curPos[0], curPos[1]) && iterations < maxIterations) {
      iterations++
      // count position if unmarked, else mark it
      if (!this.isPositionVisited(gridCopy, curPos[0], curPos[1])) {
        distinctPositions.push([...curPos])
        gridCopy[curPos[1]][curPos[0]] = this.dirLoop[dirIdx]
      }

      // break if next position is out of the grid
      targetPos = this.getNextPosition(curPos, dirIdx)
      if (!this.isPositionValid(targetPos[0], targetPos[1])) {
        break;
      }

      // if obstacle ahead, turn and recalculate target position
      while (['#','O'].includes(gridCopy[targetPos[1]][targetPos[0]])) {
        dirIdx = this.turnRight(dirIdx)
        targetPos = this.getNextPosition(curPos, dirIdx)

        // if errorOnLoop is true, check if targetPos is already visited
        if (stopOnLoop && this.isPositionVisited(gridCopy, targetPos[0], targetPos[1]) && this.hasSameOrientation(gridCopy, targetPos[0], targetPos[1], dirIdx)) {
          this.logGrid(gridCopy)
          return []
        }
      }
      // move
      curPos[0] = targetPos[0]
      curPos[1] = targetPos[1]
    }
    return iterations >= maxIterations ? [] : distinctPositions
  }

  private isPositionValid(x: number, y: number): boolean {
    return x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length
  }

  private isPositionVisited(gridCopy: string[][], x: number, y: number) {
    return this.dirLoop.includes(gridCopy[y][x]) || gridCopy[y][x] === '+'
  }
  private hasSameOrientation(gridCopy: string[][], x: number, y: number, dirIdx: number) {
    return this.dirLoop.includes(gridCopy[y][x]) && this.dirLoop[dirIdx] === gridCopy[y][x]
  }

  private getNextPosition(curPos: number[], dirIdx: number): number[] {
    let targetPos: number[] = []
    switch (this.dirLoop[dirIdx]) {
      case '↑': targetPos = [curPos[0], curPos[1]-1]; break;
      case '→': targetPos = [curPos[0]+1, curPos[1]]; break;
      case '↓': targetPos = [curPos[0], curPos[1]+1]; break;
      case '←': targetPos = [curPos[0]-1, curPos[1]]; break;
    }
    return targetPos
  }

  private turnRight(dirIdx: number): number {
    dirIdx++
    if (dirIdx > this.dirLoop.length-1) {
      dirIdx = 0
    }
    return dirIdx
  }

  private logGrid(grid: string[][]) {
    // console.log(grid.map(l => l.join('')).join('\n'))
    // console.log('\n')
  }
}