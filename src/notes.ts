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

// // The octave that the note belongs to
// function octaveNumber(noteIndex: number): number {
//     return Math.floor(noteIndex / 12) + 3;
// }

// function octaveOffset(octaveNumber: number): number {
//     return 12 * (octaveNumber - 3)
// }

// // The name(s) of the note at the given index
// function noteNames(noteIndex: number): string[] {
//     return NOTES[mod12(noteIndex)];
// }

// function noteNameFromIndex(noteIndex: number): string {
//     return `${noteNames(noteIndex)[0]}${octaveNumber(noteIndex)}`;
// }

const INTERVALS: { [intervalName: string]: number } = {
    'ROOT': 0,
    'MINOR 2ND': 1,
    'MAJOR 2ND': 2,
    'AUGMENTED 2ND': 3,
    'MINOR 3RD': 3,
    'MAJOR 3RD': 4,
    'PERFECT 4TH': 5,
    'AUGMENTED 4TH': 6,
    'DIMINISHED 5TH': 6,
    'PERFECT 5TH': 7,
    'AUGMENTED 5TH': 8,
    'MINOR 6TH': 8,
    'MAJOR 6TH': 9,
    'DIMINISHED 7TH': 9,
    'MINOR 7TH': 10,
    'MAJOR 7TH': 11,
    'MAJOR 9TH': 14,
    'PERFECT 11TH': 17,
    'SHARP 11TH': 18,
    'MAJOR 13th': 21,
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
        const intervalSemitones = INTERVALS[intervalName];
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
