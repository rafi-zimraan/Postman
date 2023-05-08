import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import Option from './Option';
import Profile from './Profile';

const Bottom = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {height: 70},

        tabBarIcon: ({focused, size, color}) => {
          let iconImage: any;
          if (route.name === 'Home') {
            iconImage = focused ? 'home-variant' : 'home-variant';
            color = focused ? '#6C70EB' : 'gray';
            size = focused ? size + 12 : size + 5;
          } else if (route.name === 'Option') {
            iconImage = focused ? 'email-open' : 'email-open';
            color = focused ? '#6C70EB' : 'gray';
            size = focused ? size + 12 : size + 5;
          } else if (route.name === 'Profile') {
            iconImage = focused
              ? 'account-circle-outline'
              : 'account-circle-outline';
            color = focused ? '#6C70EB' : 'gray';
            size = focused ? size + 12 : size + 5;
          }
          return <Icon name={iconImage} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Option" component={Option} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Bottom;
