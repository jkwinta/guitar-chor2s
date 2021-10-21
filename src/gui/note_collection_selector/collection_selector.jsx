import { titleCase } from '../../util';

export default function CollectionSelector(props) {
    const eventSetter = (e) => { props.setter(e.target.value) };
    return (
        <select size="10" value={props.selected} onChange={eventSetter} onClick={eventSetter}>
            {props.options.map(
                o => <option key={o} value={o}>{titleCase(o)}</option>)}
        </select>
    );
}
