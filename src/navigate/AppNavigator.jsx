import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import TablesScreen from '../screens/TablesScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitle:"", headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="TablesScreen" component={TablesScreen} />
            <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
