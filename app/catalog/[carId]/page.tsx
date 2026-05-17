import type { Metadata } from 'next';
import css from './page.module.css';
import Image from 'next/image';
import clsx from 'clsx';

import { getCar } from '@/lib/api/apiFunc';
import RentalForm from '@/components/RentalForm/RentalForm';

export const metadata: Metadata = {
  title: 'RentalCar — Car Details',
  description: 'Detailed information and booking for this car.',
};

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;
  const car = await getCar(carId);

  return (
    <section className={clsx('container', css.section)}>
      <div className={css.leftBox}>
        <div className={css.imgBox}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            loading="eager"
          />
        </div>
        <RentalForm carId={carId} />
      </div>

      <div>
        <div className={css.brandBox}>
          <p className={css.carTitle}>
            <span>
              {car.brand} {car.model}, {car.year}
            </span>
            <span className={css.carId}>id {car.stockNumber}</span>
          </p>
          <p className={clsx(css.text, css.location)}>
            <svg width={12} height={15}>
              <use href="/icons.svg#location"></use>
            </svg>
            <span className={css.city}>
              {car.address.split(',').slice(1).join(',')}
            </span>
            <span className={css.mileage}>Mileage: {car.mileage} km</span>
          </p>
          <p className={css.rentalPrice}>${car.rentalPrice}</p>
          <p className={css.text}>{car.description}</p>
        </div>

        <div className={css.conditionsBox}>
          <p className={css.sectionTitle}>Rental Conditions:</p>
          <ul className={css.list}>
            {car.rentalConditions.map(condition => (
              <li className={css.listItem} key={condition}>
                <svg width={16} height={16}>
                  <use href="/icons.svg#check"></use>
                </svg>
                <span className={css.text}>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.specsBox}>
          <p className={css.sectionTitle}>Car Specifications:</p>
          <ul className={css.list}>
            <li className={css.listItem}>
              <svg width={16} height={16}>
                <use href="/icons.svg#calendar"></use>
              </svg>
              <span className={css.text}>Year: {car.year}</span>
            </li>
            <li className={css.listItem}>
              <svg width={16} height={16}>
                <use href="/icons.svg#car"></use>
              </svg>
              <span className={css.text}>Type: {car.type}</span>
            </li>
            <li className={css.listItem}>
              <svg width={16} height={16}>
                <use href="/icons.svg#fuel"></use>
              </svg>
              <span className={css.text}>
                Fuel Consumption: {car.fuelConsumption}
              </span>
            </li>
            <li className={css.listItem}>
              <svg width={16} height={16}>
                <use href="/icons.svg#engine"></use>
              </svg>
              <span className={css.text}>Engine Size: {car.engine}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className={css.sectionTitle}>Accessories and functionalities:</p>
          <ul className={css.list}>
            {car.accessories.map(item => (
              <li className={css.listItem} key={item}>
                <svg width={16} height={16}>
                  <use href="/icons.svg#check"></use>
                </svg>
                <span className={css.text}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
