import Fret from "./fret";
import { Tuning, DEFAULT_TUNING } from '../../tunings';
import { NamedNoteCollection, NoteCollection } from "../../note_collections/collections";
import { StandardFretboardDecoration } from "../fretboard_decoration";

// const orientation = 'V';
const NUMBER_OF_FRETS = 22;
const NUMBER_OF_STRINGS = 6;
const TUNING = new Tuning(DEFAULT_TUNING);
const DECORATION = new StandardFretboardDecoration(NUMBER_OF_STRINGS);

function FretRowDisplay(props) {
    const fretNumber = props.fretNumber;
    const fretter = props.fretter;

    return (<tr>
        {Array(NUMBER_OF_STRINGS).fill().map((_, stringIndex) => {
            return <td><Fret
                decoration={DECORATION.getDecoration(fretNumber, stringIndex)}
                value={fretter(TUNING.getValue(stringIndex, fretNumber))}
            />
                {/* <div>{String(noteCollection.containsValue(TUNING.getValue(stringIndex, fretNumber)))}</div> */}
                {/* <div>{String(noteCollection)}</div> */}
            </td>
        })}
    </tr>);
}

export default function FretboardDisplay(props) {
    let noteCollection = null;
    let fretter = (v) => false;
    if (props.rootNoteName && props.collectionType && props.collectionName) {
        noteCollection = new NamedNoteCollection(
            props.rootNoteName, props.collectionType, props.collectionName);
        fretter = (v) => noteCollection.containsValue(v);
    } 
    return (
        <div>
            <div>{String(noteCollection)}</div>
            <table>
                {Array(NUMBER_OF_FRETS + 1).fill().map((_, fretNumber) => {
                    return <FretRowDisplay
                        fretNumber={fretNumber}
                        fretter={fretter}
                    />;
                })}
            </table>
        </div>);
}


//getNamedNoteCollection() {
//     if (this.state.rootNoteName && this.state.collectionType && this.state.collectionName) {
//         return new NamedNoteCollection(
//             this.state.rootNoteName, this.state.collectionType, this.state.collectionName);
//     }
//     return null;
// }