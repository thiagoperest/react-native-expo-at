import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { SessionProvider } from './context/SessionContext';
import { ThemeProvider } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
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
