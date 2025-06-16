/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#e6e6e6',
    backgroudApp: '#ffffff',
    tint: '#687076',
    iconInative: '#9e9e9e',
    iconActive: '#4b4b4b',
    icon: '#9BA1A6',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    backgroudCard: '#f4f4f4',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    backgroudApp: '#000000',
    iconInative: '#767676',
    iconActive: '#fff',
    icon: '#fff',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    backgroudCard: '#151718',
  },
};
