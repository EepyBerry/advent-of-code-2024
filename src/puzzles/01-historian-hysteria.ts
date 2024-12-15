import { BasePuzzle } from "./base-puzzle";
import { ddl, ddr, dgr, dnr, dnl, dre, dsepb, dsept, dt, s, dul, dur, dpl, dpa, dph } from "@/aoc-toolbox/pretty-print";

export default class Puzzle1 extends BasePuzzle {

  private leftList: number[] = []
  private rightList: number[] = []

  run(): void {
    this.loadInput('01')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    const title = 'Historian Hysteria'
    console.log(`\n  ${dgr} _____________________________________________________________________ ${dre}`)
    console.log(`  ${dnl}                                                                     ${dnr}`)
    console.log(`  ${ddl}   #                  ${     dt(1, title)     }                      ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                         ${     dsept     }                #         ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                 #       ${     dsepb     }                          ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                                                                     ${ddr}`)
    console.log(`  ${ddl} ${dpl('Distance between lists:')}      ${dpa(this.partOne())      } ${ddr}`)
    console.log(`  ${ddl} ${dph('Similarity score:      ')}      ${dpa(this.partTwo())      } ${ddr}`)
    console.log(`  ${dul}_____________________________________________________________________${dur}`)
  }

  protected setup(): void {
    this.input.forEach(l => {
      this.leftList.push(parseInt(l.split('   ')[0]))
      this.rightList.push(parseInt(l.split('   ')[1]))
    })
    this.leftList.sort()
    this.rightList.sort()
  }

  protected partOne(): number {
    return this.rightList.reduce((acc, cur, idx) => acc += Math.abs(cur - this.leftList[idx]), 0)
  }

  protected partTwo(): number {
    return this.leftList.reduce((acc, cur) => acc += cur * this.rightList.filter(nr => nr === cur).length, 0)
  }
}