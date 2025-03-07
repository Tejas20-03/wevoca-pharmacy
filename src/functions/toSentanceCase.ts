export const toSentenceCase = (str?: string) => {
    if (!str) {
        return str;
    }

    const lowercaseStr = str.toLowerCase();
    const words = lowercaseStr.split(' ');

    const sentenceCaseWords = words.map(word => {
        const firstChar = word.charAt(0).toUpperCase();
        const restOfString = word.slice(1);
        return firstChar + restOfString;
    });

    return sentenceCaseWords.join(' ');
};