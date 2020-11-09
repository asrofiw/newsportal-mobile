import React from 'react';
import {Root} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import pages
import WelcomeScreen from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Main = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth.isLogin);
  return (
    <Root>
      <NavigationContainer>
        {!auth.isLogin ? (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="WelcomeScreen"
              component={WelcomeScreen}
            />
            <Stack.Screen
              options={{headerTitle: false, headerTransparent: true}}
              name="Signup"
              component={Signup}
            />
            <Stack.Screen
              options={{headerTitle: false, headerTransparent: true}}
              name="Login"
              component={Login}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Root>
  );
};

export default Main;
