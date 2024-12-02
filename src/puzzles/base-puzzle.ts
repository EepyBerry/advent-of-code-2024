import * as fs from 'fs';

export abstract class BasePuzzle {

    input: string[] = []

    loadInput(file: string): void {
        try {
            this.input = fs.readFileSync(`src/_inputs/${file}.txt`, 'utf8')
              .split('\n')
              .filter(l => l.length > 1)
        } catch(err) {
            console.error('Could not load ' + file)
        }
    }

    public abstract run(): void
    protected abstract partOne(): number
    protected abstract partTwo(): number
}