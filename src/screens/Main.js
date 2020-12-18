import React, {useEffect} from 'react';
import {Root} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

// Import pages
import WelcomeScreen from './Welcome';
import Signup from './Signup';
import Login from './Login';

// Import Bottom Tabs
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const Main = () => {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
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
              options={{
                headerTitle: false,
                headerStyle: {backgroundColor: '#ffffff', elevation: 0},
              }}
              name="Signup"
              component={Signup}
            />
            <Stack.Screen
              options={{
                headerTitle: false,
                headerStyle: {backgroundColor: '#ffffff', elevation: 0},
              }}
              name="Login"
              component={Login}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="BottomTabs"
              component={BottomTabs}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Root>
  );
};

export default Main;
