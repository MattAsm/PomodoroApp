import './timer.css';
import React, { useState, useEffect, useRef } from 'react';

function Timer({ time, type, sendWebNotification, notificationMessage }) {
    const [isRunning, setIsRunning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(Number(time) * 60 * 1000);

    const intervalRef = useRef(null);
    const endTimeRef = useRef(null);

    useEffect(() => {
        setTimeRemaining(Number(time) * 60 * 1000);
        setIsRunning(false);
    }, [time]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                const newTimeRemaining = endTimeRef.current - Date.now();
                setTimeRemaining(newTimeRemaining > 0 ? newTimeRemaining : 0);
                if (newTimeRemaining <= 0) {
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    /////////////////// Push notification
                    sendWebNotification("Time's up!", `${notificationMessage}`, "");
                }
            }, 1000);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    function start() {
        if(timeRemaining <= 0){
            setTimeRemaining(Number(time) * 60 * 1000);
            endTimeRef.current = Date.now() + Number(time) * 60 * 1000;
        }
        else{
            endTimeRef.current = Date.now() + timeRemaining;
        }
        setIsRunning(!isRunning);
    }

    function formatTime() {
        let minutes = Math.floor(timeRemaining / (1000 * 60));
        let seconds = Math.ceil((timeRemaining / 1000) % 60);

        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }

    return (
        <div id='timerBox' >
            <h1 id="timeType">{type}</h1>
            <h1 id='centerText'>{formatTime()}</h1>
            <div id='startStopBtn'>
                <button onClick={start}>{isRunning ? "Pause" : "Start"}</button>
            </div>
        </div>
    );
}

export default Timer;