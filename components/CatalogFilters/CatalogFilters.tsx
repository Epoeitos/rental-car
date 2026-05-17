'use client';

import css from './CatalogFilters.module.css';

import { useFormik } from 'formik';
import { useId, useState } from 'react';
import clsx from 'clsx';

import { generatePrices } from '@/lib/generatePrices';

interface CatalogFiltersProps {
  filters: {
    brands: string[];
    price: {
      min: string;
      max: string;
    };
  };
  handleSubmit: (
    brand: string,
    price: string,
    minMileage: number,
    maxMileage: number
  ) => void;
}

export default function CatalogFilters({ filters, handleSubmit }: CatalogFiltersProps) {
  const [hasPriceSelected, setHasPriceSelected] = useState(false);
  const minPrice = Number(filters.price.min);
  const maxPrice = Number(filters.price.max);
  const prices = generatePrices(minPrice, maxPrice);
  const formId = useId();

  const formik = useFormik({
    initialValues: {
      brand: '',
      price: '',
      minMileage: 0,
      maxMileage: 0,
    },
    onSubmit: values => {
      handleSubmit(values.brand, values.price, values.minMileage, values.maxMileage);
    },
  });

  function handlePriceChange(event: React.ChangeEvent<HTMLSelectElement>) {
    formik.handleChange(event);
    setHasPriceSelected(event.target.value !== '');
  }

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.inputGroup}>
        <label className={css.label} htmlFor={`brand-${formId}`}>
          Car brand
        </label>
        <select
          className={clsx(css.input, css.select)}
          name="brand"
          id={`brand-${formId}`}
          onChange={formik.handleChange}
        >
          <option value="">Choose a brand</option>
          {filters.brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={css.inputGroup}>
        <label className={css.label} htmlFor={`price-${formId}`}>
          Price / 1 hour
        </label>
        <select
          className={clsx(
            css.input,
            css.select,
            css.priceSelect,
            hasPriceSelected && css.priceWithPrefix
          )}
          name="price"
          id={`price-${formId}`}
          onChange={handlePriceChange}
        >
          <option value="">Choose a price</option>
          {prices.map(price => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
        {hasPriceSelected && <span className={css.pricePrefix}>To $</span>}
      </div>

      <div className={css.inputGroup}>
        <label className={css.label} htmlFor={`mileage-${formId}`}>
          Car mileage / km
        </label>
        <div className={css.mileageBox}>
          <div className={css.mileageFrom}>
            <span>From</span>
            <input
              className={css.mileageInput}
              name="minMileage"
              type="number"
              min={0}
              step={500}
              id={`mileage-${formId}`}
              onChange={formik.handleChange}
            />
          </div>
          <div className={css.mileageTo}>
            <span>To</span>
            <input
              className={css.mileageInput}
              name="maxMileage"
              type="number"
              min={0}
              step={500}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>

      <button className={css.searchBtn} type="submit">
        Search
      </button>
    </form>
  );
}
