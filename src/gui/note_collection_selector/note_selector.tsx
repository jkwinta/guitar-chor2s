import './style.css';

const ROOT_NOTE_SELECTOR_GRID: (string | null)[][] = [
    [null, 'C', 'C#'],
    ['Db', 'D', 'D#'],
    ['Eb', 'E', null],
    [null, 'F', 'F#'],
    ['Gb', 'G', 'G#'],
    ['Ab', 'A', 'A#'],
    ['Bb', 'B', null]
];

interface NoteSelectorProps {
    selected: string | null,
    setter: (note: string) => unknown,
}

export default function NoteSelector(props: NoteSelectorProps) {
    return (
        <table>
            <tbody>
                {ROOT_NOTE_SELECTOR_GRID.map(
                    (row, ri) => <tr key={ri}>
                        {row.map(
                            (n, ni) => <td key={ni}
                                className={'note' + (props.selected === n ? ' selectedNote' : '')}
                                onClick={() => { if (n !== null) { props.setter(n) } }}
                            >{n || ''}</td>)}
                    </tr>
                )}
            </tbody>
        </table>
    );
}
