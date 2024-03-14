import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTimer } from '../../hooks';
import { act } from '@testing-library/react';
import { afterEach } from 'node:test';

describe('Testing the useTimer hook', () => {
    let useTimerMock: any;
    let unmountHook: any;
    beforeEach(() => {
        const { result, unmount } = renderHook(useTimer);
        useTimerMock = result;
        unmountHook = unmount;
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        unmountHook()
    });

    it('should confirm the init values and function types of main values', async () => {
        expect(useTimerMock.current.elapsedTime).toBe(0);
        expect(useTimerMock.current.isRunning).toBe(false);
        expect(typeof useTimerMock.current.handleStart).toBe('function');
        expect(typeof useTimerMock.current.handlePause).toBe('function');
        expect(typeof useTimerMock.current.handleReset).toBe('function');
    });

    it('should start the timer and elapsed time can be retrieved', async () => {
        act(() => {
            // Start the timer
            useTimerMock.current.handleStart();
        });
        expect (useTimerMock.current.isRunning).toBe(true);

        // Advance the timer by 20 seconds
        act(() => {
            vi.advanceTimersByTime(20000);
        });
        expect(useTimerMock.current.elapsedTime).toBe(20000);
    });

    it('should pause the timer and elapsed time should remain the same after some time', async () => {
        const timeIntervalMs = 20000;
        act(() => {
            // Start the timer
            useTimerMock.current.handleStart();
        });
        // Advance the timer by x seconds
        act(() => {
            vi.advanceTimersByTime(timeIntervalMs);
            useTimerMock.current.handlePause();
        });
        expect (useTimerMock.current.isRunning).toBe(false);
        expect(useTimerMock.current.elapsedTime).toBe(timeIntervalMs);

        act(() => {
            // Advance the timer by x seconds
            vi.advanceTimersByTime(timeIntervalMs);
        });

        expect(useTimerMock.current.elapsedTime).toBe(timeIntervalMs);
    });

    it('should run the timer and then reset it and elapsed time should rbe 0', async () => {
        const timeIntervalMs = 20000;
        act(() => {
            // Start the timer
            useTimerMock.current.handleStart();
        });
        expect (useTimerMock.current.isRunning).toBe(true);
        // Advance the timer by x seconds
        act(() => {
            vi.advanceTimersByTime(timeIntervalMs);
        });
        expect(useTimerMock.current.elapsedTime).toBe(timeIntervalMs);

        act(() => {
            useTimerMock.current.handleReset();
        });
        expect (useTimerMock.current.isRunning).toBe(false);
        expect(useTimerMock.current.elapsedTime).toBe(0);
    });
});