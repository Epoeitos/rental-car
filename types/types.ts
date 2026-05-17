export interface Location {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  img: string;
  brand: string;
  model: string;
  year: number;
  rentalPrice: string;
  address: string;
  rentalCompany: string;
  type: string;
  mileage: number;
}

export interface CarDetails {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  accessories: string[];
functionalities: string[];
  address: string;
}
