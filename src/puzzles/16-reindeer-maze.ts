import { concatInts, formatAnswer } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { Vector2 } from "@/aoc-toolbox/types";
import { VEC2_ZERO } from "@/aoc-toolbox/math-utils";

type MazeCrossing = { north: MazeCrossing, east: MazeCrossing, south: MazeCrossing, west: MazeCrossing, depth: number }

export default class Puzzle16 extends BasePuzzle {

  private maze: string[] = []
  private startPoint: Vector2 = VEC2_ZERO
  private endPoint: Vector2 = VEC2_ZERO

  run(): void {
    this.loadInput('16e')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                    Day 16: Reindeer Maze                        ⎹`)
    console.log(`  ⎸             ★            _    ______    _                           ⎹`)
    console.log(`  ⎸                         (_)  |______|  (_)                      ★   ⎹`)
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Total calibration result:    ${formatAnswer(this.partOne())} ⎹`)
    console.log(`  ⎸ Updated calibration result:  ${formatAnswer(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.maze = this.input.map(l => l.replaceAll('\r', ''))
    this.startPoint = { x: 1, y: this.input.length-2 }
    this.endPoint =   { x: this.input[0].length-2, y: 1 }
  }

  protected partOne(): number {
    return 0
  }

  protected partTwo(): number {
    return 0
  }

  // ----------------------------------------------------------------------------------------------

  private buildMazeGraph() {

  }
}