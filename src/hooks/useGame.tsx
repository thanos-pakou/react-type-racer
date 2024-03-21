import { useGameSession } from "../contexts";
import { GameSessionIndexObject } from "../contexts";

export interface GameControllerObject {
    runGame: () => void;
    endGame: () => void;
    pauseGame: () => void;
    gameIsRunning: () => boolean;
    gameSessionIndex: GameSessionIndexObject;
    setGameIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    setGameSessionIndex: React.Dispatch<
        React.SetStateAction<GameSessionIndexObject>
    >;
    getCurrentChracterArray: () => {
        character: string;
        status: string;
        mistakes: number;
        timestamp: Array<number>;
        attempts: number;
    };
    evaluateCharacterInput: (inputKey: string) => string;
    updateCharacterArray: (charEvaluation: string) => void;
    advanceToNextCharacter: () => void;
    revertToPreviousCharacter: () => void;
    getPrevIndex: (textIndex: GameSessionIndexObject) => GameSessionIndexObject;
    updatePrevCharacterArray: () => void;
    isGameFinished: () => boolean;
}

export interface GameCharacter {
    character: string;
    status: string;
    mistakes: number;
    timestamp: number[];
    attempts: number;
}

export const useGame = (): GameControllerObject => {
    let gameSession = useGameSession();
    let gameText = gameSession.gameText.current[0];
    let gameTextLength = gameSession.gameText.current[1];

    /**
     * Function to set the gameIsRunning state to true
     */
    const runGame = () => {
        gameSession.setGameIsRunning(true);
        console.log("Game started");
    };

    /**
     * Function to set the gameIsRunning state to false
     */
    // TODO: Find a way to separate pause and end game
    const endGame = () => {
        gameSession.setGameIsRunning(false);
        console.log("Game ended");
    };

    /**
     * Function to set the gameIsRunning state to false
     */
    // TODO: Find a way to separate pause and end game
    const pauseGame = () => {
        gameSession.setGameIsRunning(false);
        console.log("Game ended");
    };

    /**
     * Function to reset the game session index
     * @returns {boolean} - returns true if the game is running
     */
    const gameIsRunning = (): boolean => {
        return gameSession.gameIsRunning;
    };

    /**
     * Retuns true if the game total index is equal to the game text length
     * @returns {boolean} - returns true if the game is finished
     */
    const isGameFinished = (): boolean => {
        console.log(gameTextLength);
        return gameTextLength === gameSession["gameTotalIndex"].current + 1;
    };

    /**
     * Advances the game session to the next character, word, or sentence based on the current index.
     * Handles transitions between characters, words, and sentences without relying on nested if statements.
     * @returns {void}
     */
    const advanceToNextCharacter = (): void => {
        let tempIndex = gameSession.gameSessionIndex;

        // If is the last character of the word
        if (
            tempIndex["char"] ==
            gameText[tempIndex["sentence"]][tempIndex["word"]].length - 1
        ) {
            // If is the last word of the sentence
            if (
                tempIndex["word"] ==
                gameText[tempIndex["sentence"]].length - 1
            ) {
                // If is not the last sentence of the text it moves to the next sentence,
                // to the first word, to the first character
                if (tempIndex["sentence"] !== gameText.length - 1) {
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
        gameSession.setGameSessionIndex({
            ...gameSession.gameSessionIndex,
            sentence: tempIndex["sentence"],
            word: tempIndex["word"],
            char: tempIndex["char"],
        });
        gameSession.gameTotalIndex.current++;
    };

    /**
     * Reverts the game session to the previous character, word, or sentence based on the current index.
     * Handles transitions between characters, words, and sentences without relying on nested if statements.
     * @returns {void}
     */
    const revertToPreviousCharacter = (): void => {
        let tempText = [...gameText];
        const tempIndex = gameSession.gameSessionIndex;
        // If first character of word
        if (tempIndex.char === 0) {
            // If first word of sentence
            if (tempIndex.word === 0) {
                // If not first sentence of text move back to previous sentence to the last word,
                // o the last character, adjust index and remove style
                if (tempIndex.sentence !== 0) {
                    tempIndex.sentence--;
                    tempIndex.word = tempText[tempIndex["sentence"]].length - 1;
                    tempIndex.char =
                        tempText[tempIndex["sentence"]][tempIndex["word"]]
                            .length - 1;
                } else {
                    return;
                }
                // If not first word of sentence move back to the previous word to the last character,
                // adjust index and remove style
            } else {
                tempIndex.word--;
                tempIndex.char =
                    tempText[tempIndex["sentence"]][tempIndex["word"]].length -
                    1;
            }
            // If not first character of word move back to the previous character,
            // adjust index and remove style
        } else {
            tempIndex.char = tempIndex.char - 1;
        }

        gameSession.setGameSessionIndex({
            ...gameSession.gameSessionIndex,
            sentence: tempIndex["sentence"],
            word: tempIndex["word"],
            char: tempIndex["char"],
        });
        gameSession.gameTotalIndex.current--;
    };

    /**
     * Returns the current character array based on the current index
     * @returns {GameCharacter} - the current character array
     */
    const getCurrentChracterArray = (): GameCharacter => {
        return gameText[gameSession.gameSessionIndex["sentence"]][
            gameSession.gameSessionIndex["word"]
        ][gameSession.gameSessionIndex["char"]];
    };

    /**
     * Evaluates the input key against the current character array
     * @param {string} inputKey - the input key to be evaluated
     * @param {Array} charArray - the current character array to be evaluated
     * @returns {string} - the status of the input key for the css class
     */
    const evaluateCharacterInput = (
        inputKey: string,
        charArray = getCurrentChracterArray()
    ) => {
        if (
            inputKey === charArray["character"] &&
            charArray["mistakes"] === 0
        ) {
            return "character-correct";
        } else if (inputKey === charArray["character"]) {
            return "character-corrected";
        } else {
            return "character-wrong";
        }
    };

    /**
     * Updates the current character array with the evaluation of the input key
     * @param {string} charEvaluation - the evaluation of the input key
     * @param {Object<{ character: string; status: string; mistakes: number; timestamp: Array<number>; attempts: number; }>} charArray - the current character array to be updated
     * @returns {void}
     */
    const updateCharacterArray = (
        charEvaluation: string,
        charArray = getCurrentChracterArray()
    ) => {
        let tempGameText = gameSession.gameText.current;
        charArray["attempts"]++;
        charArray["status"] = charEvaluation;
        if (charEvaluation === "character-wrong") charArray["mistakes"]++;
        tempGameText[0][gameSession.gameSessionIndex["sentence"]][
            gameSession.gameSessionIndex["word"]
        ][gameSession.gameSessionIndex["char"]] = charArray;
        gameSession.gameText.current = tempGameText;
    };

    /**
     * Updates the previous index based on the current index
     * @returns {void}
     */
    const updatePrevCharacterArray = (): void => {
        let charToUpdateIndex = gameController.getPrevIndex(
            gameSession.gameSessionIndex
        );
        gameText[charToUpdateIndex["sentence"]][charToUpdateIndex["word"]][
            charToUpdateIndex["char"]
        ].status = "";
    };
    /**
     * Returns the previous index based on the current index
     * @param {GameSessionIndexObject} textIndex - the current index
     * @returns {GameSessionIndexObject}
     */
    const getPrevIndex = (
        textIndex: GameSessionIndexObject
    ): GameSessionIndexObject => {
        let tempTextIndex = { ...textIndex };
        if (tempTextIndex.char === 0) {
            // If first word of sentence
            if (tempTextIndex.word === 0) {
                // If not first sentence of text move back to previous sentence to the last word,
                // o the last character, adjust index and remove style
                if (tempTextIndex.sentence !== 0) {
                    tempTextIndex.sentence--;
                    tempTextIndex.word =
                        gameText[tempTextIndex["sentence"]].length - 1;
                    tempTextIndex.char =
                        gameText[tempTextIndex["sentence"]][
                            tempTextIndex["word"]
                        ].length - 1;
                } else {
                    return tempTextIndex;
                }
                // If not first word of sentence move back to the previous word to the last character,
                // adjust index and remove style
            } else {
                tempTextIndex.word--;
                tempTextIndex.char =
                    gameText[tempTextIndex["sentence"]][tempTextIndex["word"]]
                        .length - 1;
            }
            // If not first character of word move back to the previous character,
            // adjust index and remove style
        } else {
            tempTextIndex.char = tempTextIndex.char - 1;
        }
        return tempTextIndex;
    };

    /**
     * Returns an object representing the game controller with all the necessary functions and states
     * utilizing the gameSession context
     */
    const gameController: GameControllerObject = {
        runGame: runGame,
        endGame: endGame,
        pauseGame: pauseGame,
        gameIsRunning: gameIsRunning,
        gameSessionIndex: gameSession.gameSessionIndex,
        setGameIsRunning: gameSession.setGameIsRunning,
        setGameSessionIndex: gameSession.setGameSessionIndex,
        getCurrentChracterArray: getCurrentChracterArray,
        evaluateCharacterInput: evaluateCharacterInput,
        updateCharacterArray: updateCharacterArray,
        advanceToNextCharacter: advanceToNextCharacter,
        revertToPreviousCharacter: revertToPreviousCharacter,
        getPrevIndex: getPrevIndex,
        updatePrevCharacterArray: updatePrevCharacterArray,
        isGameFinished: isGameFinished,
    };

    return gameController;
};
