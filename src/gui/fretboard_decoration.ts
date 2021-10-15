export class StandardFretboardDecoration {
    numberOfStrings: number;

    constructor(numberOfStrings: number) {
        this.numberOfStrings = numberOfStrings;
    }

    getDecoration(fretNumber: number, stringIndex: number): string | null {
        if (fretNumber === 0) {
            return 'OPEN';
        }
        if (this.numberOfStrings === 6) {
            return this.getDecoration6(fretNumber, stringIndex);
        } else if (this.numberOfStrings === 4) {
            return this.getDecoration4(fretNumber, stringIndex);
        }
        return null;
    }

    getDecoration6(fretNumber: number, stringIndex: number): string | null {
        const numberOfDots = StandardFretboardDecoration.getNumberOfDots(fretNumber);
        if (numberOfDots === 2) {
            return [null, 'RIGHT', 'LEFT', 'RIGHT', 'LEFT', null][stringIndex];
        } else if (numberOfDots === 1) {
            return [null, null, 'RIGHT', 'LEFT', null, null][stringIndex];
        }
        return null;
    }

    getDecoration4(fretNumber: number, stringIndex: number): string | null {
        const numberOfDots = StandardFretboardDecoration.getNumberOfDots(fretNumber);
        if (numberOfDots === 2) {
            return [null, 'RIGHT', 'LEFT', 'RIGHT', 'LEFT', null][stringIndex];
        } else if (numberOfDots === 1) {
            return ['RIGHT', 'LEFT', 'RIGHT', 'LEFT'][stringIndex];
        }
        return null;
    }


    static getNumberOfDots(fretNumber: number): number {
        const mod12 = fretNumber % 12;
        if (mod12 === 0) {
            return 2;
        } else if ((fretNumber % 2 === 1) && (mod12 % 10 !== 1)) {
            // Odd fret number but not 1 or 11
            return 1;
        }
        return 0;
    }

    // static nDotRowCache(nDots: number, nStrings: number): (string | null)[] | undefined {
    //     if (nDots == 0) {
    //         return Array(nStrings).fill(null);
    //     } else if (nDots == 1) {
    //         if (nStrings == 4) {
    //             return [null, 'RIGHT', 'LEFT', null];
    //         } else if (nStrings == 6) {
    //             return [null, null, 'RIGHT', 'LEFT', null, null];
    //         }
    //     } else if (nDots == 2) {
    //         if (nStrings == 4) {
    //             return ['RIGHT', 'LEFT', 'RIGHT', 'LEFT'];
    //         } else if (nStrings == 6) {
    //             return [null, 'RIGHT', 'LEFT', 'RIGHT', 'LEFT', null];
    //         }
    //     }
    // }

    // static nDotRowGeneral(nDots: number, nStrings: number): string[] {
    //     const stringsWithDots = 2 * nDots;
    //     let remaining = nStrings - stringsWithDots;
    //     let result = [];
    //     for (let i = 0; i < nDots; i++) {
    //         result.push('RIGHT');
    //         result.push('LEFT');
    //     }
    //     while (remaining > 0) {
    //         if (remaining >= (nDots + 1)) {
    //             let i = 0;
    //             while (i < result.length) {
    //                 if (result[i] === 'RIGHT') {
    //                     result.splice(i, 0, '');
    //                     i += 1;
    //                 }
    //                 i += 1;
    //             }
    //             result.push('');
    //             remaining -= (nDots + 1);
    //         } else if (remaining === nDots - 1) {
    //             let i = result.indexOf('RIGHT') + 1;
    //             while (i < result.length) {
    //                 if (result[i] === 'RIGHT') {
    //                     result.splice(i, 0, '');
    //                     i += 1;
    //                 }
    //                 i += 1;
    //             }
    //             remaining -= (nDots - 1);
    //         } else {
    //             const pre = Math.floor(remaining / 2);
    //             const post = remaining - pre;
    //             for (let i = 0; i < pre; i++) {
    //                 result.unshift('');
    //             }
    //             for (let i = 0; i < post; i++) {
    //                 result.push('');
    //             }
    //             remaining -= (pre + post);
    //         }
    //     }
    //     return result;
    // }

    // static getDecoration(fretNumber: number, nStrings: number, stringIndex: number): string | null {
    //     if (fretNumber == 0) {
    //         return 'OPEN';
    //     }
    //     const nDots = StandardFretboardDecoration.numberOfDots(fretNumber);
    //     if (nDots == 0) {
    //         return null;
    //     }
    //     const row = StandardFretboardDecoration.nDotRowCache(nDots, nStrings) || StandardFretboardDecoration.nDotRowGeneral(nDots, nStrings);
    //     return row[stringIndex];
    // }
}
