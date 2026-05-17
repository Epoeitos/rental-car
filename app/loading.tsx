'use client';

import css from './loading.module.css';
import { MoonLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className={css.box} role="status" aria-label="Loading...">
      <MoonLoader size={60} color="#3470ff" />
    </div>
  );
}