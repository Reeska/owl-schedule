export interface ExternalWeekSchedule {
  name: string;
  events: [ExternalEvent]
}

export interface ExternalEvent {
  matches: ExternalMatch[]
}

export interface ExternalMatch {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  competitors: ExternalTeam[];
  scores: [number, number] | [];
  isEncore: boolean;
}

export interface ExternalTeam {
  id: string;
  name: string;
  abbreviatedName: string;
  icon: string;
  logo: string;
}
