import { BasePuzzle } from "./base-puzzle";
import { dgr, dre, dnl, dnr, ddl, dt, ddr, s, dsept, dsepb, dpl, dpa, dul, dur, dph } from "@/aoc-toolbox/pretty-print";

export default class Puzzle2 extends BasePuzzle {

  private reports: number[][] = []

  run(): void {
    this.loadInput('02')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    const title = 'Red-Nosed Reports'
    console.log(`\n  ${dgr} _____________________________________________________________________ ${dre}`)
    console.log(`  ${dnl}                                                                     ${dnr}`)
    console.log(`  ${ddl}                      ${     dt(2, title)    }       #               ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}          #              ${     dsept     }                          ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                         ${     dsepb     }                     #    ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                                                                     ${ddr}`)
    console.log(`  ${ddl} ${dpl('Nb of safe reports:    ')}      ${dpa(this.partOne())      } ${ddr}`)
    console.log(`  ${ddl} ${dph('Nb of safe-ish reports:')}      ${dpa(this.partTwo())      } ${ddr}`)
    console.log(`  ${dul}_____________________________________________________________________${dur}`)
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