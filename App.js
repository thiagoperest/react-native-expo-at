import { SafeAreaProvider } from 'react-native-safe-area-context';
import MoviesScreen from './screens/MoviesScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <MoviesScreen />
    </SafeAreaProvider>
  );
}
