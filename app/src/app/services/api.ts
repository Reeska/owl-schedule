import type { Match as MatchApi, WeekSchedule as WeekScheduleApi } from 'owl-schedule-api'
import type { Match, WeekSchedule } from '../../../types/types'
import { useQuery } from 'react-query'

const API_URL = import.meta.env.SNOWPACK_PUBLIC_API_URL

export const getSchedule = async (week: number): Promise<WeekSchedule> => {
  return (await fetch(`${API_URL}/schedule?week=${week}`)).json().then(mapSchedule)
}

const mapSchedule = (schedule: WeekScheduleApi): WeekSchedule => ({
  ...schedule,
  matches: schedule.matches.map(mapMatch)
})

const mapMatch = (match: MatchApi): Match => ({
  ...match,
  startDate: new Date(match.startDate)
})

export const useSchedule = (week: number) => (
  useQuery(
    ['schedule', week],
    () => getSchedule(week)
  )
)
