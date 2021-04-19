import axios from 'axios';
import type { Match, WeekSchedule } from './types/types'
import { ExternalMatch, ExternalWeekSchedule } from './types/external-types'

const OWL_API = 'https://wzavfvwgfk.execute-api.us-east-2.amazonaws.com/production/owl'
const SCHEDULE_API = `${OWL_API}/paginator/schedule`

const headers = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36',
  'x-origin': 'overwatchleague.com',
  'referer': 'https://overwatchleague.com/',
  'origin': 'https://overwatchleague.com',
}

export const getSchedule = async (week: number) => {
  return axios.get(SCHEDULE_API, {
    headers,
    params: {
      stage: 'regular_season',
      page: week,
      season: '2021',
      locale: 'en-us',
    }
  })
}

export const getWeekSchedule = async (week: number): Promise<WeekSchedule> => {
  const response = await getSchedule(week)
  const tableData: ExternalWeekSchedule = response.data.content.tableData
  const matches = tableData.events[0].matches.filter(({ isEncore }) => !isEncore)

  return {
    name: tableData.name,
    matches: matches.map(mapMatch)
  }
}

const mapMatch = (match: ExternalMatch): Match => {
  const title = match.competitors.map(team => team.name).join(' - ')
  const shortTitle = match.competitors.map(team => team.abbreviatedName).join(' - ')

  return {
    id: match.id,
    title,
    shortTitle,
    startDate: new Date(match.startDate).toISOString(),
    status: match.status,
    scores: match.scores,
  }
}
