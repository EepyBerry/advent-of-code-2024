import { toAnswerString } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle5 extends BasePuzzle {

  private grid: string[][] = []
  private startingPosition: number[] = [0,0]
  private dirLoop = 'URDL'
  private visitedDirChars = '↑→↓←'

  run(): void {
    this.loadInput('06e')
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
    for (let i = 0; i < this.grid.length; i++) {
      if (!this.grid[i].includes('^')) continue
      this.startingPosition[1] = i
      this.startingPosition[0] = this.grid[i].findIndex(l => l === '^')
      break
    }
    console.log(this.startingPosition)
  }

  protected partOne(): number {
    return this.runPatrol(this.startingPosition).length
  }

  protected partTwo(): number {
    const positions = this.runPatrol(this.startingPosition)
    return 0
  }

  // ----------------------------------------------------------------------------------------------

  private runPatrol(curPos: number[]): number[][] {
    const gridCopy = [...this.grid]
    const distinctPositions: number[][] = []
    let targetPos: number[] = [],
        dirIdx = 0
    while (this.isPositionValid(curPos[0], curPos[1])) {
      // count position if unmarked, else mark it
      if (!this.visitedDirChars.includes(gridCopy[curPos[1]][curPos[0]])) {
        distinctPositions.push([...curPos])
        gridCopy[curPos[1]][curPos[0]] = this.visitedDirChars[dirIdx]
      }

      // break if next position is out of the grid
      targetPos = this.getNextPosition(curPos, dirIdx)
      if (!this.isPositionValid(targetPos[0], targetPos[1])) {
        break;
      }

      // if obstacle ahead, turn and recalculate target position
      if (gridCopy[targetPos[1]][targetPos[0]] === '#') {
        dirIdx = this.turnRight(dirIdx)
        targetPos = this.getNextPosition(curPos, dirIdx)
      }

      // move
      curPos[0] = targetPos[0]
      curPos[1] = targetPos[1]
    }
    console.log(gridCopy.map(l => l.join('')).join('\n'))
    return distinctPositions
  }

  private isPositionValid(x: number, y: number): boolean {
    return x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length
  }
  private getNextPosition(curPos: number[], dirIdx: number): number[] {
    let targetPos: number[] = []
    switch (this.dirLoop[dirIdx]) {
      case 'U': targetPos = [curPos[0], curPos[1]-1]; break;
      case 'R': targetPos = [curPos[0]+1, curPos[1]]; break;
      case 'D': targetPos = [curPos[0], curPos[1]+1]; break;
      case 'L': targetPos = [curPos[0]-1, curPos[1]]; break;
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
}