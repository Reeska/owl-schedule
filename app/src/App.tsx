import React from 'react'
import styled from 'styled-components'

import './App.css'
import ScheduleContainer from './app/ScheduleContainer'
import { secondaryColor } from './app/design/common'

const Title = styled.h1`
  text-transform: uppercase;
  background: #464646;
  width: fit-content;
  margin: 40px auto;
  padding: 10px 50px;
  border-radius: 10px;
  font-weight: normal;
  color: ${secondaryColor};

  span {
    color: white;
    font-weight: bold;
  }
`

const Legal = styled.p`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
`

const App = () => {
  return (
    <div className="App">
      <header>
        <Title>
          <span>Overwatch League</span> Schedule
        </Title>
      </header>
      <main>
        <ScheduleContainer/>
      </main>
      <footer>
        <Legal>Overwatch &copy; {new Date().getFullYear()} Blizzard</Legal>
      </footer>
    </div>
  )
}

export default App
