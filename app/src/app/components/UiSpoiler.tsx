import React from 'react'
import styled from 'styled-components'

const Toggle = styled.input.attrs({
  type: 'range',
  min: 0,
  max: 1,
  step: 1,
})`
  width: 27px;
  cursor: pointer;
`

const Spoiler = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: initial;
`

export interface UiSpoilerProps {
  show: boolean;
  onChange: (show: boolean) => void;
}

const UiSpoiler = ({
  show = false,
  onChange,
}: UiSpoilerProps) => {
  return (
    <Spoiler>
      Show score
      <Toggle
        value={show ? 1 : 0}
        onClick={() => onChange(!show)}
        readOnly
      />
    </Spoiler>
  )
}

export default UiSpoiler
