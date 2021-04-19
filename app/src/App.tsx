import React from 'react'
import './App.css'
import ScheduleContainer from './app/ScheduleContainer'

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Overwatch League Schedule</h1>
      </header>
      <main>
        <ScheduleContainer/>
      </main>
    </div>
  )
}

export default App
