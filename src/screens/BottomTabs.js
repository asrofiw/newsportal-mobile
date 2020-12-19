import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PermissionsAndroid} from 'react-native';

// Import Component Bottom Tabs
import HomeStacks from './HomeStacks';
import PostNews from './PostNews';
import ProfileStacks from './ProfileStacks';
import Search from './Search';

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
      <Bottom.Navigator
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'grey',
          keyboardHidesTabBar: true,
          tabStyle: {
            paddingVertical: 10,
          },
          style: {
            height: 70,
          },
        }}>
        <Bottom.Screen
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            ),
          }}
          name="Home"
          component={HomeStacks}
        />
        <Bottom.Screen
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Icon name="magnify" size={size} color={color} />
            ),
          }}
          name="Search"
          component={Search}
        />
        <Bottom.Screen
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Icon
                name={focused ? 'plus-circle' : 'plus-circle-outline'}
                size={size}
                color={color}
              />
            ),
          }}
          name="Post"
          component={PostNews}
        />
        <Bottom.Screen
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Icon
                name={focused ? 'account' : 'account-outline'}
                size={size}
                color={color}
              />
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
