import * as fs from 'fs';

export abstract class BasePuzzle {

    input: string = ''

    loadInput(file: string): void {
        try {
            this.input = fs.readFileSync(`src/_inputs/${file}.txt`, 'utf8')
        } catch(err) {
            console.error('Could not load ' + file)
        }
    }

    public abstract run(): void
    protected abstract partOne(): void
    protected abstract partTwo(): void
}