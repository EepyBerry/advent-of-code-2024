import { toAnswerString } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle5 extends BasePuzzle {

  private grid: string[][] = []
  private startingPosition: number[] = [0,0]
  private dirLoop = 'URDL'

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
    console.log(`  ⎸ Nb of X-MAS occurrences:     ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.grid = this.input.map(l => l.replaceAll('\r', '').split(''))
    for (let i = 0; i < this.grid.length; i++) {
      if (!this.grid[i].includes('^')) continue
      this.startingPosition[1] = i
      this.startingPosition[0] = this.grid[i].findIndex(l => l === '^')
      this.grid[this.startingPosition[1]][this.startingPosition[0]] === 'o'
      break
    }
    console.log(this.startingPosition)
  }

  protected partOne(): number {
    let answer = 1
    let dirIdx = 0
    const curPos = Array(...this.startingPosition)
    while (this.isPositionValid(curPos[0], curPos[1])) {
      let targetPos: number[] = this.getNextPosition(curPos, dirIdx)
      // if obstacle ahead, turn and recalculate target position
      if (this.grid[targetPos[1]][targetPos[0]] === '#') {
        dirIdx = this.turnRight(dirIdx)
        targetPos = this.getNextPosition(curPos, dirIdx)
      }
      // count position if unmarked, else mark it
      if (this.grid[targetPos[1]][targetPos[0]] === 'o')

      // move
      curPos[0] = targetPos[0]
      curPos[1] = targetPos[1]
    }
    return answer
  }

  protected partTwo(): number {
    return 0
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