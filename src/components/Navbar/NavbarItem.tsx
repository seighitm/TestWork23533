import clsx from 'clsx';
import Link from 'next/link';

type NavbarItemProps = {
  path: string;
  currentPath: string;
  href: string;
  children: React.ReactNode;
};

const NavbarItem = ({ path, currentPath, href, children }: NavbarItemProps) => {
  return (
    <Link
      className={clsx('btn', {
        'btn-info': currentPath === path,
        'btn-secondary': currentPath !== path,
      })}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavbarItem;
