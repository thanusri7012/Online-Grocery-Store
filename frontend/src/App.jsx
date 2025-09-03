import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/admin/UserListPage';
import UserEditPage from './pages/admin/UserEditPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage'; // Import the new admin page

function App() {
  const location = useLocation();
  const { pathname } = location;
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? '' : 'py-3'}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected User Routes */}
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route path="" element={<ProtectedRoute />}>
             <Route path="/admin/userlist" element={<UserListPage />} />
             <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
             <Route path="/admin/productlist" element={<ProductListPage />} />
             <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;