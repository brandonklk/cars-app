import { VehicleModelList } from '@/components/VehicleModelList';
import { useModelVehicles } from '@/hooks/useModelVehicles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

type VehicleDetailScreenParams = { brandCode: string, brandName: string }

export default function VehicleDetailScreen() {
  const { brandCode, brandName } = useLocalSearchParams<VehicleDetailScreenParams>();
  const navigation = useNavigation();

  const { backgroudApp: backgroundColor } = useThemeColor({}, ['backgroudApp']);

  const { data, isLoading, error } = useModelVehicles(brandCode);

  useLayoutEffect(() => {
    if (brandName) {
      navigation.setOptions({ title: brandName });
    }
  }, [navigation, brandName]);

  if (isLoading) return <Text>Loading vehicle details...</Text>;
  if (error) return <Text>Failed to load vehicle details.</Text>;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <VehicleModelList {...data} />
    </SafeAreaView>)
}
