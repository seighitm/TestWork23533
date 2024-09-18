import Navbar from '@/components/Navbar/Navbar';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Navbar />
    <main className={'mt-5  mx-auto'} style={{ maxWidth: '1024px' }}>
      {children}
    </main>
  </>
);

export default Layout;
