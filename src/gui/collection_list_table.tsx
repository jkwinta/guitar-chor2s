import { NamedNoteCollection } from "../note_collections/note_collections";
// import { zip, uniqueValues, range1 } from '../util';
import { CollectionCollection } from '../note_collections/collection_collection';
import { shortenIntervalName } from '../intervals';


interface CollectionListTableProps {
    items: NamedNoteCollection[],
    deleter: (i: NamedNoteCollection) => unknown,
}

export function CollectionListTable(props: CollectionListTableProps) {
    const items = props.items;
    if (items.length === 0) {
        return <table></table>;
    }
    const c = new CollectionCollection(props.items);
    const tableData = c.buildTable();
    return (<table style={{border: '3px solid purple'}}>
        <thead>
            <tr>
                {tableData[0].map(
                    (v, i) => <th key={i}>{v}</th>
                )}
            </tr>
        </thead>
        <tbody>
            {tableData.slice(1).map((r, ri) =>
                <tr key={ri}>
                    <th>{r[0]}</th>
                    {r.slice(1).map((v, i) => <td key={i}>{shortenIntervalName(v)}</td>)}
                    <td>
                        <button onClick={() => props.deleter(props.items[ri])}>X</button>
                    </td>
                </tr>
            )}
        </tbody>
    </table>);
}
