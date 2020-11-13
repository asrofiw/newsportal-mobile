import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// Import pages
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';

const ProfileStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileRoot"
        component={Profile}
      />
      <Stack.Screen
        options={{headerTransparent: true, headerTitle: false}}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{headerTransparent: true, headerTitle: false}}
        name="ChangePassword"
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};

export default ProfileStacks;
