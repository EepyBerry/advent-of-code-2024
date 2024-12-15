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
    console.log('  ⎸                          _    ______    _                           ⎹')
    console.log('  ⎸       ★                 (_)  |______|  (_)       ★                  ⎹')
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
    const gridCopy: string[] = deepClone(this.grid)
    let curPos: Vector2 = deepClone(this.startingPos)
    for (let i = 0; i < this.instructions.length; i++) {
      curPos = this.move(gridCopy, curPos, this.instrToPos(this.instructions[i]))
    }
    let gpsTotal = 0
    for (let y = 0; y < gridCopy.length; y++) {
      if (!gridCopy[y].includes('O')) continue
      gridCopy[y].split('').forEach((char, x) => {
        if (char !== 'O') return
        gpsTotal += (100 * y) + x
      })
    }
    return gpsTotal
  }

  protected partTwo(): number {
    const expandedGridCopy: string[] = deepClone(this.expandedGrid)
    let curPos: Vector2 = deepClone(this.startingExpandedPos)
    for (let i = 0; i < this.instructions.length; i++) {
      curPos = this.moveWide(expandedGridCopy, curPos, this.instrToPos(this.instructions[i]))
    }
    // console.log(expandedGridCopy.join('\n') + '\n')
    let gpsTotal = 0
    for (let y = 0; y < expandedGridCopy.length; y++) {
      if (!expandedGridCopy[y].includes('[')) continue
      expandedGridCopy[y].split('').forEach((char, x) => {
        if (char !== '[') return
        gpsTotal += (100 * y) + x
      })
    }
    return gpsTotal
  }

  // ----------------------------------------------------------------------------------------------
  // part 1 algorithm

  private move(grid: string[], curPos: Vector2, orientation: CardinalOrientation): Vector2 {
    let targetPos: Vector2 = getNextCardinalPosition(curPos, orientation)
    if (!this.checkAhead(grid, targetPos, orientation)) {
      return curPos
    }
    // move objects ahead recursively (end first, immediate last)
    if (grid[targetPos.y][targetPos.x] === 'O') {
      this.moveBox(grid, targetPos, orientation)
    }

    // move robot
    grid[curPos.y] = setCharAt(grid[curPos.y], curPos.x, '.')
    grid[targetPos.y] = setCharAt(grid[targetPos.y], targetPos.x, '@')
    return targetPos
  }

  private moveBox(grid: string[], boxPos: Vector2, orientation: CardinalOrientation) {
    let nextPos = getNextCardinalPosition(boxPos, orientation)
    if (grid[nextPos.y][nextPos.x] === 'O') {
      this.moveBox(grid, nextPos, orientation)
    }
    grid[boxPos.y] = setCharAt(grid[boxPos.y], boxPos.x, '.')
    grid[nextPos.y] = setCharAt(grid[nextPos.y], nextPos.x, 'O')
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

  private moveWide(grid: string[], curPos: Vector2, orientation: CardinalOrientation): Vector2 {
    let targetPos: Vector2 = getNextCardinalPosition(curPos, orientation)
    if (!this.checkAheadWide(grid, targetPos, orientation)) {
      return curPos
    }

    // move objects ahead recursively (end first, immediate last)
    if (grid[targetPos.y][targetPos.x] == '[') {
      this.moveBoxWide(grid, targetPos, orientation)
      if (!isHorizontal(orientation)) {
        this.moveBoxWide(grid, getNextCardinalPosition(targetPos, CardinalOrientation.EAST), orientation)
      }
    }
    if (grid[targetPos.y][targetPos.x] == ']') {
      this.moveBoxWide(grid, targetPos, orientation)
      if (!isHorizontal(orientation)) {
        this.moveBoxWide(grid, getNextCardinalPosition(targetPos, CardinalOrientation.WEST), orientation)
      }
    }

    // move robot
    grid[curPos.y] = setCharAt(grid[curPos.y], curPos.x, '.')
    grid[targetPos.y] = setCharAt(grid[targetPos.y], targetPos.x, '@')
    return targetPos
  }

  private moveBoxWide(grid: string[], boxPos: Vector2, orientation: CardinalOrientation) {
    let nextPos = getNextCardinalPosition(boxPos, orientation)
    if (grid[nextPos.y][nextPos.x] === '[') {
      if (isHorizontal(orientation)) {
        this.moveBoxWide(grid, nextPos, orientation)
      } else {
        // note: vertical movement needs to take into account both sides of the box!
        const otherSidePos = getNextCardinalPosition(nextPos, CardinalOrientation.EAST)
        this.moveBoxWide(grid, nextPos, orientation)
        this.moveBoxWide(grid, otherSidePos, orientation)
      }
    }
    else if (grid[nextPos.y][nextPos.x] === ']') {
      if (isHorizontal(orientation)) {
        this.moveBoxWide(grid, nextPos, orientation)
      } else {
        // note: see above
        const otherSidePos = getNextCardinalPosition(nextPos, CardinalOrientation.WEST)
        this.moveBoxWide(grid, otherSidePos, orientation)
        this.moveBoxWide(grid, nextPos, orientation)
      }
    }

    const boxSide = grid[boxPos.y][boxPos.x]
    grid[boxPos.y] = setCharAt(grid[boxPos.y], boxPos.x, '.')
    grid[nextPos.y] = setCharAt(grid[nextPos.y], nextPos.x, boxSide)
  }

  private checkAheadWide(grid: string[], targetPos: Vector2, orientation: CardinalOrientation): boolean {
    if (grid[targetPos.y][targetPos.x] === '#') return false
    if (grid[targetPos.y][targetPos.x] === '[') {
      if (isHorizontal(orientation)) {
        return this.checkAheadWide(grid, getNextCardinalPosition(targetPos, orientation), orientation)
      } else {
        // note: vertical movement needs to take into account both sides of the box!
        const otherSidePos = getNextCardinalPosition(targetPos, CardinalOrientation.EAST)
        return this.checkAheadWide(grid, getNextCardinalPosition(targetPos, orientation), orientation)
          && this.checkAheadWide(grid, getNextCardinalPosition(otherSidePos, orientation), orientation)
      }
    }
    if (grid[targetPos.y][targetPos.x] === ']') {
      if (isHorizontal(orientation)) {
        return this.checkAheadWide(grid, getNextCardinalPosition(targetPos, orientation), orientation)
      } else {
        // note: see above
        const otherSidePos = getNextCardinalPosition(targetPos, CardinalOrientation.WEST)
        return this.checkAheadWide(grid, getNextCardinalPosition(targetPos, orientation), orientation)
          && this.checkAheadWide(grid, getNextCardinalPosition(otherSidePos, orientation), orientation)
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