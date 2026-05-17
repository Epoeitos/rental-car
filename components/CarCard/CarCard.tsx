'use client';

import css from './CarCard.module.css';

import Image from 'next/image';
import { useState } from 'react';

import type { Car } from '@/types/types';
import Link from 'next/link';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  function toggleFavorite() {
    setIsFavorite(prev => !prev);
  }



  return (
    <div className={css.card}>
      <div className={css.cardBody}>
        <div className={css.imageBox}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={276}
            height={268}
            loading="eager"
          />
          <button
            className={css.favoriteBtn}
            onClick={toggleFavorite}
            type="button"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <svg width={16} height={16}>
                <use href="/icons.svg#like-full"></use>
              </svg>
            ) : (
              <svg width={16} height={16}>
                <use href="/icons.svg#like"></use>
              </svg>
            )}
          </button>
        </div>

        <div className={css.infoRow}>
          <p>
            <span>{car.brand} </span>
            <span className={css.carModel}>{car.model}, </span>
            <span>{car.year}</span>
          </p>
          <p>${car.rentalPrice}</p>
        </div>

        <ul className={css.detailsList}>
          <li>{car.address.split(', ')[1]}</li>
<li><span className={css.divider}></span></li>
<li>{car.address.split(', ')[2]}</li>
          <li><span className={css.divider}></span></li>
          <li>{car.rentalCompany}</li>
          <li><span className={css.divider}></span></li>
          <li>{car.type}</li>
          <li><span className={css.divider}></span></li>
          <li>{car.mileage} km</li>
        </ul>
      </div>

      <Link
  href={`/catalog/${car.id}`}
  className={css.readMoreBtn}
>
  Read more
</Link>
    </div>
  );
}
