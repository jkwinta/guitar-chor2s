import React from "react";

import collections, { NamedNoteCollection } from "../note_collections/note_collections";

import NoteSelector from "./note_collection_selector/note_selector";
import CollectionTypeSelector from "./note_collection_selector/collection_type_selector";
import CollectionSelector from "./note_collection_selector/collection_selector";
import FretboardDisplay from "./fretboard/fretboard_display";

interface ChooseAndDisplayCollectionProps { }
interface ChooseAndDisplayCollectionState {
    rootNoteName: string | null,
    collectionType: string | null,
    collectionName: string | null,
}

export default class ChooseAndDisplayCollection extends React.Component<
    ChooseAndDisplayCollectionProps, ChooseAndDisplayCollectionState> {
    constructor(props: ChooseAndDisplayCollectionProps) {
        super(props);
        this.state = {
            rootNoteName: null,
            collectionType: null,
            collectionName: null,
        };
    }

    setCollectionType(newCollectionType: string) {
        if (this.state.collectionType !== newCollectionType) {
            this.setState({ collectionType: newCollectionType, collectionName: null });
        }
    }

    getCollectionSelectorOptions(): string[] {
        if (this.state.collectionType != null) {
            return Object.keys(collections[this.state.collectionType] || {});
        }
        return [];
    }

    getSelectedCollection(): NamedNoteCollection | null {
        if (this.state.rootNoteName
            && this.state.collectionType
            && this.state.collectionName) {
            return new NamedNoteCollection(
                this.state.rootNoteName, this.state.collectionType, this.state.collectionName);
        }
        return null;
    }

    render() {
        return (
            <div>
                <table><tbody>
                    <tr>
                        <td>
                            <NoteSelector
                                selected={this.state.rootNoteName}
                                setter={n => this.setState({ rootNoteName: n })}
                            />
                            <CollectionTypeSelector
                                options={Object.keys(collections)}
                                setter={ct => this.setCollectionType(ct)}
                                selected={this.state.collectionType}
                            />
                            <CollectionSelector
                                setter={(col) => this.setState({ collectionName: col })}
                                selected={this.state.collectionName || ''}
                                options={this.getCollectionSelectorOptions()}
                            />
                        </td>
                        <td>
                            <FretboardDisplay
                                noteCollection={this.getSelectedCollection()}
                            />
                        </td>
                    </tr>
                </tbody></table>
            </div>
        );
    }
}
