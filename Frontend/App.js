import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/scenes/homepage';
import showStore from './src/scenes/showStore';
import Login from './src/scenes/login';
import Signup from './src/scenes/signup';
import UserAccountScreen from './src/scenes/userAccountScreen';
import createStore from './src/scenes/createStore';
import storePage from './src/scenes/storePage';
import editUser from './src/scenes/editUser';
import Navbar from './src/components/navbar';
import Header from './src/components/header';
import editStore from './src/scenes/editStore';
import DataProvider from './src/context';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Header />
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="showStore"
            component={showStore}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="createStore"
            component={createStore}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="storePage"
            component={storePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="editUser"
            component={editUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="editStore"
            component={editStore}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="perfil"
          component={UserAccountScreen}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;