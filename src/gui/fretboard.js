// import { Fret } from './fret'

class Fretboard {
    constructor(orientation = 'V', number_of_frets = 21, number_of_strings = 6) {
        this.orientation = orientation;
        this.number_of_frets = number_of_frets;
        this.number_of_strings = number_of_strings;
        this.table = document.createElement('table');
        this.strings = [];
        for (let j = 0; j < number_of_strings; j++) {
            this.strings.push([]);
        }
        for (let i = 0; i <= number_of_frets; i++) {
            let fretsRow = document.createElement('tr');
            for (let j = 0; j < number_of_strings; j++) {
                let fret = new Fret();
                this.strings[j].push(fret);
                let fretTd = document.createElement('td');
                fretTd.appendChild(fret.svg);
                fretsRow.appendChild(fretTd);
            }
            this.table.appendChild(fretsRow);
        }
    }
}
