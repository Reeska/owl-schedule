export type MatchStatus = 'PENDING' | 'IN_PROGRESS' | 'CONCLUDED'

export interface Team {
  id: string;
  name: string;
  abbreviatedName: string;
  icon: string;
  logo: string;
}
