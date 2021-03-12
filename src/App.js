
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenA from './ScreenA';
import ScreenB from './ScreenB';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Screen_A') {
              iconName = 'autoprefixer';
              size = focused ? 25 : 20;
              // color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Screen_B') {
              iconName = 'btc';
              size = focused ? 25 : 20;
              // color = focused ? '#f0f' : '#555';
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}
        tabBarOptions={{
          activeTintColor: '#f0f',
          inactiveTintColor: '#555',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#999',
          showLabel: true,
          labelStyle: { fontSize: 14 },
          showIcon: true,
        }}
        activeColor='#f0edf6'
        inactiveColor='#3e2465'
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen
          name="Screen_A"
          component={ScreenA}
          options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen
          name="Screen_B"
          component={ScreenB}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;