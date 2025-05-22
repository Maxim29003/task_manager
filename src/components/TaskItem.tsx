import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Task} from '../types/task';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../redux/tasksSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {formatDate, getStatusColor} from '../utils/taskUtils';

type RootStackParamList = {
  TaskForm: {
    mode: 'create' | 'update';
    task?: Task;
  };
  TaskDetails: {
    task: Task;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({task}: TaskItemProps) => {
  useEffect(() => {
    console.log(task);
  }, []);

  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();

  function deleteHandler(id: string) {
    dispatch(deleteTask(id));
  }

  function updateHandler(task: Task) {
    navigation.navigate('TaskForm', {mode: 'update', task: task});
  }

  function detailsHandler(task: Task) {
    navigation.navigate('TaskDetails', {task: task});
  }

  return (
    <TouchableOpacity
      onPress={() => detailsHandler(task)}
      style={[styles.taskCard, {borderLeftColor: getStatusColor(task.status)}]}>
      <View style={styles.cardHeader}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(task.status)},
          ]}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Icon name="calendar" size={15} color="#6C757D" />
        <Text style={styles.dateText}>{formatDate(task.completed)}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => updateHandler(task)}>
          <Icon name="edit" size={18} color="#4E9F3D" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteHandler(task.id)}>
          <Icon name="delete" size={18} color="#D32F2F" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 13,
    color: '#6C757D',
    marginLeft: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 6,
    marginLeft: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
});

export default TaskItem;
