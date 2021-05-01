// import { NOTES } from '../notes.js';

const ROOT_NOTE_SELECTOR_GRID = [];
for (let natural of 'CDEFGAB'.split('')) {
    ROOT_NOTE_SELECTOR_GRID.push([]);
    for (let accidental of ['b', '', '#']) {
        let note = natural + accidental;
        ROOT_NOTE_SELECTOR_GRID[ROOT_NOTE_SELECTOR_GRID.length - 1].push(
            NOTES.flat().includes(note) ? note : null);
    }
}

class RootNoteSelector {
    constructor(parentDiv) {
        this.parentDiv = parentDiv;
        this.groupName = RootNoteSelector.getGroupName();
        this.value = null;
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
}

class ChooseNoteCollection {
    constructor(parentDiv) {
        this.parentDiv = parentDiv;
        // Select root note
        // scale or chord
        // which one!!
        // THEN...
        // Tuning and orientation?
    }
}