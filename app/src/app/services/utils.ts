import type { Match } from '../../types'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

export const groupMatchByDate = (matches: Match[]): Record<string, Match[]> => {
  return matches.reduce((group: Record<string, Match[]>, match: Match) => {
    const date = format(match.startDate, 'PPPP', { locale: frLocale })

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
