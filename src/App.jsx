import { useState, useRef, useEffect } from 'react'
import './App.css'
import TimerComponent from './components/timer.jsx'

function App() {

  const [time, setTime] = useState(25);

  function timeSelect(x, color){
    document.documentElement.style.setProperty('--dynamic-color', color);
    setTime(x);
  }

  return (
    <>
    <div id='timeSelect'>
      <button onClick={() => timeSelect(25, '#fff9a6')}>Work/Study</button>
      <button onClick={() => timeSelect(5, '#f7c6c2')}>Short Break</button>
      <button onClick={() => timeSelect(15, '#81d1ff')}>Long Break</button>
    </div>
    <TimerComponent time={time}/>
    </>
  )
}

export default App