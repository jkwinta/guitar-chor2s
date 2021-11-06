import { NamedNoteCollection } from "../../note_collections/collections";
import { PIP_RADIUS } from "./fret";
import { zip } from "../../util";

const COLOURS: string[] = [
    'red',
    'green',
    'blue',
    'cyan',
    'magenta',
    'yellow',
    'orange',

    'purple',
    'teal',

    'aqua',
    'silver',
    'indigo',
    'violet',
    'brown',
    'grey',
];

export class Legend {
    noteCollection: NamedNoteCollection;
    colourMap: { [interval: string]: string };

    constructor(noteCollection: NamedNoteCollection) {
        this.noteCollection = noteCollection;
        this.colourMap = {};
        for (let i = 0; i < noteCollection.intervals.length; i++) {
            this.colourMap[noteCollection.intervals[i]] = COLOURS[i];
        }
    }

    getColour(interval: string): string | undefined {
        return this.colourMap[interval];
    }

    toRender(): string[][] {
        return zip(COLOURS, this.noteCollection.intervals, this.noteCollection.notes);
    }
}

interface ColourDorProps {
    colour: string,
}

const VIEW_SIZE = PIP_RADIUS * 3;

function ColourDot(props: ColourDorProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height={VIEW_SIZE}
            width={VIEW_SIZE}
            viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
            display="block"
        >
            <circle
                cx={VIEW_SIZE / 2}
                cy={VIEW_SIZE / 2}
                r={PIP_RADIUS}
                fill={props.colour}
            />
        </svg>);
}

interface RenderLegendProps {
    items: string[][],
}

export function RenderLegend(props: RenderLegendProps) {
    return (<table><tbody>
        {props.items.map(([colour, interval, note]) => <tr key={interval}>
            <td><ColourDot colour={colour} /></td>
            <td>{interval}</td>
            <td>{String(note)}</td>
        </tr>)}
    </tbody></table>);
}
