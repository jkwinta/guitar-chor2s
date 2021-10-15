import './style.css';

const ROOT_NOTE_SELECTOR_GRID = [
    [null, 'C', 'C#'],
    ['Db', 'D', 'D#'],
    ['Eb', 'E', null],
    [null, 'F', 'F#'],
    ['Gb', 'G', 'G#'],
    ['Ab', 'A', 'A#'],
    ['Bb', 'B', null]
];

export default function NoteSelector(props) {
    return (
        <table>
            {ROOT_NOTE_SELECTOR_GRID.map(
                r => <tr>
                    {r.map(n => <td
                        className={'note' + (props.selected === n ? ' selectedNote' : '')}
                        onClick={() => { if (n !== null) { props.setter(n) } }}
                    >{n || ''}</td>)}
                </tr>
            )}
        </table>
    );
}
