const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';


const WIDTH = 28;
const HEIGHT = 40;

const NUT_FRACT = 1 / 6;
const OPEN_TOTAL_FRACT = 9 / 10;
const OPEN_STROKE_FRACT = 3 / 8;

const FRET_WIRE_HEIGHT_FRACT = 1 / 10;
const STRING_WIDTH_FRACT = 1 / 8;
const DOT_WIDTH_FRACT = 3 / 8;
const PIP_WIDTH_FRACT = 1 / 3;

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

function OpenPip(props) {
    const value = props.value;
    return <circle
        cx={WIDTH / 2}
        cy={HEIGHT * (1 - NUT_FRACT) / 2}
        r={WIDTH * OPEN_TOTAL_FRACT * (1 - OPEN_STROKE_FRACT) / 2}
        strokeWidth={WIDTH * OPEN_TOTAL_FRACT * OPEN_STROKE_FRACT / 2}
        fill="none"
        stroke={value}
        visibility={value ? 'visible' : 'hidden'}
    />;
}

function OpenFret(props) {
    return (<svg {...SVG_ATTRS}>
        <Nut />
        <OpenPip value={props.value} />
    </svg>);
}

function FretWire(props) {
    return <rect
        height={HEIGHT * FRET_WIRE_HEIGHT_FRACT}
        width={WIDTH}
        x="0"
        y={HEIGHT * (1 - FRET_WIRE_HEIGHT_FRACT)}
    />;
}

function FretString(props) {
    return <rect
        height={HEIGHT}
        width={WIDTH * STRING_WIDTH_FRACT}
        x={WIDTH * (1 - STRING_WIDTH_FRACT) / 2}
        y="0"
    />;
}

function Pip(props) {
    const value = props.value;
    return <circle
        cx={WIDTH / 2}
        cy={HEIGHT * (1 - FRET_WIRE_HEIGHT_FRACT) / 2}
        r={WIDTH * PIP_WIDTH_FRACT}
        fill={value}
        visibility={value ? 'visible' : 'hidden'}
    />;
}

function LeftCircle(props) {
    return <circle
        cx="0"
        cy={HEIGHT * (1 - FRET_WIRE_HEIGHT_FRACT) / 2}
        r={WIDTH * DOT_WIDTH_FRACT} />;
}

function RightCircle(props) {
    return <circle
        cx={WIDTH}
        cy={HEIGHT * (1 - FRET_WIRE_HEIGHT_FRACT) / 2}
        r={WIDTH * DOT_WIDTH_FRACT} />;
}

function LeftCircleFret(props) {
    return (<svg {...SVG_ATTRS}>
        <FretWire />
        <LeftCircle />
        <FretString />
        <Pip value={props.value} />
    </svg>);
}

function RightCircleFret(props) {
    return (<svg {...SVG_ATTRS}>
        <FretWire />
        <RightCircle />
        <FretString />
        <Pip value={props.value} />
    </svg>);
}

function RegularFret(props) {
    return (<svg {...SVG_ATTRS}>
        <FretWire />
        <FretString />
        <Pip value={props.value} />
    </svg>);
}

export default function Fret(props) {
    const decoration = props.decoration;
    if (decoration === 'OPEN') {
        return <OpenFret value={props.value} />;
    } else if (decoration === 'LEFT') {
        return <LeftCircleFret value={props.value} />;
    } else if (decoration === 'RIGHT') {
        return <RightCircleFret value={props.value} />;
    } else {
        return <RegularFret value={props.value} />;
    }
}
