
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/UserProfile';
import MyDetails from '../screens/MyDetails';
import Logout from '../screens/Logout';
import ForgotPassword from '../screens/ForgotPassword';
import PrivacyPolicyScreen from '../screens/PrivacyPolicy';
import TermsAndConditionsScreen from '../screens/TermsAndConditions';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name='Dashboard' component={HomeScreen} options={{ headerShown: "none" }} />
      <Drawer.Screen name='Profile' component={Profile} options={{ headerShown: "none" }} />
      <Drawer.Screen name='Entry Details' component={MyDetails} options={{ headerShown: "none" }} />
      <Drawer.Screen name='Privacy Policy' component={PrivacyPolicyScreen} options={{ headerShown: "none" }} />
      <Drawer.Screen
        name='Terms & Conditions '
        component={TermsAndConditionsScreen}
        options={{ headerShown: "none" }}
      />
      <Drawer.Screen name='Logout' component={Logout} options={{ headerShown: "none" }} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false, animation: "none" }}/>
        <Stack.Screen name='SignupScreen' component={SignupScreen} options={{ headerShown: false, animation: "none" }}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ headerShown: false, animation: "none" }}/>
        <Stack.Screen name='Root' component={Root} options={{ headerShown: false, animation: "none" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
