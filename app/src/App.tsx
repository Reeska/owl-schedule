import React from 'react'
import styled from 'styled-components'
import logo from '../public/images/owl.png'
import twitterLogo from '../public/images/twitter.png'

import ScheduleContainer from './app/ScheduleContainer'
import {
  onDesktop,
  secondaryColor,
} from './common/design/common'

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
  margin-top: 0;
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

  ${onDesktop(`
    margin: 40px auto;
  `)}
`

const Author = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-decoration: none;
  color: #08abe6;
  width: fit-content;
  margin: 50px auto auto;

  img {
    height: 20px;
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
        <Author href="https://twitter.com/ReeskaFr">
          By Reeska <img src={twitterLogo} alt=""/>
        </Author>
        <Legal>Overwatch &copy; {new Date().getFullYear()} Blizzard</Legal>
      </footer>
    </AppTemplate>
  )
}

export default App
