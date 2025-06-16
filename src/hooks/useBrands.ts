import { getBrands } from '@/services/carService';
import { Brand, BrandResponse } from '@/types/cars';
import { useQuery } from '@tanstack/react-query';

export function useBrands() {
  return useQuery<BrandResponse[], Error, Brand[]>({
    queryKey: ['brands'],
    queryFn: getBrands,
    initialData: [],
    select: (data) =>
      data.map((item) => ({
        code: item.codigo,
        name: item.nome,
      })),
  });
}
