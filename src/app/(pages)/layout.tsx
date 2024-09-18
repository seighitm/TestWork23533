import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';

import type { Metadata } from 'next';

import Navbar from '@/components/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather App',
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" data-bs-theme="dark">
    <body className={'py-3'}>
      <Navbar />
      <main className={'mt-5  mx-auto'} style={{ maxWidth: '1024px' }}>
        {children}
      </main>
    </body>
  </html>
);

export default Layout;
