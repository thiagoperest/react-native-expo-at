import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { SessionProvider } from './context/SessionContext';
import { ThemeProvider } from './context/ThemeContext';
import { initializeDb } from './services/database';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    initializeDb();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SessionProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SessionProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
