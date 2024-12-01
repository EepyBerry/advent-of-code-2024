import { formatPuzzleAnswer } from "../utils.ts";
import { BasePuzzle } from "./base-puzzle.ts";

export default class Puzzle1 extends BasePuzzle {

  private leftList: number[] = []
  private rightList: number[] = []

  run(): void {
    this.loadInput('01')
    if (!this.input) return

    console.log('\n   _____________________________________________________________________ ')
    console.log(`  /                                                                     \\`)
    console.log(`  ⎸   ★                  Day 1: Historian Hysteria                      ⎹`)
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

  protected partOne(): void {
    const answer = this.rightList.reduce((acc, cur, idx) => acc += Math.abs(cur - this.leftList[idx]), 0)
    console.log(formatPuzzleAnswer('Distance between the lists: ', answer))
  }

  protected partTwo(): void {
    const answer = this.leftList.reduce((acc, cur) => acc += cur * this.rightList.filter(nr => nr === cur).length, 0)
    console.log(formatPuzzleAnswer('Similarity score: ', answer))
  }
}