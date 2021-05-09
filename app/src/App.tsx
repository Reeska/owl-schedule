import React from 'react'
import styled from 'styled-components'
import logo from '../public/images/owl.png'
import {
  GitHub,
  Twitter,
} from '@material-ui/icons'

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

const Links = styled.p`
  display: flex;
  align-items: center;
  margin: 50px auto auto;
  width: fit-content;
  gap: 20px;

  svg {
    height: 20px;
  }
`

const Author = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: #08abe6;
`

const Source = styled(Author)`
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
        <Links>
          <Author href="https://twitter.com/ReeskaFr">
            <Twitter /> By Reeska
          </Author>

          <Source href="https://github.com/Reeska/owl-schedule">
            <GitHub/> Fork on Github
          </Source>
        </Links>

        <Legal>Overwatch &copy; {new Date().getFullYear()} Blizzard</Legal>
      </footer>
    </AppTemplate>
  )
}

export default App
