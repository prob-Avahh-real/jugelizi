import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ChestnutProvider } from './src/store/ChestnutContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ChestnutProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppNavigator />
        </NavigationContainer>
      </ChestnutProvider>
    </SafeAreaProvider>
  );
}
