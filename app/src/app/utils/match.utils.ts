import { getWeek } from 'date-fns'

import type { Match } from '../../../types/types'
import type { WeekOptions } from '../../../types/types'

import { format } from './date.utils'

export const groupMatchByDate = (matches: Match[]): Record<string, Match[]> => {
  return matches.reduce((group: Record<string, Match[]>, match: Match) => {
    const date = format(match.startDate, 'PPPP')

    return {
      ...group,
      [date]: [
        ...(group[date] ?? []),
        match
      ],
    }
  }, {})
}

const OWL_STARTED_WEEK = 15
const WEEK_START_ON_TUESDAY: WeekOptions = { weekStartsOn: 2 }

export const getCurrentWeek = (): number => (
  getWeek(new Date(), WEEK_START_ON_TUESDAY) - OWL_STARTED_WEEK
)
