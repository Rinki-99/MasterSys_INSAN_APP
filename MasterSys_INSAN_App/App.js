import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    <NavigationContainer> {/* Conteneur de navigation pour gérer la navigation dans l'application */} 
      <Stack.Navigator>   {/* Navigateur de pile pour gérer la navigation entre les écrans */}
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} /> {/* Écran "Login" sans en-tête */}
        <Stack.Screen name="Menu" component={MenuScreen} />  {/* Écran "Menu" */ }
        <Stack.Screen name="Presence" component={PresenceScreen} /> // {/* Écran "Presence" */ }
        <Stack.Screen name="Cotisation" component={CotisationScreen} /> // {/* Écran "Cotisation" */ }
        <Stack.Screen name="SemestreCotisation" component={SemestreCotisationScreen} /> // {/* Écran "SemestreCotisation" */ }
        <Stack.Screen name="PresenceActiviteDate" component={PresenceActiviteDateScreen} /> // {/* Écran "PresenceActiviteDate" */ }
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