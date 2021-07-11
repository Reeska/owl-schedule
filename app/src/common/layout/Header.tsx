import React from 'react'
import logo from '../../../public/images/owl.png'
import styled from 'styled-components'
import {
  onDesktop,
  secondaryColor,
} from '../design/common'

const Title = styled.h1`
  text-transform: uppercase;
  width: fit-content;
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
      color: #282c34;
      font-weight: bold;
    }
  }

  ${onDesktop(`
    margin: 40px auto;
  `)}
`

const Header = () => (
  <header>
    <Title>
      <a href="/">
        <img src={logo} alt=""/>
        <div>
          <span>OWL</span> Schedule
        </div>
      </a>
    </Title>
  </header>
)

export default Header
