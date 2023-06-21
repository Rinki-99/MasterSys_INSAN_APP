import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import MenuScreen from './Screens/MenuScreen';
import PresenceScreen from './Screens/PresenceScreen';
import CotisationScreen from './Screens/CotisationScreen';
import SemestreCotisationScreen from './Screens/SemestreCotisationScreen';
import PresenceActiviteDateScreen from './Screens/PresenceActiviteDateScreen';

const Stack = createNativeStackNavigator(); // Crée une pile de navigation native

export default function App() {
  return (
    <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Presence" component={PresenceScreen} />
        <Stack.Screen name="Cotisation" component={CotisationScreen} />
        <Stack.Screen name="SemestreCotisation" component={SemestreCotisationScreen} />
        <Stack.Screen name="PresenceActiviteDate" component={PresenceActiviteDateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
