import clsx from 'clsx';
import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

export function ThemedText({
  lightColor,
  darkColor,
  type = 'default',
  className,
  style,
  ...rest
}: ThemedTextProps) {
  const { text: textColor } = useThemeColor({ light: lightColor, dark: darkColor }, ['text']);

  const baseClass = clsx(
    'text-base',
    type === 'title' && 'text-4xl font-bold leading-9',
    type === 'defaultSemiBold' && 'text-base font-semibold leading-6',
    type === 'subtitle' && 'text-xl font-bold leading-7',
    type === 'link' && 'text-base text-blue-600 underline',
    className
  );

  return <Text style={[{ color: textColor }, style]} className={baseClass} {...rest} />;
}
