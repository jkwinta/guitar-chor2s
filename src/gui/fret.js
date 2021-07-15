const WIDTH = 32;
const HEIGHT = 40;

const NUT_HEIGHT = HEIGHT / 5;
const CIRCLE_RADIUS = 0.9 * WIDTH / 2;
// const CIRCLE_RADIUS = (WIDTH / 2) - 5;
const FRET_HEIGHT = HEIGHT / 10;
const STRING_WIDTH = WIDTH / 8;
const DOT_RADIUS = WIDTH / 3;


const svgNamespace = 'http://www.w3.org/2000/svg';
const svgAttributes = {
    xmlns: svgNamespace,
    height: HEIGHT,
    width: WIDTH,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    display: 'block'
};

// List of [shapeName, attributes, colourForFretting] items

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
            r: Math.floor(WIDTH / 2) - 5,
            cx: Math.floor(WIDTH / 2),
            cy: Math.floor((HEIGHT - Math.floor(HEIGHT / 5)) / 2),
            fill: 'none',
            'stroke-width': 5,
        },
        'stroke'
    ],
];

const regularElements = [
    [
        'rect',
        {
            height: Math.floor(HEIGHT / 10),
            width: WIDTH,
            x: 0,
            y: HEIGHT - Math.floor(HEIGHT / 10),
        },
        false,
    ],
    [
        'rect',
        {
            height: HEIGHT,
            width: Math.floor(WIDTH / 8),
            x: Math.floor((WIDTH - Math.floor(WIDTH / 8)) / 2),
            y: 0,
        },
        false,
    ],
    [
        'circle',
        {
            cx: Math.floor(WIDTH / 2),
            cy: Math.floor((HEIGHT - Math.floor(HEIGHT / 10)) / 2),
            r: Math.floor(WIDTH / 2) - 5,
        },
        'fill',
    ]
];

const leftDotElements = regularElements.concat([
    [
        'circle',
        {
            cx: 0,
            cy: Math.floor((HEIGHT - Math.floor(HEIGHT / 10)) / 2),
            r: 10,
        },
        false,
    ]
]).sort(([_n, _a, toggle]) => toggle);  // Re-order toggle elements to be last

const rightDotElements = regularElements.concat([
    [
        'circle',
        {
            cx: WIDTH,
            cy: Math.floor((HEIGHT - Math.floor(HEIGHT / 10)) / 2),
            r: 10,
        },
        false,
    ]
]).sort(([_n, _a, toggle]) => toggle);


class Fret {
    constructor(type, colour = 'blue') {
        this.type = type;
        this.colour = colour;
        this.svg = null;
        this.fretters = null;
        this.fretted = false;
        this.colourElementAttributes = [];
        this.makeSvg();
    }

    newEmptySvg() {
        let svg = document.createElementNS(svgNamespace, 'svg');
        svg.classList.push('fret');
        Object.entries(svgAttributes).forEach(([a, v]) => svg.setAttribute(a, v));
        return svg;
    }

    addFretElements(svg, elements) {
        for (let [name, attributes, hide] of elements) {
            let e = document.createElementNS(svgNamespace, name);
            for (let [a, v] of Object.entries(attributes)) {
                if (v === colourSymbol) {
                    this.colourElementAttributes.push([e, a]);
                    e.setAttribute(a, this.colour);
                } else {
                    e.setAttribute(a, v);
                }
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
        } else if (this.type === 'LEFT') {
            this.addFretElements(svg, leftDotElements);
        } else if (this.type === 'RIGHT') {
            this.addFretElements(svg, rightDotElements);
        } else {
            this.addFretElements(svg, regularElements);
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

    fretColour(colour) {
        this.colour = colour;
        this.colourElementAttributes.forEach(
            ([element, attribute]) => element.setAttribute(attribute, this.colour)
        );
        this.fret();
    }
}
