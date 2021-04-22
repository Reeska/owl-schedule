import React, {
  Fragment,
  useState,
} from 'react'
import styled, { css } from 'styled-components'

import type { Match } from '../../../types/types'
import { breakpoint } from '../design/common'
import { format } from '../services/date.utils'
import { Tooltip } from '@material-ui/core'

const STATUS_COLOR: Record<string, string> = {
  CONCLUDED: '#26e826',
  PENDING: 'gray',
  IN_PROGRESS: 'orange',
}

const MatchWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
`

const MatchTitle = styled.strong`
  width: 65%;
  text-align: center;

  .mobile {
    display: inline;
  }

  .desktop {
    display: none;
  }

  @media screen and (min-width: ${breakpoint}px) {
    .mobile {
      display: none;
    }

    .desktop {
      display: inline;
    }
  }
`

const MatchDate = styled.span``

const MatchTooltip = styled(Tooltip).attrs({
  title: 'Toggle score for this match',
  arrow: true,
})``

const Status = styled.span<{ status: Match['status'] }>`
  padding: 3px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 11px;

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

const Score = styled(Status)``

export interface MatchProps extends Match {
  spoiler?: boolean;
}

const UiMatch = ({
  title,
  shortTitle,
  status,
  scores,
  startDate,
  spoiler,
}: MatchProps) => {
  const [localSpoiler, setLocalSpoiler] = useState(false)
  const date = format(startDate, 'p')
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
        <span className="desktop">{title}</span>
        <span className="mobile">{shortTitle}</span>
      </MatchTitle>

      <ScoreWrapper>
        {showScore ? (
          <Score status={status} onClick={toggleLocalSpoiler}>{`${scores[0]} - ${scores[1]}`}</Score>
        ) : (
          <Status status={status} onClick={toggleLocalSpoiler}>{status}</Status>
        )}
      </ScoreWrapper>
    </MatchWrapper>
  )
}

export default UiMatch
