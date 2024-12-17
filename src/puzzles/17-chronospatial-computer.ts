import { formatAnswer } from "@toolbox/utils";
import { BasePuzzle } from "./base-puzzle";

type Instruction = { opcode: string, value: number }
const OPCODE_MAP: string[] = ['adv', 'bxl', 'bst', 'jnz', 'bxc', 'out', 'bdv', 'cdv']

export default class Puzzle17 extends BasePuzzle {

  private $A: number = 0
  private $B: number = 0
  private $C: number = 0
  private program: Instruction[] = []

  run(): void {
    this.loadInput('17')
    if (!this.input) return
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸                     Day 17: Chronospatial Computer         ★        ⎹`)
    console.log(`  ⎸                 ★        _    ______    _                           ⎹`)
    console.log(`  ⎸       ★                 (_)  |______|  (_)                          ⎹`)
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Program output:              ${formatAnswer(this.partOne())} ⎹`)
    console.log(`  ⎸ Lowest $A value for quine:   ${formatAnswer(this.partTwo())} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    console.log(this.input)
    this.$A = parseInt(this.input[0].split(' ')[2])
    this.$B = parseInt(this.input[1].split(' ')[2])
    this.$C = parseInt(this.input[2].split(' ')[2])
    this.input[3].split(' ')[1].split(',').forEach((opcode, idx: number, arr) => {
      if (idx % 2 !== 0) return
      this.program.push({ opcode: OPCODE_MAP[parseInt(opcode)], value: parseInt(arr[idx+1]) })
    })
    console.log(this.$A)
    console.log(this.$B)
    console.log(this.$C)
    console.log(this.program)
  }

  protected partOne(): string {
    const output = this.execProgram()
    return output.join(',')
  }

  protected partTwo(): string {
    let output: number[] = []
    while(output.join(',') !== this.program.join(',')) {
      output = this.execProgram()
    }
    return output.join(',')
  }

  // ----------------------------------------------------------------------------------------------

  private execProgram(): number[] {
    const outputTable: number[] = []
    let iterations = 0
    for (let instPtr = 0; instPtr < this.program.length; instPtr++) {
      iterations++
      const opcode: string = this.program[instPtr].opcode
      const value: number = this.program[instPtr].value
      switch (opcode) {
        case 'adv': this.$A = Math.trunc(this.$A/Math.pow(2, this.parseCMOP(value))); break;
        case 'bxl': this.$B = this.$B ^ value; break;
        case 'bst': this.$B = this.parseCMOP(value) % 8; break;
        case 'jnz': instPtr = (this.$A === 0 ? instPtr : value-1); continue;
        case 'bxc': this.$B = this.$B ^ this.$C; break;
        case 'out': outputTable.push(this.parseCMOP(value) % 8); break;
        case 'bdv': this.$B = Math.trunc(this.$A/Math.pow(2, this.parseCMOP(value))); break;
        case 'cdv': this.$C = Math.trunc(this.$A/Math.pow(2, this.parseCMOP(value))); break;
      }
    }
    //console.log(iterations)
    return outputTable
  }

  private parseCMOP(value: number) {
    if ([0,1,2,3].includes(value)) return value
    if (value === 4) return this.$A
    if (value === 5) return this.$B
    if (value === 6) return this.$C
    return 7
  }
}