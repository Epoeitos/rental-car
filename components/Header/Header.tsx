'use client';

import css from './Header.module.css';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Header() {

 const pathname = usePathname(); 
 const isHomePage = pathname === '/'; 
 const isCatalogPage = pathname.endsWith('catalog');

  return (
    <header className={clsx('container', css.box)}>
      <Link className={css.logo} title="Go to home page" href="/">
        <svg width={104} height={16}>
          <use href="/icons.svg#logo"></use>
        </svg>
      </Link>
      <nav className={css.nav}>
        <Link
          className={clsx(css.navLink, isHomePage && css.activePage)}
          title="Home"
          href="/"
        >
          Home
        </Link>
        <Link
          className={clsx(css.navLink, isCatalogPage && css.activePage)}
          title="Catalog"
          href="/catalog"
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}
