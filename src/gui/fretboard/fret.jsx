const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';


const WIDTH = 32;
const HEIGHT = 40;

const NUT_FRACT = 1 / 6;
const OPEN_TOTAL_FRACT = 9 / 10;
const OPEN_STROKE_FRACT = 3 / 8;

const FRET_HEIGHT_FRACT = 1 / 10;
const STRING_WIDTH_FRACT = 1 / 8;
const DOT_WIDTH_FRACT = 1 / 3;
const PIP_WIDTH_FRACT = 1 / 4;

const SVG_ATTRS = {
    xmlns: SVG_NAMESPACE,
    height: HEIGHT,
    width: WIDTH,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    display: "block",
}

function Nut(props) {
    return <rect
        height={HEIGHT * NUT_FRACT}
        width={WIDTH}
        x="0"
        y={HEIGHT * (1 - NUT_FRACT)}
    />;
}

function OpenFret(props) {
    const value = props.value;
    return (<svg {...SVG_ATTRS}>
        <Nut />
        <circle
            cx={WIDTH / 2}
            cy={HEIGHT * (1 - NUT_FRACT) / 2}
            r={WIDTH * OPEN_TOTAL_FRACT * (1 - OPEN_STROKE_FRACT) / 2}
            strokeWidth={WIDTH * OPEN_TOTAL_FRACT * OPEN_STROKE_FRACT / 2}
            fill="none"
            stroke={value}
            visibility={value ? 'visible' : 'hidden'}
        />
    </svg>);
}

function LeftFret(props) {
    const value = props.value;
    return (<svg xmlns={SVG_NAMESPACE}
        height={HEIGHT}
        width={WIDTH}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        display="block"
    >
        <rect
            height="4"
            width="32"
            x="0"
            y="36"
        />
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
    return (<svg xmlns={SVG_NAMESPACE}
        height={HEIGHT}
        width={WIDTH}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        display="block"
    >
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
    return (<svg xmlns={SVG_NAMESPACE}
        height={HEIGHT}
        width={WIDTH}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        display="block"
    >
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
