'use client';
import { usePathname } from 'next/navigation';

import NavbarItem from '@/components/Navbar/NavbarItem';
import { useWeatherStore } from '@/store/useWeatherStore';

const Navbar = () => {
  const pathname = usePathname();
  const { selectedCity } = useWeatherStore();

  return (
    <nav className="d-flex justify-content-center gap-3 mt-2">
      <NavbarItem
        path="/"
        currentPath={pathname}
        href={
          selectedCity
            ? `/?city=${selectedCity.name}&country=${selectedCity.country}`
            : '/'
        }
      >
        Home
      </NavbarItem>
      <NavbarItem path="/favorites" currentPath={pathname} href="/favorites">
        Favorites
      </NavbarItem>
    </nav>
  );
};

export default Navbar;
