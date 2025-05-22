import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import TaskItem from './TaskItem';
import {Task} from '../types/task';
import {TaskStatus} from '../types/taskStatus';

type TasksListProps = {
  tasksArray: Task[];
  statusSort?: TaskStatus | 'All';
};

const TasksList: React.FC<TasksListProps> = ({
  tasksArray,
  statusSort = 'All',
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (statusSort === 'All') {
      setTasks(tasksArray);
    } else {
      if (tasksArray.length != 0) {
        const filtered = tasksArray.filter(task => task.status === statusSort);
        setTasks(filtered);
      } else {
        setTasks([]);
      }
    }
  }, [statusSort, tasksArray]);

  return (
    <SafeAreaView style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks available</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={({item}) => <TaskItem task={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default TasksList;
