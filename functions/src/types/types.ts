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
  scores: [number, number] | []
}

export type MatchStatus = 'PENDING' | 'IN_PROGRESS' | 'CONCLUDED'
