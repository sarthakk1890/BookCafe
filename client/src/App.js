import './App.css';
import Header from './Components/Layout/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from './Components/Product/Products';
import Search from './Components/Product/Search';
import Footer from './Components/Layout/Footer'
import LoginSignUp from './Components/User/LoginSignUp';
import { useEffect } from 'react';
import store from './store'
import { loadUser } from './actions/userAction';
import { useSelector } from "react-redux";
import UserOptions from './Components/Layout/UserOptions';
import Profile from './Components/User/Profile';
import ProtectedRoute from "./Components/Route/ProtectedRoute"
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Cart/Shipping';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import PaymentSuccess from './Components/Cart/PaymentSuccess';
import MyOrders from './Components/Order/MyOrders';
import OrderDetails from './Components/Order/OrderDetails';
import Dashboard from './Components/Admin/Dashboard';
import ProductList from './Components/Admin/ProductList';
import CreateProduct from './Components/Admin/CreateProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import OrderList from './Components/Admin/OrderList';
import ProcessOrder from './Components/Admin/ProcessOrder';
import UsersList from './Components/Admin/UsersList';
import UpdateUser from './Components/Admin/UpdateUser';
import ProductReviews from './Components/Admin/ProductReviews';
import NotFound from './Components/Layout/NotFound';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  window.addEventListener("contextmenu", (e) => e.preventDefault()) //to disable right click

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />

        {isAuthenticated && <UserOptions user={user} />}

        <Routes>

          {/* Unprotected Routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />
          <Route exact path='/cart' element={<Cart />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route exact path='/account' element={<Profile />} />
            <Route exact path='/me/update' element={<UpdateProfile />} />
            <Route exact path='/password/update' element={<UpdatePassword />} />
            <Route exact path='/shipping' element={<Shipping />} />
            <Route exact path='/order/confirm' element={<ConfirmOrder />} />
            <Route exact path='/payment/success/:reference' element={<PaymentSuccess />} />
            <Route exact path='/orders/me' element={<MyOrders />} />
            <Route exact path='/order/:id' element={<OrderDetails />} />
            <Route exact path='/admin/dashboard' isAdmin={true} element={<Dashboard />} />
            <Route exact path='/admin/products' isAdmin={true} element={<ProductList />} />
            <Route exact path='/admin/product' isAdmin={true} element={<CreateProduct />} />
            <Route exact path='/admin/products/:id' isAdmin={true} element={<UpdateProduct />} />
            <Route exact path='/admin/orders' isAdmin={true} element={<OrderList />} />
            <Route exact path='/admin/order/:id' isAdmin={true} element={<ProcessOrder />} />
            <Route exact path='/admin/users' isAdmin={true} element={<UsersList />} />
            <Route exact path='/admin/user/:id' isAdmin={true} element={<UpdateUser />} />
            <Route exact path='/admin/reviews' isAdmin={true} element={<ProductReviews />} />
          </Route>
          <Route path='/*' element={<NotFound/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
