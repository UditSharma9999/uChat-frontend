import React from 'react';
import { LogBox } from 'react-native';
import ChatRoom from './src/ChatRoom';
import SearchScreen from './src/SearchScreen';
import SignIn from './src/SignIn';
import SignUp from './src/SignUp';
import Chat from './src/Chat';

LogBox.ignoreLogs(['Warning:...']); //For Reamoving Warnnings
LogBox.ignoreAllLogs();  //For Reamoving Warnnings


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const App =() => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        
        initialRouteName='SignUp'
      >
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />        
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route  }) => ({
            title: route.params.SenderData.name + " " + route.params.SenderData.lname // Chat title 
           })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
