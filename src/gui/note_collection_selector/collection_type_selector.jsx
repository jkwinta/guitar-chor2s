export default function CollectionTypeSelector(props) {
    return (<table>
        <tr>
            {props.options.map(collection => (
                <td>
                    <label onClick={() => props.setter(collection)}>
                        <input type="radio" value={collection} checked={props.selected === collection} />
                        {collection}
                    </label>
                </td>
            ))}
        </tr>
    </table>);
}