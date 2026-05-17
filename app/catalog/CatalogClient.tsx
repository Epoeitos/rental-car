'use client';

import css from './page.module.css';

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getFilters, getCars, type Filters } from '@/lib/api/apiFunc';
import CatalogFilters from '@/components/CatalogFilters/CatalogFilters';
import CarList from '@/components/CarList/CarList';

export default function CatalogClient() {
  const [filters, setFilters] = useState<Filters | null>(null);

  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState(0);
  const [maxMileage, setMaxMileage] = useState(0);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const data = await getFilters();

        if (data) {
          setFilters(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchFilters();
  }, []);

  function handleFilterChange(
    newBrand: string,
    newPrice: string,
    newMinMileage: number,
    newMaxMileage: number
  ) {
    setBrand(newBrand);
    setPrice(newPrice);
    setMinMileage(newMinMileage);
    setMaxMileage(newMaxMileage);
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      'cars',
      brand,
      price,
      minMileage,
      maxMileage,
    ],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getCars({
        page: pageParam as number,
        brand,
        price,
        minMileage,
        maxMileage,
      }),

    getNextPageParam: (lastPage, allPages) => {
  if (lastPage.cars.length < 12) {
    return undefined;
  }

  return allPages.length + 1;
},
  });

  const cars =
    data?.pages?.flatMap(page => page?.cars ?? []) ?? [];

  const hasCars = cars.length > 0;

  if (isLoading) {
    return (
      <section className={clsx('container', css.section)}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className={clsx('container', css.section)}>
      {filters && (
        <CatalogFilters
          filters={filters}
          handleSubmit={handleFilterChange}
        />
      )}

      {hasCars ? (
        <CarList
          cars={cars}
          handleLoad={() => fetchNextPage()}
          isFetching={isFetching}
          hasNextPage={hasNextPage ?? false}
        />
      ) : (
        <p className={css.emptyText}>
          No vehicles were found matching your search criteria...
        </p>
      )}
    </section>
  );
}