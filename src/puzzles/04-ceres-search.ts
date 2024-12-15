import { xbRgx } from "@toolbox/xb-rgx";
import { countMatches } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";
import { dgr, dre, dnl, dnr, ddl, dt, ddr, s, dsept, dsepb, dpl, dpa, dph, dul, dur } from "@/aoc-toolbox/pretty-print";

export default class Puzzle4 extends BasePuzzle {

  private grid: string = ''
  private p1rgx: string = '(?=(%).{#}(%).{#}(%).{#}(%))'
  private p2rgx: string = '(?=(%).(%).{#}(%).{#}(%).(%))'

  run(): void {
    this.loadInput('04')
    if (this.input?.length === 0) {
      return
    }
    this.setup()

    const title = 'Ceres Search'
    console.log(`\n  ${dgr} _____________________________________________________________________ ${dre}`)
    console.log(`  ${dnl}                                                                     ${dnr}`)
    console.log(`  ${ddl}                 #       ${  dt(4, title)  }                         ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                         ${     dsept     }                 #        ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}       #                 ${     dsepb     }                          ${ddr}`.replaceAll('#', s))
    console.log(`  ${ddl}                                                                     ${ddr}`)
    console.log(`  ${ddl} ${dpl('Nb of XMAS occurrences: ')}     ${dpa(this.partOne())      } ${ddr}`)
    console.log(`  ${ddl} ${dph('Nb of X-MAS occurrences:')}     ${dpa(this.partTwo())      } ${ddr}`)
    console.log(`  ${dul}_____________________________________________________________________${dur}`)
  }

  protected setup(): void {
    this.grid = this.input.join('\n').replaceAll('\r', '')
  }

  protected partOne(): number {
    const ll = this.input[0].length-1
    return [
      countMatches(this.grid, xbRgx(this.p1rgx, { replace: 0, patch: 'XMAS' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p1rgx, { replace: 0, patch: 'SAMX' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p1rgx, { replace: ll, patch: 'XMAS' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p1rgx, { replace: ll, patch: 'SAMX' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p1rgx, { replace: ll+1, patch: 'XMAS' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p1rgx, { replace: ll-1, patch: 'XMAS' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p1rgx, { replace: ll+1, patch: 'SAMX' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p1rgx, { replace: ll-1, patch: 'SAMX' }, 'gs')),
    ].reduce((cur, acc) => acc += cur, 0)
  }

  protected partTwo(): number {
    const ll = this.input[0].length-1
    return [
      countMatches(this.grid, xbRgx(this.p2rgx, { replace: ll-1, patch: 'MMASS' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p2rgx, { replace: ll-1, patch: 'MSAMS' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p2rgx, { replace: ll-1, patch: 'SMASM' }, 'gs')),
      countMatches(this.grid, xbRgx(this.p2rgx, { replace: ll-1, patch: 'SSAMM' }, 'gs')),
    ].reduce((cur, acc) => acc += cur, 0)
  }
}