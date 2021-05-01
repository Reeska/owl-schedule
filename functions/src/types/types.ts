import type {
  MatchStatus,
  Team,
} from './common'

export interface WeekSchedule {
  name: string;
  matches: Match[];
}

export interface Match {
  id: string;
  title: string;
  shortTitle: string;
  status: MatchStatus;
  startDate: string;
  scores: [number, number] | [];
  teams: [Team, Team];
}
