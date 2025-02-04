import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

// Screen imports
import SignInScreen from "./src/screens/SignInScreen";
import MapScreen from "./src/screens/MapScreen";
import MainScreen from "./src/screens/MainScreen";
import GeneralRegistrationScreen from "./src/screens/GeneralRegistrationScreen";
import CompanyRegistrationScreen from "./src/screens/CompanyRegistrationScreen";
import PracticeHomeScreen from "./src/screens/PracticeHomeScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PracticeHome">
        <Stack.Screen name="PracticeHome" component={PracticeHomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="GeneralRegistration" component={GeneralRegistrationScreen} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



