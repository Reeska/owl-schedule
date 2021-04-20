import React from 'react'
import styled from 'styled-components'
import { Switch } from '@material-ui/core'
import { secondaryColor } from '../design/common'

const Spoiler = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: initial;
`

const StyledSwitch = styled(Switch)`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: ${secondaryColor};

    + .MuiSwitch-track {
      background-color: ${secondaryColor};
    }
  }
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
        <StyledSwitch
          checked={show}
          onChange={() => onChange(!show)}
          color="primary"
        />
      </label>
    </Spoiler>
  )
}

export default UiSpoiler
