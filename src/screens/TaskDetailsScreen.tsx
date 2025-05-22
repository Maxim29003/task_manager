import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {formatDate, getStatusColor} from '../utils/taskUtils';
import {Task} from '../types/task';

type RootStackParamList = {
  TaskDetails: {
    task: Task;
  };
};

type Props = {
  route: RouteProp<RootStackParamList, 'TaskDetails'>;
};

const TaskDetailsScreen: React.FC<Props> = ({route}) => {
  const {task} = route.params || {};

  return (
    <ScrollView
      style={[styles.taskCard, {borderTopColor: getStatusColor(task.status)}]}>
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

      <View style={styles.infoContainer}>
        <AntDesign
          name="calendar"
          size={18}
          color="#6C757D"
          style={styles.icon}
        />
        <Text style={styles.infoText}>{formatDate(task.completed)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Entypo
          name="location-pin"
          size={18}
          color="#6C757D"
          style={styles.icon}
        />
        <Text style={styles.infoText}>{task.location}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderTopWidth: 4,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  taskTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3436',
    flex: 1,
    lineHeight: 28,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  icon: {
    marginRight: 10,
  },

  infoText: {
    fontSize: 16,
    color: '#636E72',
    flex: 1,
  },

  descriptionContainer: {
    marginTop: 8,
    marginBottom: 16,
  },

  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
  },

  descriptionText: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
    paddingLeft: 4,
  },
});
export default TaskDetailsScreen;
