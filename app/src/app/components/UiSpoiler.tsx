import React from 'react'
import styled from 'styled-components'
import { Switch } from '@material-ui/core'

const Spoiler = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: initial;
`

export interface UiSpoilerProps {
  show: boolean;
  onChange: (show: boolean) => void;
  className?: string;
}

const UiSpoiler = ({
  show = false,
  onChange,
  className,
}: UiSpoilerProps) => {
  return (
    <Spoiler className={className}>
      <label>
        Show score
        <Switch
          checked={show}
          onChange={() => onChange(!show)}
          color="primary"
        />
      </label>
    </Spoiler>
  )
}

export default UiSpoiler
