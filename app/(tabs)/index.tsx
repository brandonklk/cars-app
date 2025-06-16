import { CarBrandList } from '@/components/CarBrandList';
import { useBrands } from '@/hooks/useBrands';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Brand } from '@/types/cars';
import { useRouter } from 'expo-router';
import { SafeAreaView, Text } from 'react-native';

export default function Index() {
  const { backgroudApp: backgroundColor } = useThemeColor({}, ['backgroudApp']);
  const { data, isLoading, error } = useBrands();
  const router = useRouter();

  const handleSelect = (brandData: Brand) => {
    router.navigate({
      pathname: `/models/[brand]`, params: {
        brandCode: brandData.code,
        brandName: brandData.name
      }
    });
  };

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Erro ao carregar marcas</Text>;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <CarBrandList data={data} onSelect={handleSelect} />
    </SafeAreaView>
  );
}
