import { titleCase } from '../../util';

interface CollectionSelectorProps {
    setter: (collection: string) => unknown,
    selected: string,
    options: string[],
}

export default function CollectionSelector(props: CollectionSelectorProps) {
    return (
        <select
            size={10}
            value={props.selected}
            onChange={(e) => { props.setter(e.target.value) }}
        >{props.options.map(
            o => <option key={o} value={o} onClick={(e) => { props.setter(o) }}>
                {titleCase(o)}
            </option>)}
        </select>
    );
}
