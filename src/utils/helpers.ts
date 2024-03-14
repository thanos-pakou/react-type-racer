/**
 * Parses the input text into an array of sentences, words, and characters.
 * 
 * @param {string} text - The input text to be parsed.
 * @returns {[Array<Array<Array<{character: string, status: string, mistakes: number, timestamp: Array<number>, attempts: number}>>>, number]} An array representing the parsed text structure,
 * where each element corresponds to a sentence, each sentence contains an array of words, and each word contains an array of characters.
 */
export const textParsingEngine = (text: string): 
[Array<Array<Array<{ 
    character: string; status: string; mistakes: number; 
    timestamp: Array<number>; attempts: number; 
}>>>, number] => {
    // Step 1: Normalize whitespace
    const normalizedText = text.replace(/\s+/g, ' ').trim();

    // Step 2: Split text into sentences more reliably
    // Use a regex that splits at punctuation followed by a space or the end of the text
    // This should include sentences ending without punctuation but followed by a space or end of the text
    const sentences = normalizedText.split(/(?<=[.!?])\s+|(?<=[.!?])$/);

    let totalCharacters = 0;
    // Step 3 & 4: Split sentences into words, then words into characters
    const result = sentences.map(sentence =>
        // Split word into characters
        sentence.trim().split(' ').map(word => [...word+' '].map(char => {
            totalCharacters++
            return ({
                character: char,
                status: '',
                mistakes: 0,
                timestamp: [],
                attempts: 0
            })
        })  
        )
    );
    // Remove the extra space at the end of the last word of the text
    result[result.length -1][result[result.length -1].length - 1].pop()
    totalCharacters--
    return [result, totalCharacters];
}