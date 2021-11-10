import React from "react";

// import collections from "../note_collections/collections";

import NoteSelector from "./note_collection_selector/note_selector";
import CollectionSelector from "./note_collection_selector/collection_selector";
// import FretboardDisplay from "./fretboard/fretboard_display";
// import { NamedNoteCollection } from "../note_collections/collections";
import { CHORDS } from '../note_collections/chords';
import { Chord } from '../note_collections/note_collections';
import { getScalesFromChords } from '../note_collections/collection_matcher';
import { CollectionListTable } from './collection_list_table';

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
            scales: [],
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

    deleteScale(scale) {
        this.setState({ scales: this.state.scales.filter(s => !s.equals(scale)) });
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

    updateScales() {
        let newScales = this.state.chords.length > 0 ? getScalesFromChords(this.state.chords) : [];
        this.setState({ scales: newScales });
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
                        <CollectionListTable
                            items={this.state.chords}
                            deleter={(c) => this.deleteChord(c)}
                        />
                    </div>
                    <div>
                        <button
                            onClick={() => this.updateScales()}
                        >Get scales</button>
                        <CollectionListTable
                            items={this.state.scales.slice(0, 10)}
                            deleter={(s) => this.deleteScale(s)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
