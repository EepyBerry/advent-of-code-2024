import { deepClone, getNextCardinalPosition, isHorizontal, setCharAt, toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { CardinalOrientation, Vector2 } from "@/aoc-toolbox/types";
import { VEC2_ZERO } from "@/aoc-toolbox/math-utils";

export default class Puzzle15 extends BasePuzzle {

  private instructions: string = ''

  // part 1
  private grid: string[] = []
  private startingPos: Vector2 = VEC2_ZERO

  // part 2
  private expandedGrid: string[] = []
  private startingExpandedPos: Vector2 = VEC2_ZERO
  
  run(): void {
    this.loadInputRaw('15')
    if (!this.input) return
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                       Day 15: Warehouse Woes                ★       ⎹`)
    console.log(`  ⎸                          _    ______    _                           ⎹`)
    console.log(`  ⎸       ★                 (_)  |______|  (_)       ★                  ⎹`)
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Box GPS coordinates sum:     ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Box GPS coordinates sum:     ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.input.forEach((line,y) => {
      line = line.replaceAll('\r', '')
      if (line.length === 0) return

      if (line.startsWith('#')) {
        this.grid.push(line)
        this.expandedGrid.push('')
        if (line.includes('@')) this.startingPos = { x: line.indexOf('@'), y }
      }
      else {
        this.instructions += line
      }
    })
    this.grid.forEach((row, y) => {
      row.split('').forEach((char, x) => {
        switch(char) {
          case '#': this.expandedGrid[y] += '##'; break
          case '@': this.expandedGrid[y] += '@.'; this.startingExpandedPos = { x: this.expandedGrid[y].length-2, y }; break
          case 'O': this.expandedGrid[y] += '[]'; break
          case '.': this.expandedGrid[y] += '..'; break
        }
      })
    })
  }

  protected partOne(): number {
    // apply grid movements
    let curPos: Vector2 = deepClone(this.startingPos)
    for (let i = 0; i < this.instructions.length; i++) {
      curPos = this.move(curPos, this.instrToPos(this.instructions[i]))
    }
    // calculate GPS total for every box ('O')
    let gpsTotal = 0
    for (let y = 0; y < this.grid.length; y++) {
      if (!this.grid[y].includes('O')) continue
      this.grid[y].split('').forEach((char, x) => {
        if (char !== 'O') return
        gpsTotal += (100 * y) + x
      })
    }
    return gpsTotal
  }

  protected partTwo(): number {
    // apply grid movements
    let curPos: Vector2 = deepClone(this.startingExpandedPos)
    for (let i = 0; i < this.instructions.length; i++) {
      curPos = this.moveWide(curPos, this.instrToPos(this.instructions[i]))
    }
    // calculate GPS total for every box ('[')
    let gpsTotal = 0
    for (let y = 0; y < this.expandedGrid.length; y++) {
      if (!this.expandedGrid[y].includes('[')) continue
      this.expandedGrid[y].split('').forEach((char, x) => {
        if (char !== '[') return
        gpsTotal += (100 * y) + x
      })
    }
    return gpsTotal
  }

  // ----------------------------------------------------------------------------------------------
  // part 1 algorithm

  private move(curPos: Vector2, orientation: CardinalOrientation): Vector2 {
    let targetPos: Vector2 = getNextCardinalPosition(curPos, orientation)
    if (!this.checkAhead(this.grid, targetPos, orientation)) {
      return curPos
    }
    // move objects ahead recursively (end first, immediate last)
    if (this.grid[targetPos.y][targetPos.x] === 'O') {
      this.moveBox(targetPos, orientation)
    }

    // move robot
    this.grid[curPos.y] = setCharAt(this.grid[curPos.y], curPos.x, '.')
    this.grid[targetPos.y] = setCharAt(this.grid[targetPos.y], targetPos.x, '@')
    return targetPos
  }

  private moveBox(boxPos: Vector2, orientation: CardinalOrientation) {
    let nextPos = getNextCardinalPosition(boxPos, orientation)
    if (this.grid[nextPos.y][nextPos.x] === 'O') {
      this.moveBox(nextPos, orientation)
    }
    this.grid[boxPos.y] = setCharAt(this.grid[boxPos.y], boxPos.x, '.')
    this.grid[nextPos.y] = setCharAt(this.grid[nextPos.y], nextPos.x, 'O')
  }

  private checkAhead(grid: string[], targetPos: Vector2, orientation: CardinalOrientation): boolean {
    switch (grid[targetPos.y][targetPos.x]) {
      case '#': return false
      case 'O': return this.checkAhead(grid, getNextCardinalPosition(targetPos, orientation), orientation)
      default: return true
    }
  }

  // ----------------------------------------------------------------------------------------------
  // part 2 algorithm

  private moveWide(curPos: Vector2, orientation: CardinalOrientation): Vector2 {
    let targetPos: Vector2 = getNextCardinalPosition(curPos, orientation)
    if (!this.checkAheadWide(targetPos, orientation)) {
      return curPos
    }

    // move objects ahead recursively (end first, immediate last)
    if (this.expandedGrid[targetPos.y][targetPos.x] == '[') {
      this.moveBoxWide(targetPos, orientation)
      if (!isHorizontal(orientation)) {
        this.moveBoxWide(getNextCardinalPosition(targetPos, CardinalOrientation.EAST), orientation)
      }
    }
    if (this.expandedGrid[targetPos.y][targetPos.x] == ']') {
      this.moveBoxWide(targetPos, orientation)
      if (!isHorizontal(orientation)) {
        this.moveBoxWide(getNextCardinalPosition(targetPos, CardinalOrientation.WEST), orientation)
      }
    }

    // move robot
    this.expandedGrid[curPos.y] = setCharAt(this.expandedGrid[curPos.y], curPos.x, '.')
    this.expandedGrid[targetPos.y] = setCharAt(this.expandedGrid[targetPos.y], targetPos.x, '@')
    return targetPos
  }

  private moveBoxWide(boxPos: Vector2, orientation: CardinalOrientation) {
    let nextPos = getNextCardinalPosition(boxPos, orientation)
    if (this.expandedGrid[nextPos.y][nextPos.x] === '[') {
      if (isHorizontal(orientation)) {
        this.moveBoxWide(nextPos, orientation)
      } else {
        // note: vertical movement needs to take into account both sides of the box!
        const otherSidePos = getNextCardinalPosition(nextPos, CardinalOrientation.EAST)
        this.moveBoxWide(nextPos, orientation)
        this.moveBoxWide(otherSidePos, orientation)
      }
    }
    else if (this.expandedGrid[nextPos.y][nextPos.x] === ']') {
      if (isHorizontal(orientation)) {
        this.moveBoxWide(nextPos, orientation)
      } else {
        // note: see above
        const otherSidePos = getNextCardinalPosition(nextPos, CardinalOrientation.WEST)
        this.moveBoxWide(otherSidePos, orientation)
        this.moveBoxWide(nextPos, orientation)
      }
    }

    const boxSide = this.expandedGrid[boxPos.y][boxPos.x]
    this.expandedGrid[boxPos.y] = setCharAt(this.expandedGrid[boxPos.y], boxPos.x, '.')
    this.expandedGrid[nextPos.y] = setCharAt(this.expandedGrid[nextPos.y], nextPos.x, boxSide)
  }

  private checkAheadWide(targetPos: Vector2, orientation: CardinalOrientation): boolean {
    if (this.expandedGrid[targetPos.y][targetPos.x] === '#') return false
    if (this.expandedGrid[targetPos.y][targetPos.x] === '[') {
      if (isHorizontal(orientation)) {
        return this.checkAheadWide(getNextCardinalPosition(targetPos, orientation), orientation)
      } else {
        // note: vertical movement needs to take into account both sides of the box!
        const otherSidePos = getNextCardinalPosition(targetPos, CardinalOrientation.EAST)
        return this.checkAheadWide(getNextCardinalPosition(targetPos, orientation), orientation)
          && this.checkAheadWide(getNextCardinalPosition(otherSidePos, orientation), orientation)
      }
    }
    if (this.expandedGrid[targetPos.y][targetPos.x] === ']') {
      if (isHorizontal(orientation)) {
        return this.checkAheadWide(getNextCardinalPosition(targetPos, orientation), orientation)
      } else {
        // note: see above
        const otherSidePos = getNextCardinalPosition(targetPos, CardinalOrientation.WEST)
        return this.checkAheadWide(getNextCardinalPosition(targetPos, orientation), orientation)
          && this.checkAheadWide(getNextCardinalPosition(otherSidePos, orientation), orientation)
      }
    }
    return true
  }

  // ----------------------------------------------------------------------------------------------

  private instrToPos(char: string): CardinalOrientation {
    switch (char) {
      case '^': return CardinalOrientation.NORTH
      case '>': return CardinalOrientation.EAST
      case 'v': return CardinalOrientation.SOUTH
      case '<': return CardinalOrientation.WEST
      default: return CardinalOrientation.NORTH // unused
    }
  }
}