import { NOTES } from "../notes.js";
import { SCALES } from '../scales.js';
import { CHORDS } from '../chords.js';

const ROOT_NOTE_SELECTOR_GRID = [];
for (let natural of 'CDEFGAB'.split('')) {
    ROOT_NOTE_SELECTOR_GRID.push([]);
    for (let accidental of ['b', '', '#']) {
        let note = natural + accidental;
        ROOT_NOTE_SELECTOR_GRID[ROOT_NOTE_SELECTOR_GRID.length - 1].push(
            NOTES.flat().includes(note) ? note : null);
    }
}

export class RootNoteSelector {
    constructor(parentDiv) {
        this.parentDiv = parentDiv;
        this.groupName = RootNoteSelector.getGroupName();
        this.buttons = [];
        this.table = document.createElement('table');
        //
        for (let noteRow of ROOT_NOTE_SELECTOR_GRID) {
            let noteTableRow = document.createElement('tr');
            for (let note of noteRow) {
                let tableCell = document.createElement('td');
                if (note) {
                    let noteLabel = document.createElement('label');
                    let noteButton = document.createElement('input');
                    noteButton.type = 'radio';
                    noteButton.name = this.groupName;
                    noteButton.value = note;
                    this.buttons.push(noteButton);
                    noteLabel.appendChild(noteButton);
                    noteLabel.appendChild(document.createTextNode(note));
                    tableCell.appendChild(noteLabel);
                }
                noteTableRow.appendChild(tableCell);
            }
            this.table.appendChild(noteTableRow);
        }
        parentDiv.appendChild(this.table);
    }

    static getGroupName(prefix = 'RootNoteSelector') {
        let randInt = Math.floor(1e6 * Math.random())
        let candidate = `${prefix}-${randInt}`;
        while (document.querySelectorAll(`[name=${candidate}]`).length) {
            randInt = Math.floor(1e6 * Math.random())
            candidate = `${prefix}-${randInt}`;
        }
        return candidate;
    }

    getValue() {
        for (const button of this.buttons) {
            if (button.checked) {
                return button.value;
            }
        }
    }
}

const SCALES_KEY = 'Scales';
const CHORDS_KEY = 'Chords';

export class ScalesOrChordsSelector {
    constructor(parentDiv) {
        this.parentDiv = parentDiv;
        this.buttons = [];
        this.groupName = 'scale-or-chord-group';
        this.table = document.createElement('table');

        const row = document.createElement('tr');

        for (const buttonLabel of [SCALES_KEY, CHORDS_KEY]) {
            let tableCell = document.createElement('td');
            let label = document.createElement('label');
            let button = document.createElement('input');
            button.type = 'radio';
            button.name = this.groupName;
            button.value = buttonLabel;
            this.buttons.push(button);
            label.appendChild(button);
            label.appendChild(document.createTextNode(buttonLabel));
            tableCell.appendChild(label);
            row.appendChild(tableCell);
        }
        this.table.appendChild(row);
        parentDiv.appendChild(this.table);
        this.table.style.border = 'solid';
    }

    getValue() {
        for (const button of this.buttons) {
            if (button.checked) {
                return button.value;
            }
        }
    }
}

function titleCaseWord(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function titleCase(string) {
    return string.split(' ').map(titleCaseWord).join(' ');
}

export class CollectionSelector {
    constructor(parentDiv, collectionType) {
        this.parentDiv = parentDiv;
        this.select = document.createElement('select');
        this.select.size = 10;
        this.options = [];
        this.collection;
        parentDiv.appendChild(this.select);
    }

    showCollection(collectionName) {
        if (collectionName === SCALES_KEY) {
            this.collection = SCALES;
        } else if (collectionName === CHORDS_KEY) {
            this.collection = CHORDS;
        }
        if (this.collection) {
            for (const member in this.collection) {
                const item = document.createElement('option');
                item.text = titleCase(member);
                item.value = member;
                this.options.push(item);
                this.select.appendChild(item);
            }
        }
    }
}

export class NoteCollectionSelector {
    constructor(parentDiv) {
        this.parentDiv = parentDiv;
        this.rootNoteSelector = new RootNoteSelector(parentDiv);
        this.scaleOrChordSelector = new ScalesOrChordsSelector(parentDiv);
        this.collectionSelector = new CollectionSelector(parentDiv);
        this.collectionSelector.showCollection(CHORDS_KEY);
    }
}
