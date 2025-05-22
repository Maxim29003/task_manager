import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable} from 'react-native';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import TaskFormScreen from './screens/TaskFormScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation}) => ({
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate('TaskForm')}>
                    <Icon name="pluscircleo" size={20} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            <Stack.Screen name="TaskForm" component={TaskFormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default App;
