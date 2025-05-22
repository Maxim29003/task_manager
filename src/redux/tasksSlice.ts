import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task} from '../types/task';

export type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [
    {
      id: '1',
      title: 'Task 1',
      description: 'Task 1 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 1',
      status: 'Progress',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Task 2 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 2',
      status: 'Completed',
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Task 3 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 3',
      status: 'Cancelled',
    },
    {
      id: '4',
      title: 'Task 4',
      description: 'Task 4 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 4',
      status: 'Progress',
    },
    {
      id: '5',
      title: 'Task 5',
      description: 'Task 5 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 5',
      status: 'Completed',
    },
    {
      id: '6',
      title: 'Task 6',
      description: 'Task 6 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 6',
      status: 'Cancelled',
    },
    {
      id: '7',
      title: 'Task 7',
      description: 'Task 7 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 7',
      status: 'Progress',
    },
    {
      id: '8',
      title: 'Task 8',
      description: 'Task 8 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 8',
      status: 'Completed',
    },
    {
      id: '9',
      title: 'Task 9',
      description: 'Task 9 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 9',
      status: 'Cancelled',
    },
    {
      id: '10',
      title: 'Task 10',
      description: 'Task 10 description',
      completed: '2025-05-21T14:30:00.000Z',
      location: 'Location 10',
      status: 'Progress',
    },
  ],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    
    updateTask: (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      },

  },
});

export const {addTask, deleteTask, updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;
