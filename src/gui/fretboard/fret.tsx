export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const WIDTH = 28;
const HEIGHT = 40;

const NUT_FRACT = 1 / 6;
const OPEN_TOTAL_FRACT = 9 / 10;
const OPEN_STROKE_FRACT = 3 / 8;

const FRET_WIRE_HEIGHT_FRACT = 1 / 10;
const STRING_WIDTH_FRACT = 1 / 8;
const DOT_WIDTH_FRACT = 6 / 8;
const PIP_WIDTH_FRACT = 2 / 3;

export const PIP_RADIUS = WIDTH * PIP_WIDTH_FRACT / 2;

const SVG_ATTRS = {
    xmlns: SVG_NAMESPACE,
    height: HEIGHT,
    width: WIDTH,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    display: "block",
}


function Nut(props: any) {
    return <rect
        height={HEIGHT * NUT_FRACT}
        width={WIDTH}
        x="0"
        y={HEIGHT * (1 - NUT_FRACT)}
    />;
}

interface PipProps {
    value: string | undefined,
}

function OpenPip(props: PipProps) {
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

function OpenFret(props: PipProps) {
    return (<svg {...SVG_ATTRS}>
        <Nut />
        <OpenPip value={props.value} />
    </svg>);
}

function FretWire(props: any) {
    return <rect
        height={HEIGHT * FRET_WIRE_HEIGHT_FRACT}
        width={WIDTH}
        x="0"
        y={HEIGHT * (1 - FRET_WIRE_HEIGHT_FRACT)}
    />;
}

function FretString(props: any) {
    return <rect
        height={HEIGHT}
        width={WIDTH * STRING_WIDTH_FRACT}
        x={WIDTH * (1 - STRING_WIDTH_FRACT) / 2}
        y="0"
    />;
}
function Pip(props: PipProps) {
    const value = props.value;
    return <circle
        cx={WIDTH / 2}
        cy={HEIGHT * (1 - FRET_WIRE_HEIGHT_FRACT) / 2}
        r={PIP_RADIUS}
        fill={value}
        visibility={value ? 'visible' : 'hidden'}
    />;
}

function LeftCircle(props: any) {
    return <circle
        cx="0"
        cy={HEIGHT * (1 - FRET_WIRE_HEIGHT_FRACT) / 2}
        r={WIDTH * DOT_WIDTH_FRACT / 2} />;
}

function RightCircle(props: any) {
    return <circle
        cx={WIDTH}
        cy={HEIGHT * (1 - FRET_WIRE_HEIGHT_FRACT) / 2}
        r={WIDTH * DOT_WIDTH_FRACT / 2} />;
}

function LeftCircleFret(props: PipProps) {
    return (<svg {...SVG_ATTRS}>
        <FretWire />
        <LeftCircle />
        <FretString />
        <Pip value={props.value} />
    </svg>);
}

function RightCircleFret(props: PipProps) {
    return (<svg {...SVG_ATTRS}>
        <FretWire />
        <RightCircle />
        <FretString />
        <Pip value={props.value} />
    </svg>);
}

function RegularFret(props: PipProps) {
    return (<svg {...SVG_ATTRS}>
        <FretWire />
        <FretString />
        <Pip value={props.value} />
    </svg>);
}

interface FretProps {
    decoration: string | null,
    value: string | undefined,
}

export default function Fret(props: FretProps) {
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
