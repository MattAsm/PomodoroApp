import './timer.css';
import React, { useState, useEffect, useRef } from 'react';

function Timer({ time }) {
    const [isRunning, setIsRunning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(Number(time) * 60 * 1000);

    const intervalRef = useRef(null);
    const endTimeRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                const newTimeRemaining = endTimeRef.current - Date.now();
                setTimeRemaining(newTimeRemaining > 0 ? newTimeRemaining : 0);
                if (newTimeRemaining <= 0) {
                    setIsRunning(false);
                    clearInterval(intervalRef.current);
                }
            }, 100);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    function start() {
        endTimeRef.current = Date.now() + timeRemaining;
        setIsRunning(!isRunning);
    }

    function formatTime() {
        let minutes = Math.floor(timeRemaining / (1000 * 60));
        let seconds = Math.floor((timeRemaining / 1000) % 60);

        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }

    return (
        <div id='timerBox'>
            <h1 id='centerText'>{formatTime()}</h1>
            <div id='buttons'>
                <button onClick={start}>{isRunning ? "Pause" : "Start"}</button>
            </div>
        </div>
    );
}

export default Timer;