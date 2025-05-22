import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {CreateTaskForm} from '../types/createTaskForm';
import {Picker} from '@react-native-picker/picker';
import {Task} from '../types/task';
import {useDispatch} from 'react-redux';
import {addTask, updateTask} from '../redux/tasksSlice';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export type TaskFormProps = {
  mode: 'create' | 'update';
  task?: Task;
};

export const TaskForm: React.FC<TaskFormProps> = ({mode, task}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const defaultValues = (mode: 'create' | 'update', task?: Task) => {
    if (mode === 'update' && task) {
      const {id, completed, ...rest} = task;
      return {
        ...rest,
        completed: new Date(completed),
      };
    } else {
      return {
        status: 'Progress',
        completed: new Date(),
      };
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CreateTaskForm>({
    defaultValues: defaultValues(mode, task),
  });

  const onSubmit = (data: CreateTaskForm) => {
    const newTask: Task = {
      id: task ? task.id : uuid.v4(),
      ...data,
      completed: data.completed.toISOString(),
    };

    if (mode === 'create') {
      dispatch(addTask(newTask));
    } else {
      dispatch(updateTask(newTask));
    }

    Alert.alert(
      `${mode === 'create' ? 'Task create' : 'Task update'}`,
      `${mode === 'create' ? 'Task created' : 'Task updated'} ${newTask.title}`,
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Home');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      overScrollMode="never">
      <Text style={styles.title}>
        {mode === 'create' ? 'Create New Task' : 'Update Task'}
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.input, errors.title && styles.errorInput]}
              placeholder="Enter task title"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={styles.errorText}>Title is required</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[
                styles.input,
                styles.multilineInput,
                errors.description && styles.errorInput,
              ]}
              placeholder="Enter task description"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text style={styles.errorText}>Description is required</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Due Date & Time</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <View style={styles.datePickerContainer}>
              <DatePicker
                mode="datetime"
                theme="light"
                date={value}
                onDateChange={onChange}
              />
            </View>
          )}
          name="completed"
        />
        {errors.completed && (
          <Text style={styles.errorText}>Date is required</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.input, errors.location && styles.errorInput]}
              placeholder="Enter task location"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text style={styles.errorText}>Location is required</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Status</Text>
        <Controller
          name="status"
          control={control}
          render={({field: {onChange, value}}) => (
            <View
              style={[
                styles.pickerContainer,
                errors.status && styles.errorInput,
              ]}>
              <Picker
                selectedValue={value}
                style={{ backgroundColor: '#fff', color: '#000'}}
                onValueChange={onChange}
                dropdownIconColor="#666">
                <Picker.Item label="In Progress" value="Progress" />
                <Picker.Item label="Completed" value="Completed" />
                <Picker.Item label="Cancelled" value="Cancelled" />
              </Picker>
            </View>
          )}
        />
        {errors.status && (
          <Text style={styles.errorText}>Status is required</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>
          {mode === 'create' ? 'Create Task' : 'Update Task'}
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    paddingBottom: 20,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 5,
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#4E9F3D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TaskForm;
