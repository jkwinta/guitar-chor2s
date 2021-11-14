import { SCALES } from './scales';
import { CHORDS } from './chords';
import { titleCase } from '../util';
import { NoteClass, mod12 } from '../notes';


export const SCALES_KEY = 'Scales';
export const CHORDS_KEY = 'Chords';

const collections: { [collectionType: string]: { [collectionName: string]: string[] } } = { [SCALES_KEY]: SCALES, [CHORDS_KEY]: CHORDS };
export default collections;

export class NamedNoteCollection {
    rootNoteName: string;
    collectionType: string;
    collectionName: string;
    intervals: string[];
    notes: NoteClass[];
    intervalMap: (string | null)[];
    noteMap: (NoteClass | null)[];

    constructor(rootNoteName: string, collectionType: string, collectionName: string) {
        this.rootNoteName = rootNoteName;
        this.collectionType = collectionType;
        this.collectionName = collectionName;

        if (collectionType === SCALES_KEY) {
            this.intervals = SCALES[collectionName] || [];
        } else if (collectionType === CHORDS_KEY) {
            this.intervals = CHORDS[collectionName] || [];
        } else {
            this.intervals = [];
        }
        const root = new NoteClass(rootNoteName);
        this.notes = this.intervals.map(i => root.addInterval(i));
        this.intervalMap = Array(12).fill(null);
        this.noteMap = Array(12).fill(null);
        for (let i = 0; i < this.intervals.length; i++) {
            let noteValue = mod12(this.notes[i].value);
            this.intervalMap[noteValue] = this.intervals[i];
            this.noteMap[noteValue] = this.notes[i];
        }

    }

    getByValue(value: number): NoteClass | null {
        return this.noteMap[mod12(value)];
    }

    getIntervalByValue(value: number): string | null {
        return this.intervalMap[mod12(value)];
    }

    containsValue(value: number): boolean {
        return this.getByValue(value) != null;
    }

    containsNote(note: NoteClass): boolean {
        return this.notes.find(n => n.equalClass(note)) != null;
    }

    toString(): string {
        return [
            this.rootNoteName,
            titleCase(this.collectionName),
            titleCase(this.collectionType.slice(0, -1)),
        ].join(' ');
    }

    equals(other: NamedNoteCollection): boolean {
        return (this.rootNoteName === other.rootNoteName
            && this.collectionType === other.collectionType
            && this.collectionName === other.collectionName);
    }
}

export class Chord extends NamedNoteCollection {
    constructor(rootNoteName: string, collectionName: string) {
        super(rootNoteName, CHORDS_KEY, collectionName);
    }
}

export class Scale extends NamedNoteCollection {
    constructor(rootNoteName: string, collectionName: string) {
        super(rootNoteName, SCALES_KEY, collectionName);
    }
}
