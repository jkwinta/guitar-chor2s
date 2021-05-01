// About:
// Notes are integers relative to C3, The note on the third fret of the A string
// on a standard-tuned guitar, noting that guitar music is often written an
// octave higher.

function mod(x, n) {
    while (x < 0) {
        x += n;
    }
    return x % n;
}

// The index is the given value for the note of 0-11
const NOTES = [
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
const NATURAL_VALUES = {}
for (let i = 0; i < NOTES.length; i++) {
    for (let note of NOTES[i]) {
        if (!note.includes('#') && !note.includes('b')) {
            NATURAL_VALUES[note] = i;
        }
    }
}

// The octave that the note belongs to
function octaveNumber(noteIndex) {
    return Math.floor(noteIndex / 12) + 3;
}

function octaveOffset(octaveNumber) {
    return 12 * (octaveNumber - 3)
}

// The name(s) of the note at the given index
function noteNames(noteIndex) {
    return NOTES[mod(noteIndex, 12)];
}

function noteNameFromIndex(noteIndex) {
    return `${noteNames(noteIndex)[0]}${octaveNumber(noteIndex)}`;
}



const INTERVALS = {
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

class Note {
    constructor(naturalName, accidentals, octave) {
        this.naturalName = naturalName;
        this.accidentals = accidentals != null ? accidentals : '';
        this.octave = octave;
        let value = NATURAL_VALUES[naturalName];
        if (accidentals) {
            for (let acc of accidentals) {
                if (acc === '#') {
                    value += 1;
                } else if (acc === 'b') {
                    value -= 1;
                }
            }
        }
        if (octave != null) {
            value += octaveOffset(octave)
        }
        this.value = value;
    }

    toString() {
        return `${this.naturalName}${this.accidentals}${this.octave != null ? this.octave : ''}`
    }
}

class IntervalNote extends Note {
    constructor(rootNote, intervalName) {
        // this.rootNote = rootNote;
        // this.intervalName = intervalName;
        // this.note = '';
        // super(naturalName, accidentals, octave);
        let resultNatural;
        if (intervalName === 'ROOT') {
            resultNatural = rootNote.naturalName;
        } else {
            const intervalDegree = Number(intervalName.split('').filter((x) => /\d/.exec(x)).join(''));
            const rootNaturalIndex = 'CDEFGAB'.indexOf(rootNote.naturalName)
            const resultNaturalIndex = rootNaturalIndex + intervalDegree - 1;
            resultNatural = 'CDEFGAB'[mod(resultNaturalIndex, 7)];
        }
        const intervalValue = INTERVALS[intervalName];
        const relativeValue = mod(rootNote.value + intervalValue, 12);
        const naturalValue = NATURAL_VALUES[resultNatural];
        let accidentals;
        if (relativeValue === naturalValue) {
            accidentals = '';
        } else {
            let i = 1;
            while (true) {
                if (relativeValue === mod(naturalValue + i, 12)) {
                    accidentals = '#'.repeat(i);
                    break;
                } else if (relativeValue === mod(naturalValue - i, 12)) {
                    accidentals = 'b'.repeat(i);
                    break;
                }
                i += 1;
            }
        }
        let octave;
        if (rootNote.octave != null) {
            octave = octaveNumber(rootNote.value + intervalValue);
        } else {
            octave = null;
        }
        super(resultNatural, accidentals, octave);
        this.rootNote = rootNote;
        this.intervalName = intervalName;
    }
}


// Testing:
// let n = new Note('C');
// for (let k in INTERVALS) {
//     console.log(String(n), k, String(new IntervalNote(n, k)));
// }

// def degree_note_name(root_name, degree_name):
//     if degree_name == 'ROOT':
//         return root_name
//     root_natural = root_name[0]
//     if root_natural not in 'CDEFGAB':
//         raise ValueError('Root name needs to start with a character A-G.')
//     degree_of_letter = int(''.join(ch for ch in degree_name if ch.isdigit()))
//     result_letter = 'CDEFGAB'[('CDEFGAB'.index(root_natural)
//                                + degree_of_letter - 1) % 7]
//     result_natural_value = note_name_to_index(result_letter)
//     desired_result_value = (note_name_to_index(root_name)
//                             + names_to_semitones[degree_name]) % 12
//     if result_natural_value == desired_result_value:
//         return result_letter
//     if ((desired_result_value - result_natural_value) % 12) < (
//             (result_natural_value - desired_result_value) % 12):
//         n_sharps = (desired_result_value - result_natural_value) % 12
//         return result_letter + '#' * n_sharps
//     else:
//         n_flats = (result_natural_value - desired_result_value) % 12
//         return result_letter + 'b' * n_flats


// class IntervalNote:
//     def __init__(self, root_name, degree_name):
//         self.root = root_name
//         self.degree = degree_name
//         self.value = (note_name_to_index(root_name)
//                       + names_to_semitones[degree_name]) % 12
//         self.name = degree_note_name(root_name, degree_name)

//     def __str__(self):
//         return self.name

//     def __repr__(self):
//         return '{} IntervalNote({}, {})'.format(
//             self.name, self.root, self.degree)


// if __name__ == '__main__':
//     for i in range(-10, 100):
//         if i != note_name_to_index(note_index_to_name(i)):
//             print(i, note_index_to_name(i))
//     pass
