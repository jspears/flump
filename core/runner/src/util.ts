const ALPHA = 'abcdefghijklnopqrstuvwxyz';
/**
 * Attempts to find the best short option. It starts with
 * begining of each letter of the name of the argument, and checks
 * for available lowercase options, than upper case, than the next
 * lower case alpha, and then the next uppercase alpha.
 *
 * @param word
 * @param used
 */
export const findNextShort = (word: string, used: string[] = [],
                              filter = (v: string): boolean => !used.includes(v),
                              notFound = (): string => {
                                  throw new Error(`could not find a valid shortopt for '${word}'`)
                              }
): string => {
    const letters = word.split('');
    for (let i = 0; i < letters.length; i++) {
        if (filter(letters[i])) {
            return letters[i];
        }
        if (filter(letters[i].toUpperCase())) {
            return letters[i].toUpperCase();
        }
    }
    return findNextShort(ALPHA, used, filter, notFound);
}
