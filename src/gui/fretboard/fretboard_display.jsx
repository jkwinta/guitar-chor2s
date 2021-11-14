import Fret from "./fret";
import { Tuning, DEFAULT_TUNING } from '../../tunings';
import { StandardFretboardDecoration } from "../fretboard_decoration";
import { Legend } from "./legend";

// const orientation = 'V';
// const NUMBER_OF_FRETS = 22;
const NUMBER_OF_FRETS = 18;
const NUMBER_OF_STRINGS = 6;
const TUNING = new Tuning(DEFAULT_TUNING);
const DECORATION = new StandardFretboardDecoration(NUMBER_OF_STRINGS);

function FretRowDisplay(props) {
    const fretNumber = props.fretNumber;
    const fretter = props.fretter;

    return (
        <tr>
            {Array(NUMBER_OF_STRINGS).fill().map((_, stringIndex) => {
                return <td key={stringIndex}>
                    <Fret
                        decoration={DECORATION.getDecoration(fretNumber, stringIndex)}
                        value={fretter(TUNING.getValue(stringIndex, fretNumber))}
                    />
                </td>
            })}
        </tr>
    );
}

export default function FretboardDisplay(props) {
    let noteCollection = null;
    let fretter = (v) => null;
    let legend = null;
    if (props.noteCollection != null) {
        noteCollection = props.noteCollection;
        legend = new Legend(noteCollection);
        fretter = (v) => legend.getColour(noteCollection.getIntervalByValue(v));
    }
    return (
        <div>
            <div>{noteCollection != null ? String(noteCollection) : 'No item selected'}</div>
            <table cellSpacing="0" cellPadding="0">
                <tbody>
                    {Array(NUMBER_OF_FRETS + 1).fill().map((_, fretNumber) => {
                        return <FretRowDisplay key={fretNumber}
                            fretNumber={fretNumber}
                            fretter={fretter}
                        />;
                    })}
                </tbody>
            </table>
        </div>
    );
}
