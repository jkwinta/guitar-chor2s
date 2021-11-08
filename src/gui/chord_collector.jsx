import React from "react";

// import collections from "../note_collections/collections";

import NoteSelector from "./note_collection_selector/note_selector";
import CollectionSelector from "./note_collection_selector/collection_selector";
// import FretboardDisplay from "./fretboard/fretboard_display";
// import { NamedNoteCollection } from "../note_collections/collections";
import { CHORDS } from '../note_collections/chords';
import { Chord } from '../note_collections/collections';
import { zip, uniqueValues, titleCase, numSum, numericalSorter } from "../util";
import { getScalesFromChords } from '../note_collections/collection_matcher';

function chordString(chord) {
    return String(chord).split(' ').slice(0, -1).join(' ');
}

export default class ChordCollector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootNoteName: null,
            collectionName: null,
            chords: [],
            scales: null,
        };
    }

    addChord(chord) {
        if (!this.state.chords.some(c => c.equals(chord))) {
            this.setState({ chords: [...this.state.chords, chord] });
        }
    }

    deleteChord(chord) {
        this.setState({ chords: this.state.chords.filter(c => !c.equals(chord)) });
    }

    getSelectedChord() {
        if (this.state.rootNoteName && this.state.collectionName) {
            return new Chord(this.state.rootNoteName, this.state.collectionName);
        }
        return null;
    }


    getSelectedChordString() {
        const chord = this.getSelectedChord();
        if (chord) {
            return chordString(chord);
        }
        return 'No chord selected';
    }

    getChordsTableFullHeader() {
        const noteNameStrings = this.state.chords.map(
            c => c.noteMap.map(n => n != null ? String(n) : null));
        return zip(...noteNameStrings).map(
            notes => uniqueValues(notes)
        ).map(
            notes => notes.length > 0 ? notes.join('/') : null
        );
    }

    getChordsTableFullBody() {
        return this.state.chords.map(c => c.intervalMap);
    }

    buildChordsTable() {
        const fullHeader = this.getChordsTableFullHeader();
        const fullBody = this.getChordsTableFullBody();
        const indices = Array(12).fill().map((_v, i) => i).filter(i => fullHeader[i]);
        const header = fullHeader.filter((_v, i) => indices.includes(i));
        const body = fullBody.map(
            r => r.filter((_v, i) => indices.includes(i))
        ).map((r, i) => [this.state.chords[i], r]);

        return [header, ...body];
    }

    renderChordsTable() {
        if (this.state.chords.length === 0) {
            return (<table></table>);
        }
        const tableData = this.buildChordsTable();
        return (<table>
            <thead>
                <tr>
                    <th></th>
                    {tableData[0].map(
                        n => <th key={n}>{n}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {tableData.slice(1).map((r, ri) =>
                    <tr key={ri}>
                        <th>{chordString(r[0])}</th>
                        {r[1].map((i, j) => <td key={j}>{titleCase(i || '---')}</td>)}
                        <td>
                            <button onClick={() => this.deleteChord(r[0])}>X</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>);
    }

    render() {
        return (
            <div>
                <div style={{ float: 'left', margin: 0, }}>
                    <NoteSelector
                        selected={this.state.rootNoteName}
                        setter={n => this.setState({ rootNoteName: n })}
                    />
                    <CollectionSelector
                        setter={(col) => this.setState({ collectionName: col })}
                        selected={this.state.collectionName || ''}
                        options={Object.keys(CHORDS)}
                    />
                    <div>{this.getSelectedChordString()}
                        <p><button
                            onClick={() => this.addChord(this.getSelectedChord())}
                            disabled={!this.getSelectedChord()}
                        >Add chord</button></p>
                    </div>
                </div>
                <div style={{ float: 'left', margin: 0, }}>
                    <div>
                        {this.renderChordsTable()}
                    </div>
                    <div>
                        <button
                            onClick={() => (this.state.chords === 0) || console.log(getScalesFromChords(this.state.chords).slice(0, 10))}
                        >Get scales</button>
                    </div>
                </div>
            </div>
        );
    }
}
