import type { Match as MatchApi, WeekSchedule as WeekScheduleApi } from 'owl-schedule-api'
import type { Match, WeekSchedule } from '../../types'

const API = 'http://localhost:5000'

export const getSchedule = async (week: number): Promise<WeekSchedule> => {
  return (await fetch(`${API}/schedule?week=${week}`)).json().then(mapSchedule)
}

const mapSchedule = (schedule: WeekScheduleApi): WeekSchedule => ({
  ...schedule,
  matches: schedule.matches.map(mapMatch)
})

const mapMatch = (match: MatchApi): Match => ({
  ...match,
  startDate: new Date(match.startDate)
})
