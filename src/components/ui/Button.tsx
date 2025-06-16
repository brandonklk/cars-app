import { useThemeColor } from '@/hooks/useThemeColor';
import { ReactNode } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import Loading from './Loading';
// (restante dos imports...)

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'primary' | 'secondary';
  lightBg?: string;
  darkBg?: string;
  lightText?: string;
  darkText?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  textStyle?: TextStyle;
}

export function Button({
  title,
  variant = 'primary',
  lightBg,
  darkBg,
  lightText,
  darkText,
  iconLeft,
  iconRight,
  contentStyle,
  style,
  isLoading = false,
  textStyle,
  ...rest
}: ButtonProps) {
  const variantIsPrimary = variant === 'primary';

  const { tint, background, text, backgroudCard } = useThemeColor(
    { light: lightBg, dark: darkBg },
    ['tint', 'background', 'text', 'backgroudCard']
  );

  const backgroundColor = variantIsPrimary ? tint : backgroudCard;
  const textColor = variantIsPrimary ? background : text;

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor,
          paddingVertical: 18,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: rest.disabled ? 0.6 : 1,
        },
        style,
      ]}
      activeOpacity={0.8}
      disabled={rest.disabled || isLoading}
      {...rest}
    >
      <View
        className="flex-row items-center justify-center"
        style={[
          {
            width: '100%',
            paddingHorizontal: 4,
          },
          contentStyle,
        ]}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {iconLeft && <View className="mr-2">{iconLeft}</View>}
            {title && (
              <ThemedText
                style={[
                  {
                    color: textColor,
                    fontSize: 16,
                    fontWeight: '600',
                    flex: 1,
                    textAlign: iconRight ? 'left' : 'center',
                  },
                  textStyle,
                ]}
              >
                {title}
              </ThemedText>
            )}
            {iconRight && <View className="ml-2">{iconRight}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
