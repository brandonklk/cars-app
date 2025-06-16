import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTheme } from '@/contexts/ThemeContext';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView, ScrollView, TextInput } from 'react-native';

export default function Config() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useAppTheme()
  const [isDark, setIsDark] = useState(theme === 'dark');

  const { backgroudApp, backgroudCard, iconActive } = useThemeColor(
    {},
    ['backgroudApp', 'backgroudCard', 'iconActive']
  );

  const handlerToggleTheme = (value: boolean) => {
    setIsDark(value);
    toggleTheme();
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: backgroudApp }}>
      <ScrollView className="px-4 py-6">
        <ThemedText type='subtitle' className="mb-4">Configurações</ThemedText>

        <ContainerSession className="rounded-xl flex-row items-center p-4 mb-4">
          <ThemedView style={{ backgroundColor: backgroudCard }}>
            <TextInput
              placeholder="Pesquisar"
              placeholderTextColor="#888"
              className="rounded-lg p-2 text-white"
            />
          </ThemedView>
        </ContainerSession>

        <ContainerSession className="rounded-xl flex-row items-center p-4 mb-4">
          <ThemedView className="mr-2" style={{ backgroundColor: backgroudCard }}>
            <MaterialIcons name="account-circle" size={36} color={iconActive} />
          </ThemedView>
          <ThemedView style={{ backgroundColor: backgroudCard }} className="flex-1">
            <ThemedText className="text-white text-base font-semibold">{user?.name ?? 'Usuário'}</ThemedText>
            <ThemedText className="text-zinc-400 text-sm">Disponível</ThemedText>
          </ThemedView>
          <FontAwesome name="qrcode" size={32} color={iconActive} />
        </ContainerSession>

        <ContainerSession className="rounded-xl p-4 mb-4">
          <Toggle
            style={{ backgroundColor: backgroudCard }}
            label="Modo escuro"
            value={isDark}
            onValueChange={handlerToggleTheme}
          />
        </ContainerSession>

        <ContainerSession className="rounded-xl p-4 mb-4">
          <Button
            title="Sair do app"
            variant="secondary"
            style={{ backgroundColor: backgroudCard }}
            iconLeft={<Feather name="log-out" size={32} color={iconActive} />}
            onPress={logout}
          />
        </ContainerSession>

      </ScrollView>
    </SafeAreaView>
  );
}

function ContainerSession({ children, className }: { children: React.ReactNode; className: string }) {
  const { backgroudCard } = useThemeColor(
    {},
    ['backgroudCard']
  );

  return (
    <ThemedView style={{ backgroundColor: backgroudCard }} className={className}>
      {children}
    </ThemedView>
  );
}
