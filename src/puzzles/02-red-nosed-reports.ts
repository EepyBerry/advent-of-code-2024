import { toAnswerString } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";

export default class Puzzle2 extends BasePuzzle {

  private reports: number[][] = []

  run(): void {
    this.loadInput('02')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                      Day 2: Red-Nosed Reports       ★               ⎹`)
    console.log('  ⎸          ★               _    ______    _                           ⎹')
    console.log('  ⎸                         (_)  |______|  (_)                     ★    ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Nb of safe reports:          ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Nb of safe-ish reports:      ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.reports = this.input.map(rep => rep.split(' ').map(n => parseInt(n)))
  }

  protected partOne(): number {
    return this.reports.filter(rep => this.isReportSafe(rep)).length
  }

  protected partTwo(): number {
    return this.reports.filter(rep => this.isReportSafe(rep) || this.isReportDampable(rep)).length
  }
  
  // ----------------------------------------------------------------------------------------------

  private isReportSafe(rep: number[]): boolean {
    return rep.every((n, idx, arr) => idx === 0 || (arr[idx-1] < n && n - arr[idx-1] <= 3)) // at the start || (increasing && diff <= 3)
      || rep.every((n, idx, arr) => idx === 0 || (arr[idx-1] > n && arr[idx-1] - n <= 3))   // at the start || (decreasing && diff <= 3)
  }

  private isReportDampable(rep: number[]): boolean {
    return rep.some((_n, idx, arr) => this.isReportSafe(arr.toSpliced(idx, 1)))
  }
}