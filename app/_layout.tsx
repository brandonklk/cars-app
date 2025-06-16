// ⛔ NÃO mova para baixo!
// import 'react-native-reanimated'; // <- DEVE ser o primeiro import
import Loading from '@/components/ui/Loading';
import '../global.css';

import { CustomDarkTheme, CustomLightTheme } from '@/constants/CustomTheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider as AppThemeProvider, useAppTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

function AppStack() {
  const { theme } = useAppTheme();
  const colorScheme = theme;
  const { backgroudApp: backgroundColor, tint } = useThemeColor({}, ['backgroudApp', 'tint']);

  return (
    <NavThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen
              name="models/[brand]"
              options={{
                title: 'Modelos de veículos',
                headerTintColor: tint,
                headerStyle: {
                  backgroundColor: backgroundColor,
                },
                headerTitleAlign: 'center',
              }}
            />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Toast />
        </AuthProvider>
      </QueryClientProvider>
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../src/assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { isLoading: authLoading } = useAuth();

  if (!loaded || authLoading) return <Loading />;

  return (
    <AppThemeProvider>
      <AppStack />
    </AppThemeProvider>
  );
}
