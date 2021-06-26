import React from 'react'
import styled from 'styled-components'

import type { Match } from '../../../types/types'
import { groupMatchByDate } from '../services/match.utils'

import UiMatch from './UiMatch'

const MatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #0000004d;
  padding: 17px;
  border-radius: 13px;
`

export interface UiMatchGroupProps {
  matches: Match[];
  spoiler?: boolean;
  showStatus?: boolean;
}

const UiMatchGroup = ({
  matches,
  spoiler = false,
  showStatus = false,
}: UiMatchGroupProps) => {
  const group = groupMatchByDate(matches)
  const dates = Object.keys(group)

  return (
    <div>
      {dates.map(date => (
        <MatchList key={date}>
          <strong>{date}</strong>
          {group[date].map((match: Match) => (
            <UiMatch
              key={match.id}
              {...match}
              spoiler={spoiler}
              showStatus={showStatus}
            />
          ))}
        </MatchList>
      ))}
    </div>
  )
}

export default UiMatchGroup
