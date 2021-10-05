import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/scenes/homepage';
import showStore from './src/scenes/showStore';
import Login from './src/scenes/login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomePage}
        />
        <Stack.Screen
          name="showStore"
          component={showStore}
        />
        <Stack.Screen
          name="login"
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;