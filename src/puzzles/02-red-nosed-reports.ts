import { formatPuzzleAnswer } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle2 extends BasePuzzle {

  private reports: number[][] = []

  run(): void {
    this.loadInput('02')
    if (!this.input) return

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                   Day 2: Red-Nosed Reports                      ⎹`)
    console.log('  ⎸                          _    ______    _                 ★         ⎹')
    console.log('  ⎸                 ★       (_)  |______|  (_)                          ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    this.setup()
    this.partOne()
    this.partTwo()
    this.input = ''
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.reports = this.input.split('\n')
      .filter(l => l.length > 1)
      .map(rep => rep.split(' ').map(n => parseInt(n)))
  }

  protected partOne(): void {
    const answer = this.reports.filter(rep =>
         rep.every((n, idx, arr) => idx === 0 || (arr[idx-1] < n && n - arr[idx-1] <= 3)) // at the start || (increasing && diff <= 3)
      || rep.every((n, idx, arr) => idx === 0 || (arr[idx-1] > n && arr[idx-1] - n <= 3)) // at the start || (decreasing && diff <= 3)
    ).length
    console.log(formatPuzzleAnswer('N° of safe reports: ', answer))
  }

  // TODO finish this
  protected partTwo(): void {
    const answer = this.reports.filter(rep =>
      rep.every((n, idx, arr) => {
        let diff = Math.abs(n - arr[idx-1])
        return idx === 0 || diff >= 0 && diff <= 3
      })
    )
    console.log(answer)
    console.log(formatPuzzleAnswer('N° of safe reports, dampened: ', answer.length))
  }
}