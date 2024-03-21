import { createContext, useContext, useRef, useState } from "react"
import {useTimer, TimerObject} from "../hooks"
import { textParsingEngine } from "../utils";

// Create a context to handle game session
export const gameSessionContext = createContext({} as GameSessionObject)

/**
 * Interface for the game session object
 * @interface
 */
export interface GameSessionObject {
    gameText: React.MutableRefObject<[Array<Array<Array<{ 
        character: string; status: string; mistakes: number; 
        timestamp: Array<number>; attempts: number; 
    }>>>, number]>;
    gameSessionIndex: GameSessionIndexObject;
    setGameSessionIndex: React.Dispatch<React.SetStateAction<{
        sentence: number; word: number; char: number;
    }>>;
    gameIsRunning: boolean;
    setGameIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    gameTotalIndex: React.MutableRefObject<number>;
    timer: TimerObject;
} 

/**
 * @interface
 */
export interface GameSessionIndexObject {
    sentence: number; 
    word: number; 
    char: number;
} 

/**
 * Game session provider to handle the game session context
 * @param {React.ReactNode} props - children and targetText
 * @returns {React.ReactNode} - returns the game session object { 
 *                              gameText, gameSessionIndex, setgameSessionIndex, 
 *                              gameIsRunning, setGameIsRunning, gameTotalIndex, timer }
 */
export const GameSessionProvider: React.FC<{ children: React.ReactNode; targetText: string }> = ({
        children,
        targetText,
    }) => {
    const [gameIsRunning, setGameIsRunning] = useState(false);
    const gameText = useRef(textParsingEngine(targetText));
    const [gameSessionIndex, setGameSessionIndex] = useState({ sentence: 0, word: 0, char: 0 });
    const gameTotalIndex = useRef(0);
    const { elapsedTime, isRunning, handleStart, handlePause, handleReset } = useTimer();

    return (
        <gameSessionContext.Provider
            value={{
            gameText,
            gameSessionIndex,
            setGameSessionIndex,
            gameIsRunning,
            setGameIsRunning,
            gameTotalIndex,
            timer: { elapsedTime, isRunning, handleStart, handlePause, handleReset },
            }}
        >
        {children}
        </gameSessionContext.Provider>
    );
};

export const useGameSession = () => useContext(gameSessionContext)

exports.GameSessionProvider = GameSessionProvider;
exports.gameSessionContext = gameSessionContext;