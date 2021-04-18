import type { Match } from '../../types'
import { format } from 'date-fns'

export const groupMatchByDate = (matches: Match[]): Record<string, Match[]> => {
  return matches.reduce((group: Record<string, Match[]>, match: Match) => {
    const date = format(match.startDate, 'P')

    return {
      ...group,
      [date]: [
        ...(group[date] ?? []),
        match
      ],
    }
  }, {})
}

export const getQueryParam = (
  paramName: string,
): null | string => {
  return new URLSearchParams(location.search).get(paramName)
}
