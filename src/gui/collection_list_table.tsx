import { NamedNoteCollection } from "../note_collections/collections";
import { zip, uniqueValues, range1 } from '../util';

interface CollectionListTableProps {
    items: NamedNoteCollection[],
    deleter: (i: NamedNoteCollection) => unknown,
}


export function CollectionListTable(props: CollectionListTableProps) {
    const items = props.items;
    if (items.length === 0) {
        return <table></table>;
    }
    
}



function getFullHeader(items: NamedNoteCollection[]): (string | null)[] {
    const noteStrings = items.map(
        collection => collection.noteMap.map(note => note != null ? String(note) : null));
    return zip(...noteStrings).map(
        notes => uniqueValues(notes)
    ).map(
        notes => notes.length > 0 ? notes.join('/') : null
    );
}

function getFullBody(items: NamedNoteCollection[]) {
    return items.map(c => c.intervalMap);
}

function buildChordsTable(items: NamedNoteCollection[]) {
    const fullHeader = getFullHeader(items);
    const fullBody = getFullBody(items);
    const indices = range1(12).filter(i => fullHeader[i]);
    const header = fullHeader.filter((_v, i) => indices.includes(i));
    const body = fullBody.map(
        r => r.filter((_v, i) => indices.includes(i))
    ).map((r, i) => [items[i], r]);

    return [header, ...body];
}

// function renderChordsTable(items:NamedNoteCollection[]) {
//     if (items.length === 0) {
//         return (<table></table>);
//     }
//     const tableData = buildChordsTable(items);
//     return (<table>
//         <thead>
//             <tr>
//                 <th></th>
//                 {tableData[0].map(
//                     n => <th key={n}>{n}</th>
//                 )}
//             </tr>
//         </thead>
//         <tbody>
//             {tableData.slice(1).map((r, ri) =>
//                 <tr key={ri}>
//                     <th>{chordString(r[0])}</th>
//                     {r[1].map((i, j) => <td key={j}>{titleCase(i || '---')}</td>)}
//                     <td>
//                         <button onClick={() => this.deleteChord(r[0])}>X</button>
//                     </td>
//                 </tr>
//             )}
//         </tbody>
//     </table>);
// }
