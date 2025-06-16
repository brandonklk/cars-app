import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Colors } from './Colors';

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: Colors.dark.background,
    card: '#2a2a2a',
    text: Colors.light.text,
    border: '#333333',
    notification: '#ff453a',
  },
};

const CustomLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: Colors.light.background,
    card: '#f8f8f8',
    text: Colors.light.text,
    border: '#ddd',
    notification: '#ff453a',
  },
};

export { CustomDarkTheme, CustomLightTheme };

