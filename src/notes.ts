import { INTERVAL_SEMITONES } from './intervals';

// About:
// Notes are integers relative to C3, The note on the third fret of the A string
// on a standard-tuned guitar, noting that guitar music is often written an
// octave higher.

// Let's just ignore octaves for now ???

function mod(x: number, n: number): number {
    return x - n * Math.floor(x / n);
}

export function mod12(x: number): number {
    return mod(x, 12);
}


// The index is the given value for the note of 0-11
export const NOTES: string[][] = [
    ['C'],
    ['C#', 'Db'],
    ['D'],
    ['D#', 'Eb'],
    ['E'],
    ['F'],
    ['F#', 'Gb'],
    ['G'],
    ['G#', 'Ab'],
    ['A'],
    ['A#', 'Bb'],
    ['B'],
];

// Index of natural notes:
const NATURAL_VALUES: { [note: string]: number } = {}
for (let i = 0; i < NOTES.length; i++) {
    for (let note of NOTES[i]) {
        if (!note.includes('#') && !note.includes('b')) {
            NATURAL_VALUES[note] = i;
        }
    }
}

const noteRegex: RegExp = /^([A-G])(#*|b*)((?:\+|-)?\d+)?$/;

export class NoteClass {
    naturalName: string;
    accidentals: string;
    value: number;

    constructor(noteString: string) {
        const parsed = noteRegex.exec(noteString);
        if (!parsed) {
            throw Error(`Could not parse note "${noteString}"`);
        }
        this.naturalName = parsed[1];
        this.accidentals = parsed[2];
        let value = NATURAL_VALUES[this.naturalName];
        if (this.accidentals[0] === '#') {
            value += this.accidentals.length;
        } else {
            value -= this.accidentals.length;
        }
        this.value = mod12(value);
    }

    toString() {
        return `${this.naturalName}${this.accidentals}`;
    }

    equalClass(otherNoteClass: NoteClass): boolean {
        return this.value === otherNoteClass.value;
    }

    addInterval(intervalName: string): NoteClass {
        if (intervalName === 'ROOT') {
            return this;
        }
        const intervalSemitones = INTERVAL_SEMITONES[intervalName];
        if (!intervalSemitones) {
            throw Error(`No such interval: "${intervalName}"`);
        }
        const intervalDegree = Number(intervalName.split('').filter((x) => /\d/.exec(x)).join(''));
        const rootNaturalIndex = 'CDEFGAB'.indexOf(this.naturalName);
        const resultNaturalIndex = rootNaturalIndex + intervalDegree - 1;
        const resultNatural = 'CDEFGAB'[mod(resultNaturalIndex, 7)];
        const resultClassmate = this.addSemitones(intervalSemitones);
        let accidentalCount = 0;
        let accidentals = '';
        let testNote: NoteClass;
        while (true) {
            accidentals = '#'.repeat(accidentalCount);
            testNote = new NoteClass(resultNatural + accidentals);
            if (resultClassmate.equalClass(testNote)) {
                break;
            }
            accidentals = 'b'.repeat(accidentalCount);
            testNote = new NoteClass(resultNatural + accidentals);
            if (resultClassmate.equalClass(testNote)) {
                break;
            }
            accidentalCount += 1;
        }
        return testNote;
    }

    addSemitones(semitones: number): NoteClass {
        const newValue = this.value + semitones;
        return NoteClass.fromValue(newValue);
    }

    static fromValue(value: number): NoteClass {
        return new NoteClass(NOTES[mod12(value)][0]);
    }
}
