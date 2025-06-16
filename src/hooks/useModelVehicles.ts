import { getModelsVehiclesByBrand } from '@/services/carService';
import { VehicleData } from '@/types/cars';
import { useQuery } from '@tanstack/react-query';

export function useModelVehicles(brandCode: string) {
  return useQuery<VehicleData, Error, VehicleData>({
    queryKey: ['vehicleModelByBrand', brandCode],
    initialData: { models: [], years: [] },
    queryFn: () => getModelsVehiclesByBrand(brandCode),
  });
}
