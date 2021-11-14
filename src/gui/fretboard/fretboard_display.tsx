import Fret from "./fret";
import { Tuning, DEFAULT_TUNING } from '../../tunings';
import { StandardFretboardDecoration } from "../fretboard_decoration";
import { Legend } from "./legend";
import { NamedNoteCollection } from "../../note_collections/note_collections";

// const orientation = 'V';
// const NUMBER_OF_FRETS = 22;
const NUMBER_OF_FRETS = 18;
const NUMBER_OF_STRINGS = 6;
const TUNING = new Tuning(DEFAULT_TUNING);
const DECORATION = new StandardFretboardDecoration(NUMBER_OF_STRINGS);

interface FretRowDisplayProps {
    fretNumber: number,
    fretter: (n: number) => string | undefined,
}

function FretRowDisplay(props: FretRowDisplayProps) {
    const fretNumber = props.fretNumber;
    const fretter = props.fretter;

    return (
        <tr>
            {Array(NUMBER_OF_STRINGS).fill(null).map((_, stringIndex) => {
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

interface FretboardDisplayProps {
    noteCollection: NamedNoteCollection | null,
}

export default function FretboardDisplay(props: FretboardDisplayProps) {
    let noteCollection: NamedNoteCollection | null = null;
    let fretter: (v: number) => string | undefined = (v) => undefined;
    let legend: Legend | null = null;
    if (props.noteCollection != null) {
        noteCollection = props.noteCollection;
        legend = new Legend(noteCollection) as Legend;
        fretter = (v) => (legend as Legend).getColour(
            (noteCollection as NamedNoteCollection).getIntervalByValue(v));
    }
    return (
        <div>
            <div>{noteCollection != null ? String(noteCollection) : 'No item selected'}</div>
            <table cellSpacing="0" cellPadding="0">
                <tbody>
                    {Array(NUMBER_OF_FRETS + 1).fill(null).map((_, fretNumber) => {
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
