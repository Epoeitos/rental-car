import { api } from './api';
import type { Car, CarDetails } from '@/types/types';

export interface CarResponse {
  page: number;
  totalPages: number;
  cars: Car[];
}

export interface BookingRequest {
  name: string;
  email: string;
  comment?: string;
}

export interface Filters {
  brands: string[];
  price: {
    min: string;
    max: string;
  };
}

interface FetchCarsParams {
  page: number;
  brand?: string;
  price?: string;
  minMileage?: number;
  maxMileage?: number;
}

export async function getFilters(): Promise<Filters> {
  const res = await api.get<string[]>('/brands');

  return {
    brands: res.data,
    price: {
      min: '30',
      max: '80',
    },
  };
}

export async function getCars({
  page,
  brand,
  price,
  minMileage,
  maxMileage,
}: FetchCarsParams): Promise<CarResponse> {
  try {
    const params = {
      page,
      perPage: 12,

      ...(brand ? { brand } : {}),

      ...(price
        ? { rentalPrice: Number(price) }
        : {}),

      ...(minMileage !== undefined && minMileage > 0
        ? { minMileage }
        : {}),

      ...(maxMileage !== undefined && maxMileage > 0
        ? { maxMileage }
        : {}),
    };

    console.log('PARAMS:', params);

    const res = await api.get('/cars', {
      params,
    });

    return res.data;
  } catch (error) {
    console.log('GET CARS ERROR:', error);
    throw error;
  }
}


export async function getCar(id: string): Promise<CarDetails> {
  const res = await api.get(`/cars/${id}`);
  return res.data;
}

export async function bookCar(
  data: BookingRequest,
  carId: string
): Promise<{ message: string }> {
  console.log('BOOK DATA:', data);
  console.log('CAR ID:', carId);

  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: 'Booking successful',
  };
}