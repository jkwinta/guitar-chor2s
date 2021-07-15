import { NOTES } from "../../notes.js";

const ROOT_NOTE_SELECTOR_GRID = [];
for (let natural of 'CDEFGAB'.split('')) {
    ROOT_NOTE_SELECTOR_GRID.push([]);
    for (let accidental of ['b', '', '#']) {
        let note = natural + accidental;
        ROOT_NOTE_SELECTOR_GRID[ROOT_NOTE_SELECTOR_GRID.length - 1].push(
            NOTES.flat().includes(note) ? note : null);
    }
}

export class NoteSelector {
    constructor(parentDiv, clickCallback){
        
    }
}
