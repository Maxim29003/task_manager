import {View, Button, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Task} from '../types/task';
import TasksList from '../components/TasksList';
import {useState} from 'react';

const HomeScreen = () => {
  const tasks: Task[] = useSelector((state: RootState) => state.tasks.tasks);
  const [statusSort, setStatusSort] = useState<
    'All' | 'Progress' | 'Completed' | 'Cancelled'
  >('All');

  return (
    <View style={styles.container}>
      <View style={styles.filterButtons}>
        <Button
          title="All"
          onPress={() => setStatusSort('All')}
          color="#6C757D"
        />

        <Button
          title="In Progress"
          onPress={() => setStatusSort('Progress')}
          color="#FFC107"
        />

        <Button
          title="Completed"
          onPress={() => setStatusSort('Completed')}
          color="#28A745"
        />

        <Button
          title="Cancelled"
          onPress={() => setStatusSort('Cancelled')}
          color="#DC3545"
        />
      </View>

      <TasksList tasksArray={tasks} statusSort={statusSort} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default HomeScreen;
