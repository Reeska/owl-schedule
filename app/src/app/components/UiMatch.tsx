import React, {
  Fragment,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import { Tooltip } from '@material-ui/core'

import type { Match } from '../../../types/types'
import { breakpoint } from '../design/common'
import { format } from '../services/date.utils'

const STATUS_COLOR: Record<string, string> = {
  CONCLUDED: '#26e826',
  PENDING: 'gray',
  IN_PROGRESS: 'orange',
}

const MatchWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`

const MatchTitle = styled.strong`
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

const Info = styled.span<{ status: Match['status'] }>`
  margin-left: auto;

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
  padding: 3px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 11px;
`

const Score = styled(Info)`
  font-size: 18px;
  margin-left: auto;
`

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
