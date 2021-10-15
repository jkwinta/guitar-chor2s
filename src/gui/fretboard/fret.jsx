const svgNamespace = 'http://www.w3.org/2000/svg';


// height="40" id="svg8" version="1.1" viewBox="0 0 32 40" width="32"


function OpenFret(props) { }

function RegularFret(props) { }


export default function Fret(props) {
    const decoration = props.decoration;
    const value = props.value;
    return (<svg xmlns={svgNamespace} height="40" width="32" viewBox="0 0 32 40">
        <rect height="4" width="32" x="0" y="36" />
        <rect height="40" width="4" x="14" y="0" />
        <circle cx="16" cy="18" r="8"
            fill={value ? 'blue' : null}
            visibility={value ? 'visible' : 'hidden'}
        />
    </svg>);
}
