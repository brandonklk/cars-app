import { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

interface DismissKeyboardViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  behavior?: 'height' | 'position' | 'padding';
  lightColor?: string;
  darkColor?: string;
}

export function DismissKeyboardView({
  children,
  style,
  className,
  behavior = Platform.OS === 'ios' ? 'padding' : undefined,
  lightColor,
  darkColor,
}: DismissKeyboardViewProps) {
  const { background: backgroundColor } = useThemeColor({ light: lightColor, dark: darkColor }, ['background']);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[{ backgroundColor }, style]}
        className={className}
        behavior={behavior}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
