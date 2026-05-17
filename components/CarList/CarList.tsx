'use client';

import css from './CarList.module.css';

import type { Car } from '@/types/types';
import CarCard from '@/components/CarCard/CarCard';

interface CarListProps {
  cars: Car[];
  handleLoad: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

export default function CarList({ cars, handleLoad, hasNextPage, isFetching }: CarListProps) {
  return (
    <div>
      <ul className={css.carGrid}>
        {cars.map(car => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
      <button
        className={css.loadMoreBtn}
        type="button"
        onClick={handleLoad}
        disabled={!hasNextPage || isFetching}
      >
        {isFetching ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
}
