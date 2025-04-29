import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import LoginScreen from './screens/LoginScreen';
import VerifyScreen from './screens/VerificationScreen';

export type RootStackParamList = {
  Login: undefined;
  Verify: { email: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Verify" component={VerifyScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
        <Toast />
      </>
    </NavigationContainer>
  );
}
