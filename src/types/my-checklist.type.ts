import { TaskType } from "./task.type";

export interface MyCheckListType {
  id: string;
  name: string;
  createdAt: Date;
  items: TaskType[]; 
}