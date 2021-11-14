import { NamedNoteCollection } from "../note_collections/note_collections";
import { titleCase } from '../util';
import { CollectionCollection } from '../note_collections/collection_collection';
import { shortenIntervalName } from '../intervals';
import { Legend } from './fretboard/legend';


interface BodyRowProps {
    item: NamedNoteCollection,
    content: string[],
    deleter: (i: NamedNoteCollection) => unknown,
    setter: (i: NamedNoteCollection) => unknown,
    selected?: boolean,
}

function BodyRow(props: BodyRowProps) {
    if (props.selected) {
        return <SelectedBodyRow
            item={props.item}
            content={props.content}
            deleter={props.deleter}
            setter={props.setter}
        />
    }
    return (
        <tr onClick={() => props.setter(props.item)}>
            <th>{props.content[0]}</th>
            {props.content.slice(1).map((v, i) => <td key={i}>{titleCase(shortenIntervalName(v))}</td>)}
            <td>
                <button onClick={(e) => { props.deleter(props.item); e.stopPropagation(); }}>X</button>
            </td>
        </tr>
    );
}

function SelectedBodyRow(props: BodyRowProps) {
    const legend = new Legend(props.item);
    return (
        <tr onClick={() => props.setter(props.item)}>
            <th>{props.content[0]}</th>
            {props.content.slice(1).map(
                (v, i) => <td
                    key={i}
                    style={{ backgroundColor: legend.getColour(v) }}
                >{titleCase(shortenIntervalName(v))}
                </td>
            )}
            <td>
                <button onClick={(e) => { props.deleter(props.item); e.stopPropagation(); }}>X</button>
            </td>
        </tr>
    );
}

interface CollectionListTableProps {
    items: NamedNoteCollection[],
    deleter: (i: NamedNoteCollection) => unknown,
    setter: (i: NamedNoteCollection) => unknown,
    selected: NamedNoteCollection | null,
}

export function CollectionListTable(props: CollectionListTableProps) {
    const items = props.items;
    if (items.length === 0) {
        return <table></table>;
    }
    const cc = new CollectionCollection(props.items);
    const tableData = cc.buildTable();
    return (<table style={{ border: '3px solid purple' }}>
        <thead>
            <tr>
                {tableData[0].map(
                    (v, i) => <th key={i}>{v}</th>
                )}
            </tr>
        </thead>
        <tbody>
            {tableData.slice(1).map(
                (r, ri) => <BodyRow
                    key={ri}
                    item={props.items[ri]}
                    content={r}
                    deleter={props.deleter}
                    setter={props.setter}
                    selected={props.selected != null && props.selected.equals(props.items[ri])} />
            )}
        </tbody>
    </table>);
}
