import React from 'react'
import styled from 'styled-components'

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
`

export interface UiNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const Button = styled.button`
  border: 1px solid #0000004d;
  background: #0000004d;
  padding: 5px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background: #000000;
  }
`

const PreviousButton = styled(Button)`
  &:before {
    content: '⇦️';
    padding-right: 10px;
  }
`

const NextButton = styled(Button)`
  &:after {
    content: '⇨️';
    padding-left: 10px;
  }
`

const UiNavigation = ({
  onPrevious,
  onNext,
}: UiNavigationProps) => {
  return (
    <Navigation>
      <PreviousButton onClick={onPrevious}>Previous</PreviousButton>
      <NextButton onClick={onNext}>Next</NextButton>
    </Navigation>
  )
}

export default UiNavigation
