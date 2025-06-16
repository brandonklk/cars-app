import { useThemeColor } from '@/hooks/useThemeColor';
import { Brand } from '@/types/cars';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { Button } from './ui/Button';

interface Props {
  data: Array<Brand>;
  onSelect: (brandData: Brand) => void;
  lightColor?: string;
  darkColor?: string;
}

export function CarBrandList({ data, onSelect, darkColor, lightColor }: Props) {
  const { icon: iconColor } = useThemeColor({ light: lightColor, dark: darkColor }, ['icon']);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.code}
      contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
      renderItem={({ item }) => (
        <Button
          variant="secondary"
          className="flex-row items-center px-4 py-4 rounded-xl mb-3"
          activeOpacity={0.8}
          iconLeft={<MaterialIcons name="directions-car" size={20} color={iconColor} />}
          iconRight={<MaterialIcons name="chevron-right" size={24} color={iconColor} />}
          title={item.name.toUpperCase()}
          contentStyle={{ justifyContent: 'space-between' }}
          onPress={() => onSelect(item)}
        />
      )}
    />
  );
}
