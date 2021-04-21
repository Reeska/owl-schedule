import React from 'react'
import styled from 'styled-components'
import logo from '../public/owl.png'

import ScheduleContainer from './app/ScheduleContainer'
import { secondaryColor } from './app/design/common'

const AppTemplate = styled.div`
  height: 100%;
`

const Main = styled.main`
  font-size: 20px;
`

const Title = styled.h1`
  text-transform: uppercase;
  background: #464646;
  width: fit-content;
  margin: 40px auto;
  padding: 10px 50px;
  border-radius: 10px;
  font-weight: normal;
  text-align: center;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${secondaryColor};

    img {
      height: 40px;
      margin-right: 10px;
    }

    span:nth-of-type(1) {
      color: white;
      font-weight: bold;
    }
  }

`

const Legal = styled.p`
  text-align: center;
  padding: 50px 0;
`

const App = () => {
  return (
    <AppTemplate>
      <header>
        <Title>
          <a href="/">
            <img src={logo} alt=""/>
            <div>
              <span>Overwatch League</span> Schedule
            </div>
          </a>
        </Title>
      </header>

      <Main>
        <ScheduleContainer/>
      </Main>

      <footer>
        <Legal>Overwatch &copy; {new Date().getFullYear()} Blizzard</Legal>
      </footer>
    </AppTemplate>
  )
}

export default App
