import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// Import pages
import Home from './Home';
import News from './News';

const HomeStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: 'NewsPortal',
          headerTitleAlign: 'center',
        }}
        name="HomeRoot"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerTitle: 'NewsPortal',
          headerTitleAlign: 'center',
        }}
        name="News"
        component={News}
      />
    </Stack.Navigator>
  );
};

export default HomeStacks;
