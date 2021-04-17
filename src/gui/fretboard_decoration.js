
class FretboardDecoration {
    constructor(numberOfStrings) {
        this.numberOfStrings = numberOfStrings;
        this.rowCache = new Map();
    }

    static standardNumberOfDots(fretNumber) {
        if (fretNumber % 12 === 0) {
            return 2;
        } else if ((fretNumber % 2 === 1) && (fretNumber % 12 !== 1) && (fretNumber % 12 !== 11)) {
            // Odd fret number but not 1 or 11
            return 1;
        } else {
            return 0;
        }
    }

    static nDotRow(nDots, nStrings) {
        const stringsWithDots = 2 * nDots;
        let remaining = nStrings - stringsWithDots;
        let result = [];
        for (let i = 0; i < nDots; i++) {
            result.push('RIGHT');
            result.push('LEFT');
        }
        while (remaining > 0) {
            if (remaining >= (nDots + 1)) {
                let i = 0;
                while (i < result.length) {
                    if (result[i] === 'RIGHT') {
                        result.splice(i, 0, '');
                        i += 1;
                    }
                    i += 1;
                }
                result.push('');
                remaining -= (nDots + 1);
            } else if (remaining === nDots - 1) {
                let i = result.indexOf('RIGHT') + 1;
                while (i < result.length) {
                    if (result[i] === 'RIGHT') {
                        result.splice(i, 0, '');
                        i += 1;
                    }
                    i += 1;
                }
                remaining -= (nDots - 1);
            } else {
                const pre = Math.floor(remaining / 2);
                const post = remaining - pre;
                for (let i = 0; i < pre; i++) {
                    result.unshift('');
                }
                for (let i = 0; i < post; i++) {
                    result.push('');
                }
                remaining -= (pre + post);
            }
        }
        return result;
    }

    getDecoration(fretNumber, stringIndex) {
        if (!fretNumber) {
            return 'OPEN';
        }
        const nDots = FretboardDecoration.standardNumberOfDots(fretNumber);
        if (!nDots) {
            return '';
        }
        if (!this.rowCache.has(nDots)) {
            this.rowCache.set(nDots, FretboardDecoration.nDotRow(nDots, this.numberOfStrings));
        }
        return this.rowCache.get(nDots)[stringIndex];
    }


}
