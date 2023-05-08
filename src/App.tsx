import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPostman from './components/LoginPostman';
import HomeScreenPostman from './components/HomeScreenPostman';
import Home from './screen/Home';
import Bottom from './screen/Bottom';
import Register from './components/Register';
import Splash from './screen/Splash';
import DetailProduck from './screen/DetailProduck';

export type RootStackParams = {
  Register: undefined;
  login: undefined;
  HomePostman: undefined;
  Bottom: undefined;
  Splash: undefined;
  Detail: {no_id: number};
};
const Stack = createNativeStackNavigator<RootStackParams>();
const App = () => {
  // return <Bottom />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Bottom"
          component={Bottom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={LoginPostman}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomePostman"
          component={HomeScreenPostman}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailProduck}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({});
