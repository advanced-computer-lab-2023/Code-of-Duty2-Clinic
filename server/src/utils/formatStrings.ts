export const removeSpacesAtTheEnd = (word: string | undefined) => {
    if(word) {
        return word.trimEnd()
    }
    return '';
}