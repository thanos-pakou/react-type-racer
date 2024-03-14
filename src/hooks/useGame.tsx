import { useGameSession } from "../contexts";

export const useGame = () => {
    let gameSession = useGameSession();
    let gameText = gameSession.gameText.current[0]
    let gameTextLength = gameSession.gameText.current[1]

    /**
     * Function to set the gameIsRunning state to true
     */
    const runGame = () => {
        gameSession.setGameIsRunning(true)
        console.log('Game started')
    }

    /**
     * Function to set the gameIsRunning state to false
     */
    // TODO: Find a way to separate pause and end game
    const endGame = () => {
        gameSession.setGameIsRunning(false)
        console.log('Game ended')
    }


    /**
     * Function to set the gameIsRunning state to false
     */
    // TODO: Find a way to separate pause and end game
    const pauseGame = () => {
        gameSession.setGameIsRunning(false)
        console.log('Game ended')
    }

    /**
     * Function to reset the game session index
     * @returns {boolean} - returns true if the game is running
     */
    const gameIsRunning = (): boolean => {
        return gameSession.gameIsRunning
    }

    /**
     * Advances the game session to the next character, word, or sentence based on the current index.
     * Handles transitions between characters, words, and sentences without relying on nested if statements.
     * @returns {void}
     */
    const advanceToNextCharacter = (): void => {
        
        let tempIndex = gameSession.gameSessionIndex
        
        // If is the last character of the word
        if(tempIndex['char'] == gameText[tempIndex['sentence']][tempIndex['word']].length - 1) {
            // If is the last word of the sentence 
            if(tempIndex['word'] == gameText[tempIndex['sentence']].length - 1) {
                // If is not the last sentence of the text it moves to the next sentence,
                // to the first word, to the first character 
                if (tempIndex['sentence'] !== gameText.length - 1) {
                    tempIndex.sentence++;
                    tempIndex.word = 0;
                    tempIndex.char = 0;      
                // If is  the last sentence of the text it returns
                } else {
                    
                }
            // If is not the last word of the sentence, moves to the next word,
            // to the first character    
            } else {
                tempIndex.word++;
                tempIndex.char = 0;
            }
        // If is not the last character of the word, moves to the next character    
        } else {
            tempIndex.char++;
        }
        gameSession.setGameSessionIndex({...gameSession.gameSessionIndex,
        sentence: tempIndex['sentence'],
        word: tempIndex['word'],
        char: tempIndex['char'],
        })
        gameSession.gameTotalIndex.current++
    }

    /**
     * Reverts the game session to the previous character, word, or sentence based on the current index.
     * Handles transitions between characters, words, and sentences without relying on nested if statements.
     * @returns {void}
     */
    const revertToPreviousCharacter = (): void => {
        

        let tempText = [...gameText]
        const tempIndex = gameSession.gameSessionIndex
        // If first character of word
        if (tempIndex.char === 0) {
            // If first word of sentence
            if (tempIndex.word === 0) {
                // If not first sentence of text move back to previous sentence to the last word,
                // o the last character, adjust index and remove style
                if (tempIndex.sentence !== 0) {
                    tempIndex.sentence--;
                    tempIndex.word = tempText[tempIndex['sentence']].length - 1
                    tempIndex.char = tempText[tempIndex['sentence']][tempIndex['word']].length - 1
                } else {
                    return 
                }
            // If not first word of sentence move back to the previous word to the last character,
            // adjust index and remove style
            } else {
                tempIndex.word--;
                tempIndex.char = tempText[tempIndex['sentence']][tempIndex['word']].length - 1
            }
        // If not first character of word move back to the previous character,
        // adjust index and remove style
        } else {
            tempIndex.char = tempIndex.char -1;
            
            
        }

        gameSession.setGameSessionIndex({...gameSession.gameSessionIndex,
            sentence: tempIndex['sentence'],
            word: tempIndex['word'],
            char: tempIndex['char'],
            })
        gameSession.gameTotalIndex.current--
    }

    /**
     * Returns the current character array based on the current index
     * @returns {string} - the current character array
     */
    const getCurrentChracterArray = () => {
        return gameText[gameSession.gameSessionIndex['sentence']][gameSession.gameSessionIndex['word']][gameSession.gameSessionIndex['char']]
    }
}

