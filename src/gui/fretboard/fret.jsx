const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function OpenFret(props) {
    const value = props.value;
    return (<svg xmlns={SVG_NAMESPACE} height="40" width="32" viewBox="0 0 32 40" display="block">
        <rect height="8" width="32" x="0" y="32" />
        <circle cx="16" cy="16" r="9" fill="none" strokeWidth="5"
            stroke={value}
            visibility={value ? 'visible' : 'hidden'}
        />
    </svg>);
}

function LeftFret(props) {
    const value = props.value;
    return (<svg xmlns={SVG_NAMESPACE} height="40" width="32" viewBox="0 0 32 40" display="block">
        <rect height="4" width="32" x="0" y="36" />
        <rect height="40" width="4" x="14" y="0" />
        <circle cx="0" cy="18" r="10" />
        <circle cx="16" cy="18" r="8"
            fill={value}
            visibility={value ? 'visible' : 'hidden'}
        />
    </svg>);
}

function RightFret(props) {
    const value = props.value;
    return (<svg xmlns={SVG_NAMESPACE} height="40" width="32" viewBox="0 0 32 40" display="block">
        <rect height="4" width="32" x="0" y="36" />
        <rect height="40" width="4" x="14" y="0" />
        <circle cx="32" cy="18" r="10" />
        <circle cx="16" cy="18" r="8"
            fill={value}
            visibility={value ? 'visible' : 'hidden'}
        />
    </svg>);
}

function RegularFret(props) {
    const value = props.value;
    return (<svg xmlns={SVG_NAMESPACE} height="40" width="32" viewBox="0 0 32 40" display="block">
        <rect height="4" width="32" x="0" y="36" />
        <rect height="40" width="4" x="14" y="0" />
        <circle cx="16" cy="18" r="8"
            fill={value}
            visibility={value ? 'visible' : 'hidden'}
        />
    </svg>);
}

export default function Fret(props) {
    const decoration = props.decoration;
    if (decoration === 'OPEN') {
        return <OpenFret value={props.value} />;
    } else if (decoration === 'LEFT') {
        return <LeftFret value={props.value} />;
    } else if (decoration === 'RIGHT') {
        return <RightFret value={props.value} />;
    } else {
        return <RegularFret value={props.value} />;
    }
}
