import { renderHook, act} from '@testing-library/react';
import { useGameSession, GameSessionProvider } from '../../contexts';
import { describe, it, expect, beforeEach } from 'vitest';
import { afterEach } from 'node:test';


describe('Testing the gameSession context', () => {
    let gameSessionMock: any;
    let unmountHook: any;
    beforeEach(() => {
        const { result, unmount } = renderHook(() => useGameSession(), {
            wrapper: ({ children }) => (
                <GameSessionProvider targetText={'Test text'}>
                    {children}
                </GameSessionProvider>
            ),
        });
        gameSessionMock = result;
        unmountHook = unmount;
    });

    afterEach(() => {
        gameSessionMock = null;
        unmountHook()
    });

    it('should confirm the init values and function types of main values', () => {
        let gameSessionMockCurrent = gameSessionMock.current;
        // Assert initial values
        expect(gameSessionMockCurrent.gameIsRunning).toBe(false);
        expect(gameSessionMockCurrent.gameText.current).toBe('Test text');
        expect(gameSessionMockCurrent.gameSessionIndex).toEqual({ sentence: 0, word: 0, char: 0 });
        expect(gameSessionMockCurrent.gameTotalIndex.current).toBe(0);


        // Assert that timer functions are set up correctly
        expect(gameSessionMockCurrent.timer.elapsedTime).toBe(0);
        expect(gameSessionMockCurrent.timer.isRunning).toBe(false);
        expect(typeof gameSessionMockCurrent.timer.handleStart).toBe('function');
        expect(typeof gameSessionMockCurrent.timer.handlePause).toBe('function');
        expect(typeof gameSessionMockCurrent.timer.handleReset).toBe('function');

    });

    it('should test if state updates when calling starter setters', () => {
        let gameSessionMockCurrent = gameSessionMock.current;
            act( () => {
                gameSessionMockCurrent.setGameSessionIndex({ sentence: 1, word: 2, char: 3 });
                gameSessionMockCurrent.setGameIsRunning(true);
            });
            
            expect(gameSessionMock.current.gameSessionIndex).toEqual({ sentence: 1, word: 2, char: 3 });
            expect(gameSessionMock.current.gameIsRunning).toBe(true);
    });
        
});