import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@theme_preference';

export const lightColors = {
  background: '#0081f1',
  surface: '#ffffff',
  surfaceVariant: '#fafafa',
  text: '#222222',
  textSecondary: '#4d4c4c',
  textOnBackground: '#ffffff',
  textSubtle: 'rgba(255,255,255,0.85)',
  primary: '#0081f1',
  border: '#dddddd',
  placeholder: '#aaaaaa',
  error: '#c0392b',
  errorBg: '#fdecea',
  success: '#27ae60',
  successBg: '#eafaf1',
  tabBar: '#ffffff',
  tabBarActive: '#0081f1',
  tabBarInactive: '#999999',
  inputText: '#222222',
  label: '#333333',
  movieTitle: '#0081f1',
  shadow: '#000000',
};

export const darkColors = {
  background: '#0d1117',
  surface: '#161b22',
  surfaceVariant: '#1c2128',
  text: '#c9d1d9',
  textSecondary: '#8b949e',
  textOnBackground: '#c9d1d9',
  textSubtle: 'rgba(201,209,217,0.75)',
  primary: '#58a6ff',
  border: '#30363d',
  placeholder: '#6e7681',
  error: '#ff7b72',
  errorBg: '#2d1717',
  success: '#56d364',
  successBg: '#0d2b1a',
  tabBar: '#161b22',
  tabBarActive: '#58a6ff',
  tabBarInactive: '#6e7681',
  inputText: '#c9d1d9',
  label: '#8b949e',
  movieTitle: '#58a6ff',
  shadow: '#000000',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme() ?? Appearance.getColorScheme() ?? 'light';
  const [themeMode, setThemeModeState] = useState('system');

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((saved) => {
      if (saved) setThemeModeState(saved);
    });
  }, []);

  const setThemeMode = useCallback(async (mode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem(THEME_KEY, mode);
  }, []);

  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme deve ser usado dentro do ThemeProvider');
  return ctx;
}
