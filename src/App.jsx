import { useState, useRef, useEffect } from 'react'
import './App.css'
import TimerComponent from './components/timer.jsx'

function App() {

  const [time, setTime] = useState(25);
  const [notificationMessage, setNotificationMsssage] = useState("Timer completed");

  function sendWebNotification(title, body, iconURL) {
    if (!("Notification" in window)) {
        alert("This browser doesn't support desktop notifications :(");
        return;
    }

    if (Notification.permission === "granted") {
        new Notification(title, { body: body, icon: iconURL, requireInteraction: true });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification(title, { body: body, icon: iconURL, requireInteraction: true  });
            }
        });
    }
  }

  useEffect(() => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission !== "granted") {
                console.log("Notifications not granted.");
            }
        });
    }
}, []);
  
    function timeSelect(x, color, notifMessage){
    document.documentElement.style.setProperty('--dynamic-color', color);
    setNotificationMsssage(notifMessage);
    setTime(x);
  }

  return (
    <>
    <div id='timeSelect'>
      <button onClick={() => timeSelect(25, '#fff9a6', "Time for a break!")}>Work/Study</button>
      <button onClick={() => timeSelect(5, '#f7c6c2', "Let's get back to work! 💪")}>Short Break</button>
      <button onClick={() => timeSelect(15, '#81d1ff', "Let's get it done! 😤")}>Long Break</button>
    </div>
    <TimerComponent time={time} sendWebNotification={sendWebNotification} notificationMessage={notificationMessage}/>
    </>
  )
}

export default App