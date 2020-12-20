import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

// Import pages
import Profile from './Profile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import MyArticles from './MyArticles';
import News from './News';

const ProfileStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileRoot"
        component={Profile}
      />
      <Stack.Screen
        options={{title: 'Edit Profile', headerTitleAlign: 'center'}}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{
          title: 'Change password',
          headerTitleAlign: 'center',
        }}
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        options={{
          title: 'My articles',
          headerTitleAlign: 'center',
        }}
        name="MyArticles"
        component={MyArticles}
      />
      <Stack.Screen
        options={{
          headerTitle: 'My article',
          headerTitleAlign: 'center',
        }}
        name="News"
        component={News}
      />
    </Stack.Navigator>
  );
};

export default ProfileStacks;
