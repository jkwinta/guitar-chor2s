import { Chord, NamedNoteCollection, Scale } from './note_collections';
import { zip, numSum, uniqueValues, numProd, numericalSorter } from '../util';
import { SCALES } from './scales';
import { CHORDS } from './chords';
import { NOTES } from '../notes';

function collectionMap(c: NamedNoteCollection): number[] {
    return c.intervalMap.map(x => x == null ? 0 : 1);
}

function getChordsSum(chords: Chord[]): number[] {
    const chordVectors = chords.map(
        c => collectionMap(c));
    return zip(...chordVectors).map(a => numSum(a));
}

function dotProduct(a: number[], b: number[]): number {
    return numSum(zip(a, b).map(x => numProd(x)));
}

function vectorNorm(x: number[]): number {
    return Math.sqrt(dotProduct(x, x));
}

export function getScalesFromChords(chords: Chord[]): Scale[] {
    const chordSumMap = getChordsSum(chords);
    const scaleValue = (s: Scale) => {
        const scaleMap = collectionMap(s);
        return dotProduct(scaleMap, chordSumMap) / vectorNorm(scaleMap);
    };
    const roots = uniqueValues(chords.map(c => c.rootNoteName));
    const allScales = [];
    for (let root of roots) {
        for (let scaleName of Object.keys(SCALES)) {
            allScales.push(new Scale(root, scaleName));
        }
    }
    return allScales.sort((a, b) => -numericalSorter(scaleValue(a), scaleValue(b)));
}


export function getChordsFromChords(chords: Chord[]): Chord[] {
    const chordSumMap = getChordsSum(chords);
    const chordValue = (c: Chord) => {
        const chordMap = collectionMap(c);
        return dotProduct(chordMap, chordSumMap) / vectorNorm(chordMap);
    };
    const roots = uniqueValues(chords.map(c => c.rootNoteName).concat(NOTES.flat()));
    const allChords = [];
    for (let root of roots) {
        for (let chordName of Object.keys(CHORDS)) {
            allChords.push(new Chord(root, chordName));
        }
    }
    return allChords.sort((a, b) => -numericalSorter(chordValue(a), chordValue(b)));
}
