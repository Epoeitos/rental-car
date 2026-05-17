import type { Metadata } from 'next';

import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'RentalCar — Catalog',
  description: 'Browse our full catalog of available rental cars.',
};

export default function CatalogPage() {
  return <CatalogClient />;
}