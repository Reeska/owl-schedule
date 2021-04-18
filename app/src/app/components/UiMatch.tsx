import React from 'react'
import styled, { css } from 'styled-components'
import type { Match } from '../../types'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

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

const MatchDate = styled.span`
  width: 180px;
`

const Status = styled.span<{ status: string }>`
  padding: 3px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 11px;
  margin-left: auto;

  ${({ status }) => css`
    color: ${STATUS_COLOR[status]};
    border-color: ${STATUS_COLOR[status]};
  `};
`

const Score = styled(Status)``

export interface MatchProps extends Match {
  spoiler?: boolean;
}

const UiMatch = ({
  title,
  status,
  scores,
  startDate,
  spoiler,
}: MatchProps) => {
  const date = format(startDate, 'EEE dd LLL, HH:mm', { locale: frLocale })

  return (
    <MatchWrapper>
      <MatchDate>{date}</MatchDate>
      <strong>{title}</strong>
      {scores.length && spoiler ? (
        <Score status={status}>{`${scores[0]} - ${scores[1]}`}</Score>
      ) : (
        <Status status={status}>{status}</Status>
      )}
    </MatchWrapper>
  )
}

export default UiMatch
