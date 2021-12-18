import React from "react";

import NoteSelector from "./note_collection_selector/note_selector";
import CollectionSelector from "./note_collection_selector/collection_selector";
import FretboardDisplay from "./fretboard/fretboard_display";
import { CHORDS } from '../note_collections/chords';
import { Chord, NamedNoteCollection } from '../note_collections/note_collections';
import { getScalesFromChords, getChordsFromChords } from '../note_collections/collection_matcher';
import { CollectionListTable } from './collection_list_table';

function chordString(chord: Chord): string {
    return String(chord).split(' ').slice(0, -1).join(' ');
}

interface ChordCollectorProps {
}

interface ChordCollectorState {
    rootNoteName: string | null,
    collectionName: string | null,
    chords: Chord[],
    matchedCollections: NamedNoteCollection[],
    selectedCollection: NamedNoteCollection | null,
}

export default class ChordCollector extends React.Component<ChordCollectorProps, ChordCollectorState> {
    constructor(props: any) {
        super(props);
        this.state = {
            rootNoteName: null,
            collectionName: null,
            chords: [],
            matchedCollections: [],
            selectedCollection: null,
        };
    }

    addChord(chord: Chord | null) {
        if (chord != null && !this.state.chords.some(c => c.equals(chord))) {
            this.setState({ chords: [...this.state.chords, chord] });
        }
    }

    deleteChord(chord: Chord) {
        const newChords = this.state.chords.filter(c => !c.equals(chord));
        // Unselect if selected
        if (this.state.selectedCollection != null && chord != null
            && this.state.selectedCollection.equals(chord)) {
            this.setState({ chords: newChords, selectedCollection: null });

        } else {
            this.setState({ chords: newChords });
        }
    }

    deleteMatchedCollection(collection: NamedNoteCollection) {
        const newMatchedCollections = this.state.matchedCollections.filter(c => !c.equals(collection));
        // Unselect if selected
        if (this.state.selectedCollection != null && collection != null
            && this.state.selectedCollection.equals(collection)) {
            this.setState({ matchedCollections: newMatchedCollections, selectedCollection: null });
        } else {
            this.setState({ matchedCollections: newMatchedCollections });
        }
    }

    getSelectedChord(): Chord | null {
        if (this.state.rootNoteName && this.state.collectionName) {
            return new Chord(this.state.rootNoteName, this.state.collectionName);
        }
        return null;
    }

    getSelectedChordString(): string {
        const chord = this.getSelectedChord();
        if (chord) {
            return chordString(chord);
        }
        return 'No chord selected';
    }

    updateScales() {
        if (this.state.chords.length > 0) {
            let newScales = getScalesFromChords(this.state.chords);
            this.setState({ matchedCollections: newScales });
        }
    }

    updateChords() {
        if (this.state.chords.length > 0) {
            let newChords = getChordsFromChords(this.state.chords);
            this.setState({ matchedCollections: newChords });
        }
    }

    setSelectedCollection(collection: NamedNoteCollection | null) {
        if (
            this.state.selectedCollection != null && collection != null
            && this.state.selectedCollection.equals(collection)) {
            collection = null;
        }
        this.setState({ selectedCollection: collection });
    }


    /** Put certain chords at top of the list. */
    static chordList(): string[] {
        const head = ['NOTE', '5', 'MAJOR', 'MINOR'];
        const allChords = Object.keys(CHORDS);
        return head.filter(s => allChords.includes(s)).concat(allChords.filter(s => !head.includes(s)));
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
                        options={ChordCollector.chordList()}
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
                            setter={(c) => this.setSelectedCollection(c)}
                            selected={this.state.selectedCollection}
                        />
                    </div>
                    <div>
                        <button
                            onClick={() => this.updateScales()}
                        >Get scales</button>
                        <button
                            onClick={() => this.updateChords()}
                        >Get chords</button>
                        <CollectionListTable
                            items={this.state.matchedCollections.slice(0, 10)}
                            deleter={(s) => this.deleteMatchedCollection(s)}
                            setter={(s) => this.setSelectedCollection(s)}
                            selected={this.state.selectedCollection}
                        />
                    </div>
                </div>
                <div style={{ float: 'left', margin: 0, }}>
                    <FretboardDisplay
                        noteCollection={this.state.selectedCollection}
                    />
                </div>
            </div>
        );
    }
}
