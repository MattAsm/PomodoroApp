import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TimerComponent from './components/timer.jsx'

function App() {

  return (
    <>
      <TimerComponent time={25}/>
    </>
  )
}

export default App
