export interface Brand {
  code: string;
  name: string;
}

export interface BrandResponse {
  codigo: string;
  nome: string;
}

export interface VehicleModel {
  code: number;
  name: string;
}

export interface VehicleYear {
  code: string;
  name: string;
}

export interface VehicleData {
  models: VehicleModel[];
  years: VehicleYear[];
}