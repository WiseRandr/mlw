import create from 'zustand';
import { MyCheckListType } from '../types';

export const useMyChecklist = create<{
  myChecklist: MyCheckListType[],
  pushToChecklist: (input: MyCheckListType) => void,
  removeFromChecklist: (input: MyCheckListType) => void,
}>((set) => ({
  myChecklist: [
    { id: 1, name: 'Restaurants to visit in France', createdAt: new Date('2022-11-17'), items: ['La Parfait'] },
    { id: 2, name: 'Things to do in german', createdAt: new Date('2022-11-16'), items: ['Visit the park'] }
  ] as MyCheckListType[],
  pushToChecklist: (input: MyCheckListType) => set((state) => {
    if (state.myChecklist.find((c) => c.id === input.id)) return state;
    return { ...state, myChecklist: [...state.myChecklist, input] }
  }),
  removeFromChecklist: (input: MyCheckListType) => set((state) => ({ ...state, myChecklist: state.myChecklist.filter(c => c .id !== input.id) }))
}));