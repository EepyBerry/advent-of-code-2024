import { countRgxMatches, toAnswerString, xbRgx } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle4 extends BasePuzzle {

  private grid: string = ''

  private fwdRgx: string = '(?=(X).{#}(M).{#}(A).{#}(S))' // '#' token replaced with skip length
  private revRgx: string = '(?=(S).{#}(A).{#}(M).{#}(X))' // '#' token replaced with skip length

  private crossRgx: string = '(?=(%).(%).{#}(%).{#}(%).(%))' // '%' tokens replaced with ordered letter matches, '#' token replaced with skip length

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
      countRgxMatches(this.grid, xbRgx(this.fwdRgx, { replace: 0 }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.revRgx, { replace: 0 }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.fwdRgx, { replace: ll }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.revRgx, { replace: ll }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.fwdRgx, { replace: ll+1 }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.fwdRgx, { replace: ll-1 }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.revRgx, { replace: ll+1 }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.revRgx, { replace: ll-1 }, 'gs')),
    ].reduce((cur, acc) => acc += cur, 0)
  }

  protected partTwo(): number {
    const ll = this.input[0].length-1
    return [
      countRgxMatches(this.grid, xbRgx(this.crossRgx, { replace: ll-1, patch: 'MMASS' }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.crossRgx, { replace: ll-1, patch: 'MSAMS' }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.crossRgx, { replace: ll-1, patch: 'SMASM' }, 'gs')),
      countRgxMatches(this.grid, xbRgx(this.crossRgx, { replace: ll-1, patch: 'SSAMM' }, 'gs')),
    ].reduce((cur, acc) => acc += cur, 0)
  }
}