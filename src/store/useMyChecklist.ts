import create from 'zustand';
import { MyCheckListType } from '../types';
import uuid from 'react-native-uuid';
import { TaskType } from '../types/task.type';

export const useMyChecklist = create<{
  myChecklist: MyCheckListType[],
  pushToChecklist: (input: MyCheckListType) => void,
  removeFromChecklist: (input: MyCheckListType) => void,
  pushTask: (checklistId: string, task: TaskType) => void,
  updateTask: (checklistId: string, taskId: string, data: { status: 'to-do' | 'completed' }) => void,
  deleteTask: (checklistId: string, taskId: string) => void,
}>((set) => ({
  myChecklist: [
    { id: uuid.v4(), name: 'Restaurants to visit in France', createdAt: new Date('2022-11-17'), items: [{ id: uuid.v4(), name: 'La Parfait', status: 'to-do' }, { id: uuid.v4(), name: 'Completed task', status: 'completed' }] },
    { id: uuid.v4(), name: 'Things to do in german', createdAt: new Date('2022-11-16'), items: [{ id: uuid.v4(), name: 'Visit the park', status: 'to-do' }] }
  ] as MyCheckListType[],
  pushToChecklist: (input: MyCheckListType) => set((state) => {
    if (state.myChecklist.find((c) => c.id === input.id)) return state;
    return { ...state, myChecklist: [...state.myChecklist, input] }
  }),
  removeFromChecklist: (input: MyCheckListType) => set((state) => {
    return ({ ...state, myChecklist: state.myChecklist.filter((c) => c.id !== input.id) })
  }),
  pushTask: (checklistId: string, task: TaskType) => set((state) => {
    return { ...state, myChecklist: state.myChecklist.map((ch) => ({ ...ch, items: ch.id === checklistId ? [...ch.items, task] : ch.items })) }
  }),
  updateTask: (checklistId: string, taskId: string, data: { status: 'to-do' | 'completed' }) => set((state) => {
    return { ...state, myChecklist: state.myChecklist.map((ch) => ({ ...ch, items: ch.id === checklistId ? ch.items.map((ci) => ({ ...ci, status: ci.id === taskId ? data.status : ci.status })) : ch.items })) }
  }),
  deleteTask: (checklistId: string, taskId: string) => set((state) => {
    return { ...state, myChecklist: state.myChecklist.map((ch) => ({ ...ch, items: ch.id === checklistId ? ch.items.filter((i) => i.id !== taskId) : ch.items })) };
  }),
}));
