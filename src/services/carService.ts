import { BrandResponse, VehicleData } from '@/types/cars';
import axiosInstance from './axios';

const BASE_URL = "https://parallelum.com.br/fipe/api/v1"

export const getBrands = async (): Promise<Array<BrandResponse>> => {
  const response = await axiosInstance.get(`${BASE_URL}/carros/marcas`);
  return response.data;
};

export async function getModelsVehiclesByBrand(brandCode: string): Promise<VehicleData> {
  const { data } = await axiosInstance.get(`${BASE_URL}/carros/marcas/${brandCode}/modelos`);

  return {
    models: data.modelos.map((model: any) => ({
      code: model.codigo,
      name: model.nome,
    })),
    years: data.anos.map((year: any) => ({
      code: year.codigo,
      name: year.nome,
    })),
  };
}
