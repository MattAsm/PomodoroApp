import { useState, useRef, useEffect } from 'react'
import './App.css'
import TimerComponent from './components/timer.jsx'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import questionMark from './assets/questionMark.svg';

function App() {

  const [time, setTime] = useState(25);
  const [notificationMessage, setNotificationMsssage] = useState("Timer completed");
  const [type, setType] = useState("Work");

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
  
    function timeSelect(x, color, notifMessage, type){
    document.documentElement.style.setProperty('--dynamic-color', color);
    setNotificationMsssage(notifMessage);
    setTime(x);
    setType(type);
  }
  
  function helpDisplay(){
    const help = document.getElementById("help");
    help.style.display = help.style.display === "block" ? "none" : "block";
}

  return (
    <>
      <Header/>
      <main>
        <div id='timeSelect'>
          <button onClick={() => timeSelect(25, '#fff9a6', "Time for a break! 🙏", "Work")}>Work</button>
          <button onClick={() => timeSelect(5, '#f7c6c2', "Let's get back to work! 💪", "Short Break")}>Short Break</button>
          <button onClick={() => timeSelect(15, '#81d1ff', "Let's get it done! 😤", "Long Break")}>Long Break</button>
        </div>
        <TimerComponent time={time} type={type} sendWebNotification={sendWebNotification} notificationMessage={notificationMessage}/>
        {/*This should be hidden until question mark is clicked*/}
        <div id='help'>
          <h1>What is pomodoro?</h1>
          <h3>A technique for studying or working that is designed to increase 
              focus by following short bursts of work with small breaks.</h3>
          <h1>How do I use this technique?</h1>
          <h3>Every 25 minutes of work, you want to follow up with a short 5 minute break, this
            is known as a cycle. After 3 - 4 cycles you want to take a long 15 minute break instead.
          </h3>
          <h5>That means every 1.5 - 2 hours you want to take a long break.</h5>
        </div>

        {/*<div id='tracker'>
          <h3>Work Cycles: 0</h3>
          <h3>Short Break Cycles: 0</h3>
          <h3>Long Break Cycles: 0</h3>
        </div>*/}
      </main>
      <img src={questionMark} alt="Question mark icon" title='What is Pomodoro' id='questionMark' onClick={helpDisplay}/>
    <Footer/>
    </>
  )
}

export default App