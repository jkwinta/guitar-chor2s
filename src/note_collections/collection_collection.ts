import { NamedNoteCollection } from "./note_collections";
import { zip, uniqueValues } from '../util';
import { NOTES } from '../notes';

const DEFAULT_TABLE_FILLER = '-'

export class CollectionCollection {
    items: NamedNoteCollection[];
    constructor(items: NamedNoteCollection[]) {
        this.items = [...items];
    }

    getNotesStrings(): (string | null)[] {
        const noteStrings = this.items.map(
            collection => collection.noteMap.map(note => note != null ? String(note) : null));
        return zip(...noteStrings).map(
            notes => uniqueValues(notes)
        ).map(
            notes => notes.length > 0 ? notes.join('/') : null
        );
    }

    getIntervals(): (string | null)[][] {
        return this.items.map(nnc => nnc.intervals);
    }

    dropType(s: string) {
        return s.split(' ').slice(0, -1).join(' ');
    }

    buildTable(
        filterColumns: boolean = true, cellFiller: string = DEFAULT_TABLE_FILLER, dropTypes: boolean = true
    ): string[][] {
        let table = this.buildFullTable();
        if (filterColumns) {
            const nullHeaderIndices: number[] = table[0].map(
                (v, i) => v == null ? i : null).filter(v => v != null) as number[];
            table = table.map(row => row.filter((_v, i) => !nullHeaderIndices.includes(i)));
        } else {
            // Fill in header
            table[0] = table[0].map((v, i) => v != null ? v : NOTES[i - 1].join('/'));
        }
        if (dropTypes) {
            for (let i = 1; i < table.length; i++) { // start at 1 to skip header
                table[i][0] = this.dropType(table[i][0] as string);
            }
        }
        // Then put filler for remaining nulls
        const result = table.map(row => row.map(c => c == null ? cellFiller : c));
        return result;
    }

    buildFullTable(): (string | null)[][] {
        const result = [];
        result.push(['', ...this.getNotesStrings()]);
        this.items.forEach(nnc => result.push([String(nnc), ...nnc.intervalMap]));
        return result;
    }

}