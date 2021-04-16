// import { Fret } from './fret'

fretboardAttributes = {
    // 'table-layout': 'fixed',
    // 'border-spacing': 0,
    // border: 0,
    // padding: 0,
    // margin: 0,
    cellspacing: 0,
    cellpadding: 0,
};

fretsRowAttributes = {
    // padding: 0,
    // margin: 0,
    // border: 'none',
    // 'border-spacing': 0,
};

tdAttributes = {
    // padding: 0,
    // border: 0,
    // margin: 0,
    // 'border-spacing': 0,
};

class Fretboard {
    constructor(orientation = 'V', number_of_frets = 21, number_of_strings = 6) {
        this.orientation = orientation;
        this.number_of_frets = number_of_frets;
        this.number_of_strings = number_of_strings;
        this.table = document.createElement('table');
        for (let [a, v] of Object.entries(fretboardAttributes)) {
            this.table.setAttribute(a, v);
        }
        this.strings = [];
        for (let j = 0; j < number_of_strings; j++) {
            this.strings.push([]);
        }
        for (let i = 0; i <= number_of_frets; i++) {
            let fretsRow = document.createElement('tr');
            for (let [a, v] of Object.entries(fretsRowAttributes)) {
                fretsRow.setAttribute(a, v);
            }
            for (let j = 0; j < number_of_strings; j++) {
                let fret;
                if (i === 0) {
                    fret = new Fret('OPEN');
                } else {
                    fret = new Fret();
                }
                fret.svg.onclick = () => fret.toggleFretted();
                this.strings[j].push(fret);
                let fretTd = document.createElement('td');
                for (let [a, v] of Object.entries(tdAttributes)) {
                    fretTd.setAttribute(a, v);
                }
                fretTd.appendChild(fret.svg);
                fretsRow.appendChild(fretTd);
            }
            this.table.appendChild(fretsRow);
        }
    }
}
