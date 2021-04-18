import type { Match as MatchApi, WeekSchedule as WeekScheduleApi } from 'owl-schedule-api';

export interface WeekSchedule extends Omit<WeekScheduleApi, 'matches'> {
  matches: Match[]
}

export interface Match extends Omit<MatchApi, 'startDate'> {
  startDate: Date;
}

export interface WeekOptions {
  weekStartsOn: DayNumber;
}

export type DayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6
