import create from 'zustand';
import { MyCheckListType } from '../types';
import uuid from 'react-native-uuid';

export const useMyChecklist = create<{
  myChecklist: MyCheckListType[],
  pushToChecklist: (input: MyCheckListType) => void,
  removeFromChecklist: (input: MyCheckListType) => void,
}>((set) => ({
  myChecklist: [
    { id: uuid.v4(), name: 'Restaurants to visit in France', createdAt: new Date('2022-11-17'), items: [{ id: uuid.v4(), name: 'La Parfait'}], status: 'to-do' },
    { id: uuid.v4(), name: 'Things to do in german', createdAt: new Date('2022-11-16'), items: [{ id: uuid.v4(), name: 'Visit the park', status: 'to-do' }] }
  ] as MyCheckListType[],
  pushToChecklist: (input: MyCheckListType) => set((state) => {
    if (state.myChecklist.find((c) => c.id === input.id)) return state;
    return { ...state, myChecklist: [...state.myChecklist, input] }
  }),
  removeFromChecklist: (input: MyCheckListType) => set((state) => {
    return ({ ...state, myChecklist: state.myChecklist.filter((c) => c.id !== input.id) })
  })
}));
