export interface PreDepartureType {
  id: string;
  name: string;
  nationality: string;
  issue_date?: Date;
  exp_date?: Date;
  attention_required: boolean;
  category: 'stcw-national' | 'flag-state';
  status: 'pending' | 'completed' | 'skipped';
  attention_status: 'optional' | 'auto' | 'required' | 'pending' | 'confirmed';
}