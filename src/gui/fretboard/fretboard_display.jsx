import Fret from "./fret";
import { Tuning, DEFAULT_TUNING } from '../../tunings';
import { NamedNoteCollection } from "../../note_collections/collections";
import { StandardFretboardDecoration } from "../fretboard_decoration";
import { Legend, RenderLegend } from "./legend";

// const orientation = 'V';
// const NUMBER_OF_FRETS = 22;
const NUMBER_OF_FRETS = 18;
const NUMBER_OF_STRINGS = 6;
const TUNING = new Tuning(DEFAULT_TUNING);
const DECORATION = new StandardFretboardDecoration(NUMBER_OF_STRINGS);

function FretRowDisplay(props) {
    const fretNumber = props.fretNumber;
    const fretter = props.fretter;

    return (<tr>
        {Array(NUMBER_OF_STRINGS).fill().map((_, stringIndex) => {
            return <td key={stringIndex}>
                <Fret
                    decoration={DECORATION.getDecoration(fretNumber, stringIndex)}
                    value={fretter(TUNING.getValue(stringIndex, fretNumber))}
                />
            </td>
        })}
    </tr>);
}

export default function FretboardDisplay(props) {
    let noteCollection = null;
    let fretter = (v) => null;
    let legend = null;
    let legendItems = [];
    if (props.rootNoteName && props.collectionType && props.collectionName) {
        noteCollection = new NamedNoteCollection(
            props.rootNoteName, props.collectionType, props.collectionName);
        legend = new Legend(noteCollection);
        legendItems = legend.toRender();
        fretter = (v) => legend.getColour(noteCollection.getIntervalByValue(v));
    }
    return (
        <div>
            <table><tbody>
                <tr>
                    <td>
                        <div>{String(noteCollection)}</div>
                        <table cellSpacing="0" cellPadding="0"><tbody>
                            {Array(NUMBER_OF_FRETS + 1).fill().map((_, fretNumber) => {
                                return <FretRowDisplay key={fretNumber}
                                    fretNumber={fretNumber}
                                    fretter={fretter}
                                />;
                            })}
                        </tbody></table>
                    </td>
                    <td><RenderLegend items={legendItems} /></td>
                </tr>
            </tbody></table>
        </div>);
}


//getNamedNoteCollection() {
//     if (this.state.rootNoteName && this.state.collectionType && this.state.collectionName) {
//         return new NamedNoteCollection(
//             this.state.rootNoteName, this.state.collectionType, this.state.collectionName);
//     }
//     return null;
// }