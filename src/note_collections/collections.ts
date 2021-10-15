import { SCALES } from './scales';
import { CHORDS } from './chords';
import { titleCase } from '../util';
import { NoteClass, mod12 } from '../notes';


const collections = { Scales: SCALES, Chords: CHORDS };
export default collections;

export class NamedNoteCollection {
    rootNoteName: string;
    collectionType: string;
    collectionName: string;
    intervals: string[];
    notes: NoteClass[];
    noteCache: (NoteClass | null)[];

    constructor(rootNoteName: string, collectionType: string, collectionName: string) {
        this.rootNoteName = rootNoteName;
        this.collectionType = collectionType;
        this.collectionName = collectionName;

        if (collectionType === 'Scales') {
            this.intervals = SCALES[collectionName] || [];
        } else if (collectionType === 'Chords') {
            this.intervals = CHORDS[collectionName] || [];
        } else {
            this.intervals = [];
        }
        const root = new NoteClass(rootNoteName);
        this.notes = this.intervals.map(i => root.addInterval(i));
        this.noteCache = Array(12);
    }

    getByValue(value: number): NoteClass | null {
        value = mod12(value);
        if (this.noteCache[value] === undefined) {
            this.noteCache[value] = this.notes.find(n => n.value == value) || null;
        }
        return this.noteCache[value];
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
}
