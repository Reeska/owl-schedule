export interface WeekSchedule {
  name: string;
  matches: Match[];
}

export interface Match {
  id: string;
  title: string;
  shortTitle: string;
  status: string;
  startDate: string;
  scores: [number, number] | []
}
