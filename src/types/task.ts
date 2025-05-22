import {TaskStatus} from './taskStatus';

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: string;
  location: string;
  status: TaskStatus;
};
