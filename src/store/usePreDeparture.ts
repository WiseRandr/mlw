import uuid from 'react-native-uuid';
import create from 'zustand';
import { PreDepartureType } from '../types';

export const usePreDeparture = create<{
  data: PreDepartureType[]
}>((set) => ({
  data: [
    { id: uuid.v4() as string, name: 'GMDSS GOC', nationality: 'RUS, 6533/5563', optional: true, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'GMDSS GOC', nationality: 'RUS, 6533/5563', optional: true, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'GMDSS GOC', nationality: 'RUS, 6533/5563', optional: true, category: 'stcw-national', status: 'completed' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), optional: false, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), optional: false, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), optional: false, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), optional: false, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), optional: false, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), optional: false, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), optional: false, category: 'stcw-national', status: 'pending' },
    { id: uuid.v4() as string, name: 'Vaccination Certificate', nationality: 'RUS, 697-076/22-01C', issue_date: new Date('2022-04-22'), exp_date: new Date('2022-04-22'), optional: false, category: 'stcw-national', status: 'completed' },
  ]
}));
