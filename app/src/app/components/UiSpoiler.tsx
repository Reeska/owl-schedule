import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Switch } from '@material-ui/core'
import { secondaryColor } from '../../common/design/common'

const Spoiler = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: initial;
`

const StyledSwitch = styled(Switch)`
  .MuiSwitch-colorSecondary.Mui-checked {
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
  children?: ReactNode;
}

const UiSpoiler = ({
  show = false,
  onChange,
  className,
  children,
}: UiSpoilerProps) => {
  return (
    <Spoiler className={className}>
      <label>
        {children}
        <StyledSwitch
          checked={show}
          onChange={() => onChange(!show)}
          color="secondary"
        />
      </label>
    </Spoiler>
  )
}

export default UiSpoiler
