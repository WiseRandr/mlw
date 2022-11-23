export interface PreDepartureType {
  id: string,
  name: string,
  nationality: string,
  issue_date?: Date,
  exp_date?: Date,
  optional: boolean,
  category: 'stcw-national' | 'flag-state',
  status: 'pending' | 'completed' | 'skipped'
}