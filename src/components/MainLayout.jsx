import NavbarShop from './NavbarShop';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import ScrollButton from './ScrollButton';


export default function MainLayout({ children }) {

  return (

    <div className="d-flex flex-column min-vh-100">

      <NavbarShop />

      <div className="flex-grow-1">

        {children}
        <Outlet />

      </div>

      <Footer />

      <ScrollButton />

    </div>
  );
}
