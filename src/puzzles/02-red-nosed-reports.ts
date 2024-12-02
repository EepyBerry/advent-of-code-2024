import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle2 extends BasePuzzle {

  private reports: number[][] = []

  run(): void {
    this.loadInput('02')
    if (!this.input) return
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                      Day 2: Red-Nosed Reports       ★               ⎹`)
    console.log('  ⎸          ★               _    ______    _                           ⎹')
    console.log('  ⎸                         (_)  |______|  (_)                     ★    ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ N° of safe reports:          ${this.partOne().toString().padEnd(38, ' ')} ⎹`)
    console.log(`  ⎸ N° of safe-ish reports:      ${this.partTwo().toString().padEnd(38, ' ')} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    this.reports = this.input.split('\n')
      .filter(l => l.length > 1)
      .map(rep => rep.split(' ').map(n => parseInt(n)))
  }

  protected partOne(): number {
    const answer = this.reports.filter(rep => this.isReportSafe(rep)).length
    return answer
  }

  protected partTwo(): number {
    let answer = 0
    this.reports.forEach(rep => {
      
      // Immediatly return fully safe reports
      if (this.isReportSafe(rep)) {
        answer++
        return
      }
      // Brute-force remaining reports, 'cause f*ck those engineers
      for (let i = 0; i < rep.length; i++) {
        let slicedRep = rep.toSpliced(i, 1)
        if (this.isReportSafe(slicedRep)) {
          answer++
          return
        }
      }
    })
    return answer
  }

  private isReportSafe(rep: number[]): boolean {
    return rep.every((n, idx, arr) => idx === 0 || (arr[idx-1] < n && n - arr[idx-1] <= 3)) // at the start || (increasing && diff <= 3)
      || rep.every((n, idx, arr) => idx === 0 || (arr[idx-1] > n && arr[idx-1] - n <= 3))   // at the start || (decreasing && diff <= 3)
  }
}