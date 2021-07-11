import React from 'react'
import styled from 'styled-components'

import ScheduleContainer from './app/ScheduleContainer'
import Header from './common/layout/Header'
import Footer from './common/layout/Footer'

const AppTemplate = styled.div`
  height: 100%;
`

const Main = styled.main`
  font-size: 20px;
`

const App = () => {
  return (
    <AppTemplate>
      <Header/>

      <Main>
        <ScheduleContainer/>
      </Main>

      <Footer/>
    </AppTemplate>
  )
}

export default App
