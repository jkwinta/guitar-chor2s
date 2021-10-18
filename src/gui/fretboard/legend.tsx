import { NamedNoteCollection } from "../../note_collections/collections";
import { shuffle } from "../../util";

const COLOURS: string[] = [
    'red',
    'purple',
    'fuchsia',
    'green',
    'yellow',
    'blue',
    'teal',
    'aqua',
    'orange',
    'darkgoldenrod',
    'silver',
    'purple',
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
        const colours = shuffle(COLOURS).slice(0, noteCollection.intervals.length);
        this.colourMap = {};
        for (let i = 0; i < colours.length; i++) {
            this.colourMap[noteCollection.intervals[i]] = colours[i];
        }
    }

    getColour(interval: string): string | undefined {
        return this.colourMap[interval];
    }

    toRender(): [string, string][] {
        return this.noteCollection.intervals.map(i => [this.colourMap[i], i]);
    }
}

interface ColourDorProps {
    colour: string,
}

function ColourDot(props: ColourDorProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" display="block">
            <circle cx="12" cy="12" r="8" fill={props.colour} />
        </svg>);
}

interface RenderLegendProps {
    items: [string, string][],
}

export function RenderLegend(props: RenderLegendProps) {
    return (<table>
        {props.items.map(([colour, interval]) => <tr key="interval">
            <td><ColourDot colour={colour} /></td>
            <td>{interval}</td>
        </tr>)}
    </table>);
}
