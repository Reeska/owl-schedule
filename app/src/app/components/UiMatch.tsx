import React, {
  Fragment,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import { Tooltip } from '@material-ui/core'

import type { Match } from '../../../types/types'
import {
  onDesktop,
  onMobile,
} from '../../common/design/common'
import { format } from '../utils/date.utils'

const STATUS_COLOR: Record<string, string> = {
  CONCLUDED: '#26e826',
  PENDING: 'gray',
  IN_PROGRESS: 'orange',
}

const MatchWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  ${onMobile(`
    justify-content: space-between;
  `)}
`

const MatchTitle = styled.strong`
  > span {
    align-items: center;
    gap: 10px;
  }

  .mobile {
    display: flex;
  }

  .desktop {
    display: none;
  }

  ${onDesktop(`
    .mobile {
      display: none;
    }

    .desktop {
      display: flex;
    }
  `)}
`

const MatchDate = styled.span`
  width: 52px;
`

const MatchTooltip = styled(Tooltip).attrs({
  title: 'Toggle score for this match',
  arrow: true,
})``

const Info = styled.span<{ status: Match['status'] | 'Masked' }>`
  width: 85px;
  text-align: center;

  ${onDesktop(`
    margin-left: auto;
  `)}

  ${({ status }) => css`
    color: ${STATUS_COLOR[status]};
    border-color: ${STATUS_COLOR[status]};
  `};

  ${({ status }) => status !== 'PENDING' && css`
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.18);
    }
  `};
`

const Status = styled(Info)`
  border: 1px solid;
  border-radius: 5px;
  font-size: 11px;
  padding: 3px;
`

const Score = styled(Info)`
  font-size: 18px;
  padding: 0 3px;
  border: 1px solid transparent;
`

const Logo = styled.img`
  width: 22px;
  background-color: white;
  border-radius: 50%;
`

export interface MatchProps extends Match {
  spoiler?: boolean;
  showStatus?: boolean;
}

const UiMatch = ({
  title,
  shortTitle,
  status,
  scores,
  startDate,
  spoiler,
  showStatus,
  teams,
}: MatchProps) => {
  const [ localSpoiler, setLocalSpoiler ] = useState(false)
  const date = format(startDate, 'p')
  const [ logoA, logoB ] = teams.map(team => team.logo)
  const hasScore = scores.length
  const showScore = hasScore && (spoiler || localSpoiler)

  const toggleLocalSpoiler = () => (
    hasScore && setLocalSpoiler(prevLocalSpoiler => !prevLocalSpoiler)
  )

  const ScoreWrapper = hasScore ? MatchTooltip : Fragment

  return (
    <MatchWrapper>
      <MatchDate>{date}</MatchDate>

      <MatchTitle>
        <span className="desktop">
          {title}
        </span>
        <span className="mobile">
          <Logo src={logoA}/>
          {shortTitle}
          <Logo src={logoB}/>
        </span>
      </MatchTitle>

      {showStatus ? (
        <ScoreWrapper>
          {showScore ? (
            <Score status={status} onClick={toggleLocalSpoiler}>{`${scores[0]} - ${scores[1]}`}</Score>
          ) : (
            <Status status={status} onClick={toggleLocalSpoiler}>{status}</Status>
          )}
        </ScoreWrapper>
      ):(
        <Status status="Masked">MASKED</Status>
      )}
    </MatchWrapper>
  )
}

export default UiMatch
