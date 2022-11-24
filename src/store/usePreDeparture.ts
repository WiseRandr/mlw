import uuid from 'react-native-uuid';
import create from 'zustand';
import { PreDepartureType } from '../types';

export const usePreDeparture = create<{
  data: PreDepartureType[],
  updateStatus: (id: string, status: 'pending' | 'completed' | 'skipped') => void,
  submitAttention: (id: string) => void,
  validateAttention: (id: string) => void,
}>((set) => ({
  data: [
    { id: uuid.v4() as string, name: 'Autom. Radar Plotting Aids (ARPA) CERT', nationality: '', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), category: 'stcw-national', status: 'pending', attention_required: true, attention_status: 'required' },
    { id: uuid.v4() as string, name: 'GMDSS GOC', nationality: 'RUS, 6533/5563', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), category: 'stcw-national', status: 'pending', attention_required: true, attention_status: 'required' },
    { id: uuid.v4() as string, name: 'GMDSS GOC', nationality: 'RUS, 6533/5563', category: 'stcw-national', status: 'pending', attention_required: false, attention_status: 'optional' },
    { id: uuid.v4() as string, name: 'GMDSS GOC', nationality: 'RUS, 6533/5563', category: 'stcw-national', status: 'pending', attention_required: false, attention_status: 'auto' },
    { id: uuid.v4() as string, name: 'GMDSS GOC', nationality: 'RUS, 6533/5563', category: 'stcw-national', status: 'completed', attention_required: false, attention_status: 'auto' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), category: 'stcw-national', status: 'pending', attention_required: false, attention_status: 'auto' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), category: 'stcw-national', status: 'pending', attention_required: false, attention_status: 'auto' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), category: 'stcw-national', status: 'pending', attention_required: false, attention_status: 'auto' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), category: 'stcw-national', status: 'pending', attention_required: false, attention_status: 'auto' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), category: 'stcw-national', status: 'pending', attention_required: false, attention_status: 'auto' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), category: 'stcw-national', status: 'completed', attention_required: false, attention_status: 'auto' },
  ],
  updateStatus: (id: string, status: 'pending' | 'completed' | 'skipped') => set((state) => {
    return { ...state, data: state.data.map((d) => id === d.id ? { ...d, status: status } : d) };
  }),
  submitAttention: (id: string) => set((state) => {
    return { ...state, data: state.data.map((d) => id === d.id ? { ...d, attention_status: 'pending' } : d) };
  }),
  validateAttention: (id: string) => set((state) => {
    return { ...state, data: state.data.map((d) => id === d.id ? { ...d, attention_status: 'confirmed', attention_required: false } : d) };
  }),
}));
