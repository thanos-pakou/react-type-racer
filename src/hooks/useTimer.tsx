import { useState, useRef } from 'react';

/**
 * Interface for the timer object
 */
export interface TimerObject {
    elapsedTime: number;
    isRunning: boolean;
    handleStart: () => void;
    handlePause: () => void;
    handleReset: () => void;
}
/**
 * Custom hook to handle timer functionality 
 * @param { number } initialState - initial state of the timer
 * @returns { TimerObject } - returns the timer object { elapsedTime, isRunning, handleStart, handlePause, handleReset
 */
export const useTimer = (initialState: number = 0): TimerObject => {
    const [elapsedTime, setElapsedTime] = useState(initialState);
    const [isRunning, setIsRunning] = useState(false);
    const countRef = useRef<NodeJS.Timeout | number | null>(null);

    /*
    * Function to handle start of the timer
    */
    const handleStart = () => {
        const startTime = Date.now() - elapsedTime;
        countRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 10);
        setIsRunning(true);
    }

    /*
    * Function to handle pause of the timer
    */
    const handlePause = () => {
        if(countRef.current != null) {
            clearInterval(countRef.current);
        }
        setIsRunning(false);
    }

    /*
    * Function to handle reset of the timer
    */
    const handleReset = () => {
        if(countRef.current != null) {
            clearInterval(countRef.current);
        }
        setIsRunning(false);
        setElapsedTime(0);
    }

    return { elapsedTime, isRunning, handleStart, handlePause, handleReset };
}
