import { deepClone, isHorizontal, setCharAt, toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { CardinalOrientation, Vector2 } from "@/aoc-toolbox/types";
import { VEC2_ZERO } from "@/aoc-toolbox/math-utils";

export default class Puzzle15 extends BasePuzzle {

  private grid: string[] = []
  private expandedGrid: string[] = []
  private instructions: string = ''
  private startingPos: Vector2 = VEC2_ZERO
  private startingExpandedPos: Vector2 = VEC2_ZERO

  run(): void {
    this.loadInputRaw('15e')
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
    console.log(this.grid)
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
    console.log(this.expandedGrid)
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
    console.log(JSON.stringify(this.startingExpandedPos))
    const expandedGridCopy: string[] = deepClone(this.expandedGrid)
    let curPos: Vector2 = deepClone(this.startingExpandedPos)
    for (let i = 0; i < this.instructions.length; i++) {
      curPos = this.moveWide(expandedGridCopy, curPos, this.instrToPos(this.instructions[i]))
      console.log(expandedGridCopy.join('\n') + '\n')
    }
    let gpsTotal = 0
    for (let y = 0; y < expandedGridCopy.length; y++) {
      if (!expandedGridCopy[y].includes('O')) continue
      expandedGridCopy[y].split('').forEach((char, x) => {
        if (char !== 'O') return
        gpsTotal += (100 * y) + x
      })
    }
    return 0
  }

  // ----------------------------------------------------------------------------------------------

  private move(grid: string[], curPos: Vector2, orientation: CardinalOrientation): Vector2 {
    let targetPos: Vector2 = this.getNextPosition(curPos, orientation)
    if (!this.checkAhead(grid, targetPos, orientation)) {
      //console.log('cannot move '+orientation.toLowerCase())
      return curPos
    }
    //console.log('will move '+orientation.toLowerCase())

    // move objects ahead recursively (end first, immediate last)
    if (grid[targetPos.y][targetPos.x] === 'O') {
      this.moveBox(grid, targetPos, orientation)
    }

    // move robot
    grid[curPos.y] = setCharAt(grid[curPos.y], curPos.x, '.')
    grid[targetPos.y] = setCharAt(grid[targetPos.y], targetPos.x, '@')
    return targetPos
  }

  private checkAhead(grid: string[], targetPos: Vector2, orientation: CardinalOrientation): boolean {
    switch (grid[targetPos.y][targetPos.x]) {
      case '#': return false
      case 'O': return this.checkAhead(grid, this.getNextPosition(targetPos, orientation), orientation)
      default: return true
    }
  }

  private moveBox(grid: string[], boxPos: Vector2, orientation: CardinalOrientation) {
    let nextPos = this.getNextPosition(boxPos, orientation)
    if (grid[nextPos.y][nextPos.x] === 'O') {
      this.moveBox(grid, nextPos, orientation)
    }
    grid[boxPos.y] = setCharAt(grid[boxPos.y], boxPos.x, '.')
    grid[nextPos.y] = setCharAt(grid[nextPos.y], nextPos.x, 'O')
  }

  // ----------------------------------------------------------------------------------------------

  private moveWide(grid: string[], curPos: Vector2, orientation: CardinalOrientation): Vector2 {
    let targetPos: Vector2 = this.getNextPosition(curPos, orientation)
    if (!this.checkAheadWide(grid, targetPos, orientation)) {
      console.log('cannot move '+orientation.toLowerCase())
      return curPos
    }

    if (grid[targetPos.y][targetPos.x] == '[') {
      const otherSidePos = this.getNextPosition(targetPos, CardinalOrientation.EAST)
      this.moveBoxWide(grid, targetPos, orientation, '[')
      this.moveBoxWide(grid, otherSidePos, orientation, ']')
    }
    if (grid[targetPos.y][targetPos.x] == ']') {
      const otherSidePos = this.getNextPosition(targetPos, CardinalOrientation.WEST)
      this.moveBoxWide(grid, targetPos, orientation, ']')
      this.moveBoxWide(grid, otherSidePos, orientation, '[')
    }

    grid[curPos.y] = setCharAt(grid[curPos.y], curPos.x, '.')
    grid[targetPos.y] = setCharAt(grid[targetPos.y], targetPos.x, '@')
    return targetPos
  }

  private checkAheadWide(grid: string[], targetPos: Vector2, orientation: CardinalOrientation): boolean {
    if (grid[targetPos.y][targetPos.x] === '#') return false
    if (grid[targetPos.y][targetPos.x] === '[') {
      const otherSidePos = this.getNextPosition(targetPos, CardinalOrientation.EAST)
      return isHorizontal(orientation)
        ? this.checkAheadWide(grid, this.getNextPosition(targetPos, orientation), orientation)
        : (this.checkAheadWide(grid, this.getNextPosition(targetPos, orientation), orientation)
           && this.checkAheadWide(grid, this.getNextPosition(otherSidePos, orientation), orientation))
    }
    if (grid[targetPos.y][targetPos.x] === ']') {
      const otherSidePos = this.getNextPosition(targetPos, CardinalOrientation.WEST)
      return isHorizontal(orientation)
        ? this.checkAheadWide(grid, this.getNextPosition(targetPos, orientation), orientation)
        : (this.checkAheadWide(grid, this.getNextPosition(targetPos, orientation), orientation)
           && this.checkAheadWide(grid, this.getNextPosition(otherSidePos, orientation), orientation))
    }
    return true
  }

  private moveBoxWide(grid: string[], boxPos: Vector2, orientation: CardinalOrientation, boxSide: string) {
    let nextPos = this.getNextPosition(boxPos, orientation)
    let otherSidePos
    if (grid[nextPos.y][nextPos.x] === '[') {
      otherSidePos = this.getNextPosition(nextPos, CardinalOrientation.EAST)
      this.moveBoxWide(grid, nextPos, orientation, '[')
      this.moveBoxWide(grid, otherSidePos, orientation, ']')
    }
    else if (grid[nextPos.y][nextPos.x] === ']') {
      otherSidePos = this.getNextPosition(nextPos, CardinalOrientation.WEST)
      this.moveBoxWide(grid, nextPos, orientation, ']')
      this.moveBoxWide(grid, otherSidePos, orientation, '[')
    }
    grid[boxPos.y] = setCharAt(grid[boxPos.y], boxPos.x, '.')
    grid[nextPos.y] = setCharAt(grid[nextPos.y], nextPos.x, boxSide)
  }

  // ----------------------------------------------------------------------------------------------

  private getNextPosition(curPos: Vector2, orientation: CardinalOrientation) {
    switch (orientation) {
      case CardinalOrientation.NORTH: return { x: curPos.x, y: curPos.y-1 }
      case CardinalOrientation.EAST:  return { x: curPos.x+1, y: curPos.y }
      case CardinalOrientation.SOUTH: return { x: curPos.x, y: curPos.y+1 }
      case CardinalOrientation.WEST:  return { x: curPos.x-1, y: curPos.y }
    }
  }

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