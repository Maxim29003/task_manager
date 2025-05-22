import React from 'react';
import TaskForm from '../components/TaskForm';
import {RouteProp} from '@react-navigation/native';
import {Task} from '../types/task';

type RootStackParamList = {
  TaskForm: {
    mode: 'create' | 'update';
    task?: Task;
  };
};

type Props = {
  route: RouteProp<RootStackParamList, 'TaskForm'>;
};

const TaskFormScreen: React.FC<Props> = ({route}) => {
  const {mode, task} = route.params || {};
  return <TaskForm mode={mode || 'create'} task={task} />;
};

export default TaskFormScreen;
