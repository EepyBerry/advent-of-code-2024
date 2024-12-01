import { BaseChallenge } from "./base-challenge.ts";

export default class ChallengeOne extends BaseChallenge {

  private leftList: number[] = []
  private rightList: number[] = []

  run(): void {
    this.loadInput('01')
    if (!this.input) return

    console.log(`\n _`)
    console.log(`(_)   DAY ONE: Historian Hysteria`)
    console.log('_______________________________________________________________\n')
    this.setup()
    this.partOne()
    this.partTwo()
    this.input = ''
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
    const total = this.rightList.reduce((acc, cur, idx) => acc += Math.abs(cur - this.leftList[idx]), 0)
    console.log('* (Part 1) Answer: ' + total)
  }

  protected partTwo(): void {
    const total = this.leftList.reduce((acc, cur) => acc += cur * this.rightList.filter(nr => nr === cur).length, 0)
    console.log('* (Part 2) Answer: ' + total)
  }
}