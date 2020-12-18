import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PermissionsAndroid} from 'react-native';

// Import Component Bottom Tabs
import HomeStacks from './HomeStacks';
import PostNews from './PostNews';
import ProfileStacks from './ProfileStacks';

const Bottom = createBottomTabNavigator();

export class BottomTabs extends Component {
  componentDidMount() {
    this.getPermission();
  }

  getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        Object.values(granted).every(() => PermissionsAndroid.RESULTS.GRANTED)
      ) {
        console.log('Permissions granted');
      } else {
        console.log('Permissions denied');
      }
    } catch (e) {
      console.warn(e);
    }
  };
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
