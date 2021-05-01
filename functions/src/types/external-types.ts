import {
  MatchStatus,
  Team,
} from './common'

export interface ExternalWeekSchedule {
  name: string;
  events: [ExternalEvent]
}

export interface ExternalEvent {
  matches: ExternalMatch[]
}

export interface ExternalMatch {
  id: string;
  status: MatchStatus;
  startDate: string;
  endDate: string;
  competitors: [Team, Team];
  scores: [number, number] | [];
  isEncore: boolean;
}
