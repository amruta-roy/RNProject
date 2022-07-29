import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Screens/Login/Login';
import SignUp from './src/Screens/Login/SignUp';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;