import React from "react";
// import NoteCollectionSelector from './note_collection_selector/note_collection_selector';
// import FretboardDisplay from './fretboard/fretboard_display';

import collections from "../note_collections/collections";

import NoteSelector from "./note_collection_selector/note_selector";
import CollectionTypeSelector from "./note_collection_selector/collection_type_selector";
import CollectionSelector from "./note_collection_selector/collection_selector";
import FretboardDisplay from "./fretboard/fretboard_display";

export default class ChooseAndDisplayCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootNoteName: null,
            collectionType: null,
            collectionName: null,
        };
    }

    setCollectionType(newCollectionType) {
        if (this.state.collectionType !== newCollectionType) {
            this.setState({ collectionType: newCollectionType, collectionName: null });
        }
    }

    render() {
        return (
            <div>
                <table>
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
                                selected={this.state.collectionName}
                                options={Object.keys(collections[this.state.collectionType] || {})}
                            />
                        </td>
                        <td>
                            <FretboardDisplay
                                rootNoteName={this.state.rootNoteName}
                                collectionType={this.state.collectionType}
                                collectionName={this.state.collectionName}
                            />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}
