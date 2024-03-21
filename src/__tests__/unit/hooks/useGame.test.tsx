import { renderHook, act, cleanup } from "@testing-library/react";

import { useGame } from "@/hooks";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { gameSessionContext, GameSessionObject } from "@/contexts";

// Creating the useGame mock context values
const mockContextValues: GameSessionObject = {
    gameText: {
        current: [
            [
                [
                    [
                        {
                            character: "T",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "e",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "s",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "t",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: " ",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                    ],
                    [
                        {
                            character: "t",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "e",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "x",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "t",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: ".",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                    ],
                ],
                [
                    [
                        {
                            character: "T",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "e",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "s",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "t",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: " ",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                    ],
                    [
                        {
                            character: "t",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "e",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "x",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: "t",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                        {
                            character: ".",
                            status: "",
                            mistakes: 0,
                            timestamp: [],
                            attempts: 0,
                        },
                    ],
                ],
            ],
            20,
        ],
    },
    gameSessionIndex: { sentence: 0, word: 0, char: 0 },
    setGameSessionIndex: vi.fn(),
    gameIsRunning: true,
    setGameIsRunning: vi.fn(),
    gameTotalIndex: { current: 19 },
    timer: {
        elapsedTime: 0,
        isRunning: false,
        handleStart: vi.fn(),
        handlePause: vi.fn(),
        handleReset: vi.fn(),
    },
};

/**
 * Testing the useGame hook
 */
describe("Testing the useGame hook init values", () => {
    it("should confirm the init values and function types of main values", () => {
        const { result, unmount } = createGameHook(
            useGame,
            gameSessionContext.Provider,
            mockContextValues
        );

        expect(typeof result.current.runGame).toBe("function");
        expect(typeof result.current.endGame).toBe("function");
        expect(typeof result.current.pauseGame).toBe("function");
        expect(typeof result.current.gameIsRunning).toBe("function");
        expect(typeof result.current.setGameIsRunning).toBe("function");
        expect(result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 0,
        });
        expect(typeof result.current.setGameSessionIndex).toBe("function");
        expect(typeof result.current.getCurrentChracterArray).toBe("function");
        expect(typeof result.current.evaluateCharacterInput).toBe("function");
        expect(typeof result.current.advanceToNextCharacter).toBe("function");
        expect(typeof result.current.revertToPreviousCharacter).toBe(
            "function"
        );
        expect(typeof result.current.getPrevIndex).toBe("function");
        expect(typeof result.current.updatePrevCharacterArray).toBe("function");
        expect(typeof result.current.isGameFinished).toBe("function");
        unmount();
        cleanup();
    });
});

/**
 *  Testing the game controllers functions one by one trying to mock the gameSessionContext
 * and all other non related functions
 */
describe("Testing the game Controllers functions", async () => {
    afterEach(() => {
        cleanup();
        vi.resetAllMocks();
        vi.clearAllMocks();
    });

    /**
     * Test to check if the gameIsRunning is changed whenever runGame, pauseGame, endGame is called
     */
    it("should change gameIsRunning whenever runGame, pauseGame is called", () => {
        let tempMockValues = { ...mockContextValues };
        const { result, unmount } = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        expect(result.current.setGameIsRunning).toHaveBeenCalledTimes(0);
        act(() => {
            result.current.runGame();
        });

        expect(result.current.setGameIsRunning).toHaveBeenCalledTimes(1);
        expect(result.current.setGameIsRunning).toHaveBeenCalledWith(true);

        act(() => {
            result.current.pauseGame();
        });

        expect(result.current.setGameIsRunning).toHaveBeenCalledTimes(2);

        expect(result.current.setGameIsRunning).toHaveBeenCalledWith(false);

        act(() => {
            result.current.runGame();
        });

        expect(result.current.setGameIsRunning).toHaveBeenCalledTimes(3);
        expect(result.current.setGameIsRunning).toHaveBeenCalledWith(true);

        act(() => {
            result.current.endGame();
        });

        expect(result.current.setGameIsRunning).toHaveBeenCalledTimes(4);
        expect(result.current.setGameIsRunning).toHaveBeenCalledWith(false);
        unmount();
    });

    /**
     * Test to check if the gameIsRunning function returns the correct value
     */
    it(" should return if game is running from gameSession", () => {
        let tempMockValues = { ...mockContextValues };
        const { result, unmount } = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        expect(result.current.gameIsRunning()).toBe(true);
        tempMockValues = { ...mockContextValues, gameIsRunning: false };
        const gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        expect(gameHookMock.result.current.gameIsRunning()).toBe(false);
        unmount();
    });

    /**
     * Test to check if the isGameFinished function returns the correct value based on the gameTotalIndex
     */
    it("should return true or false as index is at the last char or not when isGameFinishedIsCalled", () => {
        let tempMockValues = {
            ...mockContextValues,
            gameTotalIndex: { current: 18 },
        };

        // rerender hook with different totalIndexValue
        let gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        expect(gameHookMock.result.current.isGameFinished()).toBe(false);
        gameHookMock.unmount();

        tempMockValues = {
            ...mockContextValues,
            gameTotalIndex: { current: 19 },
        };

        // rerender hook with different totalIndexValue
        gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        expect(gameHookMock.result.current.isGameFinished()).toBe(true);
        gameHookMock.unmount();
    });

    /**
     * Test to check if the gameSessionIndex is updated correctly when advanceToNextCharacter is called
     */
    it("should move to the next character when advanceToNextCharacter is called", () => {
        let tempMockValues = { ...mockContextValues };
        let gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 0,
        });
        console.log(mockContextValues.gameTotalIndex.current);
        let tempTotalIndex = tempMockValues.gameTotalIndex.current;
        act(() => {
            gameHookMock.result.current.advanceToNextCharacter();
        });

        expect(tempMockValues.gameTotalIndex.current).toBe(tempTotalIndex + 1);
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 1,
        });
        act(() => {
            for (
                let i = 1;
                i < tempMockValues.gameText.current[0][0][0].length;
                i++
            ) {
                expect(
                    gameHookMock.result.current.gameSessionIndex
                ).toStrictEqual({
                    sentence: 0,
                    word: 0,
                    char: i,
                });
                gameHookMock.result.current.advanceToNextCharacter();
            }
        });
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 1,
            char: 0,
        });
        gameHookMock.unmount();
        // Modifying the gameSessionIndex to check what happens when we reach the end of a sentence
        tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 0, word: 1, char: 4 },
        };

        // rerender hook with different ganeSessionIndex to check what happens
        // when we reach the end of the sentence
        gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        act(() => {
            gameHookMock.result.current.advanceToNextCharacter();
        });
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 1,
            word: 0,
            char: 0,
        });
        gameHookMock.unmount();
        // Modifying the gameSessionIndex to check what happens when we reach the end of the game
        tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 1, word: 1, char: 4 },
        };
        gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        act(() => {
            gameHookMock.result.current.advanceToNextCharacter();
        });
        // gameSessuionIndex should not change
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 1,
            word: 1,
            char: 4,
        });

        gameHookMock.unmount();
    });

    /**
     * Test to check if the getCurrentChracterArray returns the correct character
     * based on the gameSessionIndex
     */
    it("should return the correct character calling the getCurrentChracterArray \
        object based on the gameSessionIndex", () => {
        // Modifying the gameSessionIndex to check what happens when we reach the end of a sentence
        let tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 0, word: 0, char: 0 },
        };

        let gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );

        expect(
            gameHookMock.result.current.getCurrentChracterArray()
        ).toStrictEqual({
            character: "T",
            status: "",
            mistakes: 0,
            timestamp: [],
            attempts: 0,
        });
        act(() => {
            gameHookMock.result.current.advanceToNextCharacter();
        });
        expect(
            gameHookMock.result.current.getCurrentChracterArray()
        ).toStrictEqual({
            character: "e",
            status: "",
            mistakes: 0,
            timestamp: [],
            attempts: 0,
        });
        gameHookMock.unmount();
    });

    it("should revert to the previous character when revertToPreviousCharacter is called", () => {
        let tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 0, word: 0, char: 1 },
        };
        let gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );

        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 1,
        });

        let tempTotalIndex = tempMockValues.gameTotalIndex.current;

        act(() => {
            gameHookMock.result.current.revertToPreviousCharacter();
        });
        expect(tempMockValues.gameTotalIndex.current).toBe(tempTotalIndex - 1);
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 0,
        });
        gameHookMock.unmount();

        tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 0, word: 1, char: 0 },
        };
        gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        act(() => {
            gameHookMock.result.current.revertToPreviousCharacter();
        });
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 4,
        });
        gameHookMock.unmount();
        tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 1, word: 0, char: 0 },
        };
        gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        act(() => {
            gameHookMock.result.current.revertToPreviousCharacter();
        });
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 1,
            char: 4,
        });
        gameHookMock.unmount();

        tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 0, word: 0, char: 0 },
        };
        gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        act(() => {
            gameHookMock.result.current.revertToPreviousCharacter();
        });
        expect(gameHookMock.result.current.gameSessionIndex).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 0,
        });
        gameHookMock.unmount();
    });

    /**
     * Test to check if the evaluateCharacterInput returns the correct string
     * based on the character status
     */
    it("should return the correct string when evaluateCharacterInput is called", () => {
        let tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 0, word: 0, char: 0 },
        };
        let gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        expect(
            gameHookMock.result.current.evaluateCharacterInput("T", {
                character: "T",
                status: "",
                mistakes: 0,
                timestamp: [],
                attempts: 0,
            })
        ).toBe("character-correct");
        expect(
            gameHookMock.result.current.evaluateCharacterInput("e", {
                character: "e",
                status: "",
                mistakes: 0,
                timestamp: [],
                attempts: 0,
            })
        ).toBe("character-correct");
        expect(
            gameHookMock.result.current.evaluateCharacterInput("x", {
                character: "X",
                status: "",
                mistakes: 0,
                timestamp: [],
                attempts: 0,
            })
        ).toBe("character-wrong");
        expect(
            gameHookMock.result.current.evaluateCharacterInput("X", {
                character: "X",
                status: "",
                mistakes: 1,
                timestamp: [],
                attempts: 0,
            })
        ).toBe("character-corrected");
        gameHookMock.unmount();
    });

    /**
     * Test to check if the character array is updated correctly when updateCharacterArray is called
     */
    it("should update the character array when updateCharacterArray is called", () => {
        let tempMockValues = {
            ...mockContextValues,
            gameSessionIndex: { sentence: 0, word: 0, char: 0 },
        };
        let gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );
        act(() => {
            gameHookMock.result.current.updateCharacterArray(
                "character-correct",
                {
                    character: "T",
                    status: "",
                    mistakes: 0,
                    timestamp: [],
                    attempts: 0,
                }
            );
        });
        expect(tempMockValues.gameText.current[0][0][0][0]).toStrictEqual({
            character: "T",
            status: "character-correct",
            mistakes: 0,
            timestamp: [],
            attempts: 1,
        });

        act(() => {
            gameHookMock.result.current.updateCharacterArray(
                "character-corrected",
                {
                    character: "T",
                    status: "",
                    mistakes: 2,
                    timestamp: [],
                    attempts: 5,
                }
            );
        });
        expect(tempMockValues.gameText.current[0][0][0][0]).toStrictEqual({
            character: "T",
            status: "character-corrected",
            mistakes: 2,
            timestamp: [],
            attempts: 6,
        });

        act(() => {
            gameHookMock.result.current.updateCharacterArray(
                "character-wrong",
                {
                    character: "T",
                    status: "",
                    mistakes: 2,
                    timestamp: [],
                    attempts: 5,
                }
            );
        });
        expect(tempMockValues.gameText.current[0][0][0][0]).toStrictEqual({
            character: "T",
            status: "character-wrong",
            mistakes: 3,
            timestamp: [],
            attempts: 6,
        });
        gameHookMock.unmount();
    });

    /**
     * Test to check if the previous character array is updated correctly
     * when updatePrevCharacterArray is called
     */
    it("should update the the previous character array when updatePrevCharacterArray is called", () => {
        let tempMockValues = {
            ...mockContextValues,
        };
        tempMockValues.gameText.current[0][0][0][1] = {
            character: "e",
            status: "character-correct",
            mistakes: 0,
            timestamp: [],
            attempts: 1,
        };
        let gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );

        gameHookMock.result.current.getPrevIndex = vi.fn().mockReturnValue({
            sentence: 0,
            word: 0,
            char: 1,
        });
        let sentence = 0;
        let word = 0;
        let char = 1;
        expect(gameHookMock.result.current.getPrevIndex).toHaveBeenCalledTimes(
            0
        );
        expect(
            tempMockValues.gameText.current[0][sentence][word][char]
        ).toStrictEqual({
            character: "e",
            status: "character-correct",
            mistakes: 0,
            timestamp: [],
            attempts: 1,
        });
        act(() => {
            gameHookMock.result.current.updatePrevCharacterArray();
        });
        expect(gameHookMock.result.current.getPrevIndex).toHaveBeenCalledTimes(
            1
        );
        expect(
            tempMockValues.gameText.current[0][sentence][word][char]
        ).toStrictEqual({
            character: "e",
            status: "",
            mistakes: 0,
            timestamp: [],
            attempts: 1,
        });
        gameHookMock.unmount();
    });

    /**
     * Test to check if the getPrevIndex returns the correct index
     */
    it("should return the previous index when getPrevIndex is called", () => {
        let tempMockValues = {
            ...mockContextValues,
        };
        let gameHookMock = createGameHook(
            useGame,
            gameSessionContext.Provider,
            tempMockValues
        );

        expect(
            gameHookMock.result.current.getPrevIndex({
                sentence: 0,
                word: 0,
                char: 2,
            })
        ).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 1,
        });
        expect(
            gameHookMock.result.current.getPrevIndex({
                sentence: 0,
                word: 2,
                char: 0,
            })
        ).toStrictEqual({
            sentence: 0,
            word: 1,
            char: 4,
        });

        expect(
            gameHookMock.result.current.getPrevIndex({
                sentence: 1,
                word: 0,
                char: 0,
            })
        ).toStrictEqual({
            sentence: 0,
            word: 1,
            char: 4,
        });

        expect(
            gameHookMock.result.current.getPrevIndex({
                sentence: 0,
                word: 0,
                char: 0,
            })
        ).toStrictEqual({
            sentence: 0,
            word: 0,
            char: 0,
        });
        gameHookMock.unmount();
    });
});

/**
 * Helper function to create the game hook with the gameSessionContextProvider
 * @param useGameHook
 * @param GameSessionContextProvider
 * @param initialValues
 * @returns
 */
const createGameHook = (
    useGameHook: any,
    GameSessionContextProvider: any,
    initialValues = {}
) => {
    const { result, unmount } = renderHook(() => useGameHook(), {
        wrapper: ({ children }) => (
            <GameSessionContextProvider value={initialValues}>
                {children}
            </GameSessionContextProvider>
        ),
    });

    return { result, unmount };
};
