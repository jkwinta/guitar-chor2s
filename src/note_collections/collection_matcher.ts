import {Chord, Scale} from './collections';

getChordsSum() {
    const chordVectors = this.state.chords.map(
        c => c.intervalMap.map(x => x == null ? 0 : 1));
    return zip(...chordVectors).map(a => numSum(a));
}

export function getScalesFromChords(chords: Chord[]):Scale[]{
    
}