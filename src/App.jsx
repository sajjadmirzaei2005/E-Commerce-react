import { Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// Pages
import Home from "./pages/home/Home";
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedPage from './pages/ProtectedPage';
import NotFound from './pages/NotFound';
//Components
import MainLayout from './components/MainLayout';
import WelcomeModal from './components/WelcomeModal';


export default function App() {

  return (

    <MainLayout>

      <WelcomeModal />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<ProtectedPage />} />
        <Route path='/*' element={<NotFound />} />

      </Routes>

    </MainLayout>
  )
}