import { deepClone, setCharAt } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { CardinalOrientation, Vector2 } from "@/aoc-toolbox/types";
import { ORIENTATIONS, pointFromIndex } from "@/aoc-toolbox/math-utils";
import { dgr, dre, dnl, dnr, ddl, dt, ddr, s, dsept, dsepb, dpl, dpa, dph, dul, dur } from "@/aoc-toolbox/pretty-print";

type MazeNode = { north?: MazeNode, east?: MazeNode, south?: MazeNode, west?: MazeNode }

export default class Puzzle16 extends BasePuzzle {

  private maze!: string[]
  private mazeGraph!: MazeNode
  private startPoint!: Vector2
  private endPoint!: Vector2

  run(): void {
    this.loadInput('16e')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    const title = 'Reindeer Maze'
    console.log(`\n  ${dgr} _____________________________________________________________________ ${dre}`)
    console.log(`  ${dnl}                                                                     ${dnr}`)
    console.log(`  ${ddl}   #                    ${  dt(16, title)   }                        ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}             #           ${     dsept     }                          ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                         ${     dsepb     }                      #   ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                                                                     ${ddr}`)
    console.log(`  ${ddl} ${dpl('Lowest score:              ')}  ${dpa(this.partOne())      } ${ddr}`)
    console.log(`  ${ddl} ${dph('Lowest score:              ')}  ${dpa(this.partTwo())      } ${ddr}`)
    console.log(`  ${dul}_____________________________________________________________________${dur}`)
  }

  protected setup(): void {
    this.maze = this.input.map(l => l.replaceAll('\r', ''))
    this.startPoint = { x: 1, y: this.input.length-2 }
    this.endPoint =   { x: this.input[0].length-2, y: 1 }
  }

  protected partOne(): number {
    let finalScores: number[] = []
    this.scanAndMove(this.maze, this.startPoint, CardinalOrientation.EAST, 0, finalScores)
    console.log(finalScores)
    return Math.min(...finalScores)
  }

  protected partTwo(): number {
    return 0
  }

  // ----------------------------------------------------------------------------------------------

  private scanAndMove(maze: string[], curPos: Vector2, orientation: CardinalOrientation, score: number, finalScores: number[]): void {
    if (score >= Math.min(...finalScores)) return
    if (maze[curPos.y][curPos.x] === 'E') {
      finalScores.push(score)
      return
    }

    let tiles = this.checkAdjacentTiles(maze, curPos, orientation)
    if (this.countPaths(tiles) === 0) return

    maze[curPos.y] = setCharAt(maze[curPos.y], curPos.x, 'X') // mark as visited with an X
    tiles.forEach((t, i) => {
      if (t === 0) return
      this.scanAndMove(
        deepClone(maze),
        pointFromIndex(curPos, i),
        ORIENTATIONS[i],
        score + (ORIENTATIONS[i] === orientation ? 1 : 1001),
        finalScores
      )
    })
  }

  private countPaths(tiles: number[]): number {
    return tiles.filter(t => t === 1).length
  }

  private checkAdjacentTiles(maze: string[], pos: Vector2, orientation?: CardinalOrientation): number[] {
    let tiles: number[] = [0,0,0,0]
    if (!(['#','X'].includes(maze[pos.y-1][pos.x]))) tiles[0] = 1
    if (!(['#','X'].includes(maze[pos.y][pos.x+1]))) tiles[1] = 1
    if (!(['#','X'].includes(maze[pos.y+1][pos.x]))) tiles[2] = 1
    if (!(['#','X'].includes(maze[pos.y][pos.x-1]))) tiles[3] = 1

    // block paths that are "before" the given position (e.g. if orientation is NORTH, then SOUTH is blocked, etc)
    if(orientation) {
      switch (orientation) {
        case CardinalOrientation.NORTH: tiles[2] = 0; break
        case CardinalOrientation.EAST:  tiles[3] = 0; break
        case CardinalOrientation.SOUTH: tiles[0] = 0; break
        case CardinalOrientation.WEST:  tiles[1] = 0; break
      }
    }
    return tiles
  }
}