function titleCaseWord(word: string): string {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export function titleCase(s: string): string {
    return s.split(' ').map(titleCaseWord).join(' ');
}

export function shuffle<T>(a: T[]): T[] {
    const result = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
