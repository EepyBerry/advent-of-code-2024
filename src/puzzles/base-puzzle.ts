import * as fs from 'fs';

export abstract class BasePuzzle {

  input: string[] = []

  loadInput(file: string): void {
    try {
      this.input = fs.readFileSync(`src/_inputs/${file}.txt`, 'utf8')
        .split('\n')
        .filter(l => l.length > 1)
    } catch(err) {
      console.error('  [ERROR] Could not load ' + file)
    }
  }

  loadInputRaw(file: string): void {
    try {
      this.input = fs.readFileSync(`src/_inputs/${file}.txt`, 'utf8')
        .split('\n')
    } catch(err) {
        console.error('  [ERROR] Could not load ' + file)
    }
  }

  public abstract run(): void
  protected abstract partOne(): number|string
  protected abstract partTwo(): number|string
}