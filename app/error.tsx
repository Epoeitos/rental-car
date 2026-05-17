'use client';

import css from './loading.module.css';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3500);
    return () => clearTimeout(timer);
  }, [router]);

  return <div className={css.pageBox}></div>;
}