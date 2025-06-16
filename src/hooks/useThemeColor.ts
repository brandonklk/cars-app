import { Colors } from '@/constants/Colors';
import { useAppTheme } from '@/contexts/ThemeContext';

type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorNames: ColorName[]
): Record<ColorName, string> {
  const { theme: themeColor } = useAppTheme()
  const theme = themeColor ?? "light"
  const colorFromProps = props[theme];

  const result = {} as Record<ColorName, string>;

  for (const name of colorNames) {
    const resolvedColor = colorFromProps ?? Colors[theme][name];

    if (!resolvedColor) {
      throw new Error(`Color "${name}" not found in theme "${theme}"`);
    }

    result[name] = resolvedColor;
  }

  return result;
}
