import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Component Bottom Tabs
import HomeStacks from './HomeStacks';
import PostNews from './pages/PostNews';
import ProfileStacks from './ProfileStacks';

const Bottom = createBottomTabNavigator();

export class BottomTabs extends Component {
  render() {
    return (
      <Bottom.Navigator>
        <Bottom.Screen
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
          name="Home"
          component={HomeStacks}
        />
        <Bottom.Screen
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Icon name="plus-box" size={size} color={color} />
            ),
          }}
          name="Post"
          component={PostNews}
        />
        <Bottom.Screen
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Icon name="account" size={size} color={color} />
            ),
          }}
          name="Profile"
          component={ProfileStacks}
        />
      </Bottom.Navigator>
    );
  }
}

export default BottomTabs;
