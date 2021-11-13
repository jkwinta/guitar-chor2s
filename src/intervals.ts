export const INTERVALS: { [intervalName: string]: string } = {
    ROOT: 'ROOT',
    MINOR_2ND: 'MINOR 2ND',
    MAJOR_2ND: 'MAJOR 2ND',
    AUGMENTED_2ND: 'AUGMENTED 2ND',
    MINOR_3RD: 'MINOR 3RD',
    MAJOR_3RD: 'MAJOR 3RD',
    PERFECT_4TH: 'PERFECT 4TH',
    AUGMENTED_4TH: 'AUGMENTED 4TH',
    DIMINISHED_5TH: 'DIMINISHED 5TH',
    PERFECT_5TH: 'PERFECT 5TH',
    AUGMENTED_5TH: 'AUGMENTED 5TH',
    MINOR_6TH: 'MINOR 6TH',
    MAJOR_6TH: 'MAJOR 6TH',
    DIMINISHED_7TH: 'DIMINISHED 7TH',
    MINOR_7TH: 'MINOR 7TH',
    MAJOR_7TH: 'MAJOR 7TH',
    MAJOR_9TH: 'MAJOR 9TH',
    PERFECT_11TH: 'PERFECT 11TH',
    SHARP_11TH: 'SHARP 11TH',
    MAJOR_13TH: 'MAJOR 13TH',
}


export const INTERVAL_SEMITONES: { [intervalName: string]: number } = {
    [INTERVALS.ROOT]: 0,
    [INTERVALS.MINOR_2ND]: 1,
    [INTERVALS.MAJOR_2ND]: 2,
    [INTERVALS.AUGMENTED_2ND]: 3,
    [INTERVALS.MINOR_3RD]: 3,
    [INTERVALS.MAJOR_3RD]: 4,
    [INTERVALS.PERFECT_4TH]: 5,
    [INTERVALS.AUGMENTED_4TH]: 6,
    [INTERVALS.DIMINISHED_5TH]: 6,
    [INTERVALS.PERFECT_5TH]: 7,
    [INTERVALS.AUGMENTED_5TH]: 8,
    [INTERVALS.MINOR_6TH]: 8,
    [INTERVALS.MAJOR_6TH]: 9,
    [INTERVALS.DIMINISHED_7TH]: 9,
    [INTERVALS.MINOR_7TH]: 10,
    [INTERVALS.MAJOR_7TH]: 11,
    [INTERVALS.MAJOR_9TH]: 14,
    [INTERVALS.PERFECT_11TH]: 17,
    [INTERVALS.SHARP_11TH]: 18,
    [INTERVALS.MAJOR_13TH]: 21,
}

const shortNames: { [intervalType: string]: string } = {
    MINOR: 'MIN',
    MAJOR: 'MAJ',
    AUGMENTED: 'AUG',
    PERFECT: 'P',
    DIMINISHED: 'DIM',
    SHARP: '#'
};

function getDigits(s: string): string | null {
    const result = /\d+/.exec(s);
    if (result) {
        return result[0];
    }
    return null;
}

export function shortenIntervalName(interval: string): string {
    if (Object.values(INTERVALS).includes(interval)) {
        return shortenName(interval);
    }
    return interval;
}

function shortenName(interval: string): string {
    if (interval === INTERVALS.ROOT) {
        return 'R';
    } else {
        const [a, b] = interval.split(' ');
        const result = [shortNames[a] || a, getDigits(b) || b];
        return result.join(' ');
    }
}