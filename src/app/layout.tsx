import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather App',
  icons: {
    icon: '/favicon.png',
  },
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" data-bs-theme="dark">
    <body className={'py-3'}>{children}</body>
  </html>
);

export default Layout;
