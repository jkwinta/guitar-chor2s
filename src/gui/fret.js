const WIDTH = 32;
const HEIGHT = 40;

const svgNamespace = 'http://www.w3.org/2000/svg';

// List of [shapeName, attributes, toggleForFretting] items

const openElements = [
    [
        'rect',
        {
            width: WIDTH,
            height: Math.floor(HEIGHT / 5),
            x: 0,
            y: HEIGHT - Math.floor(HEIGHT / 5),
        },
        false
    ],
    [
        'circle',
        {
            r: (WIDTH / 2) - 5,
            cx: WIDTH / 2,
            cy: (HEIGHT - Math.floor(HEIGHT / 5)) / 2,
            fill: 'none',
            stroke: 'RED',
            'stroke-width': 5,
        },
        true
    ],
];

const regularElements = [];

const leftDotElements = [];

const rightDotElements = [];


class Fret {
    constructor(type) {
        this.type = type;
        this.svg = null;
        this.fretters = null;
        this.fretted = false;
        this.makeSvg();
    }

    newEmptySvg() {
        let svg = document.createElementNS(svgNamespace, 'svg');
        for (let [a, v] of Object.entries(svgAttributes)) {
            svg.setAttribute(a, v);
        }
        return svg;
    }

    addFretElements(svg, elements) {
        for (let [name, attributes, hide] of elements) {
            let e = document.createElementNS(svgNamespace, name);
            for (let [a, v] of Object.entries(attributes)) {
                e.setAttribute(a, v);
            }
            svg.appendChild(e);
            if (hide) {
                e.setAttribute('visibility', 'hidden');
                this.fretters.push(e);
            }
        }
    }

    makeSvg() {
        this.fretters = [];
        let svg = this.newEmptySvg();
        if (this.type === 'OPEN') {
            this.addFretElements(svg, openElements);
        } else {

        }
        this.svg = svg;
    }

    fret() {
        for (let e of this.fretters) {
            e.setAttribute('visibility', 'visible');
        }
        this.fretted = true;
    }

    unfret() {
        for (let e of this.fretters) {
            e.setAttribute('visibility', 'hidden');
        }
        this.fretted = false;
    }

    toggleFretted() {
        if (this.fretted) {
            this.unfret();
        } else {
            this.fret();
        }
    }


}


function newFret() {
    let fret = document.createElement('div');
    let s = newSvg();
    s.appendChild(newCircle());
    fret.appendChild(s);
    return fret;
}

const svgAttributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    height: HEIGHT,
    width: WIDTH,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
};

function newSvg() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    for (let [a, v] of Object.entries(svgAttributes)) {
        svg.setAttribute(a, v);
    }
    return svg;
}

function newCircle() {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    let ca = {
        r: '50',
        cx: '50',
        cy: '50',
        fill: 'red',
    };
    for (let [a, v] of Object.entries(ca)) {
        circle.setAttribute(a, v);
    }
    return circle;
}

function newRectangle() {
    let a = {
        x: '120',
        y: '5',
        width: '90',
        height: '90',
        stroke: 'blue',
        fill: 'none'
    };
}

// BAR FRETTED:
bf = `<rect
id="rect7"
width="32"
height="8"
x="0"
y="289"
style="stroke-width:0.29840153" />
<circle
id="path9"
cx="16"
cy="273"
style="fill:#0000ff;fill-opacity:1;stroke-width:0.61581236"
r="10" />
<circle
id="path14"
cx="16"
cy="273"
style="fill:#ffffff;fill-opacity:1;stroke-width:0.31146514;opacity:1"
r="6" />`

// reg
r = `    <ns0:rect height="4" id="rect7" style="stroke-width:0.21100175" width="32" x="0" y="293" />
<ns0:rect height="40" id="rect7-3" style="stroke-width:0.23590714" width="4" x="14" y="257" />
<ns0:circle cx="16" cy="275" id="path9" r="8" style="fill:#0000ff;fill-opacity:1;stroke-width:0.61581236" />
`

leftCircle = `<circle
id="path9"
cx="32"
cy="275"
style="stroke-width:1.15617621"
r="10" />`

rightCircle = `<ns0:circle cx="-7.1054274e-15" cy="275" id="path9" r="10" style="stroke-width:1.15617621" />
`