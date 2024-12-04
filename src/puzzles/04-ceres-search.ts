import { countMatches, toAnswerString, xbRgx } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle4 extends BasePuzzle {

  private grid: string = ''
  private p1rgx: string = '(?=(%).{#}(%).{#}(%).{#}(%))'
  private p2rgx: string = '(?=(%).(%).{#}(%).{#}(%).(%))'

  run(): void {
    this.loadInput('04')
    if (!this.input) return
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                 ★       Day 4: Ceres Search                         ⎹`)
    console.log('  ⎸                          _    ______    _                  ★        ⎹')
    console.log('  ⎸       ★                 (_)  |______|  (_)                          ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Nb of XMAS occurrences:      ${toAnswerString(this.partOne())} ⎹`)
    console.log(`  ⎸ Nb of X-MAS occurrences:     ${toAnswerString(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
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