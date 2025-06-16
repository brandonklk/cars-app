import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { VehicleData } from '@/types/cars';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { ThemedView } from './ThemedView';

interface VehicleModelListProps extends VehicleData {
    lightColor?: string;
    darkColor?: string;
}

export function VehicleModelList({ models, darkColor, lightColor }: VehicleModelListProps) {
    const { icon: colorIcon, backgroudCard, text: textColor } =
        useThemeColor({ light: lightColor, dark: darkColor }, ['icon', 'backgroudCard', 'text']);

    return (
        <FlatList
            data={models}
            keyExtractor={(item) => String(item.code)}
            ListHeaderComponent={() => {
                return (
                    <ThemedText type="subtitle" className="mb-8">Modelos disponíveis</ThemedText>
                )
            }}
            contentContainerStyle={{ paddingBottom: 32, paddingTop: 10, paddingHorizontal: 10 }}
            renderItem={({ item }) => (
                <ThemedView style={{ backgroundColor: backgroudCard }} className="flex-row items-center px-4 py-3 rounded-xl mb-2">
                    <MaterialIcons name="description" size={24} color={colorIcon} />
                    <ThemedText
                        style={{
                            color: textColor,
                            fontSize: 16,
                            fontWeight: '600',
                            flex: 1,
                        }}
                        className="ml-3"
                        type="default">
                        {item.name}
                    </ThemedText>
                </ThemedView>
            )}
            ListEmptyComponent={() => (
                <ThemedText className="text-center text-zinc-400 mt-6">
                    Nenhum modelo encontrado.
                </ThemedText>
            )}
        />
    );
}
