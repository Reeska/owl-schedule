import {
  GitHub,
  Twitter,
} from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

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

const Footer = () => (
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
)

export default Footer
