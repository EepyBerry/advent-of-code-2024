import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle1 extends BasePuzzle {

  private leftList: number[] = []
  private rightList: number[] = []

  run(): void {
    this.loadInput('01')
    if (!this.input) return
    this.setup()

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                  Day 1: Historian Hysteria                      ⎹`)
    console.log('  ⎸                          _    ______    _                 ★         ⎹')
    console.log('  ⎸                 ★       (_)  |______|  (_)                          ⎹')
    console.log(`  ⎸                                                                     ⎹`)
    console.log(`  ⎸ Distance between lists:      ${this.partOne().toString().padEnd(38, ' ')} ⎹`)
    console.log(`  ⎸ Similarity score:            ${this.partTwo().toString().padEnd(38, ' ')} ⎹`)
    console.log('  \\_____________________________________________________________________/')
  }

  protected setup(): void {
    let lines: string[] = this.input.split('\n')
    lines.forEach(l => {
      this.leftList.push(parseInt(l.split('   ')[0]))
      this.rightList.push(parseInt(l.split('   ')[1]))
    })
    this.leftList.pop()
    this.rightList.pop()
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