import React from 'react';
import {Provider} from 'react-redux'
import store from './store/index'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screen/Home'
import Game from './screen/Game'
import Finish from './screen/Finish'


const Stack = createStackNavigator()


export default function App() {
  

  return (
    <Provider store= {store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component= {Home} />
          <Stack.Screen name="Game" component= {Game} />
          <Stack.Screen name="Finish" component= {Finish} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );




}


