function titleCaseWord(word: string): string {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export function titleCase(s: string): string {
    return s.split(' ').map(titleCaseWord).join(' ');
}
