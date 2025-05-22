import {Task} from './task';

export type CreateTaskForm = Omit<Task, 'id' | 'completed'> & {
  completed: Date;
};
