export default function CollectionTypeSelector(props) {
    return (<table><tbody>
        <tr>
            {props.options.map(collection => (
                <td key={collection}>
                    <label onClick={() => props.setter(collection)}>
                        <input type="radio" value={collection} checked={props.selected === collection} readOnly />
                        {collection}
                    </label>
                </td>
            ))}
        </tr>
    </tbody></table>);
}