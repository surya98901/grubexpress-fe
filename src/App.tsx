import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import CustomerLayout from "./layouts/customerLayout";
import Auth from "./pages/AuthPage";
import Restaurants from "./pages/customer/Restaurants";
import Cart from "./pages/customer/Cart";
import Home from "./pages/Home";
import "./App.css";
import PartnerPage from "./pages/Partner";
import OrderDetails from "./pages/customer/OrderDetails";
import Restaurant from "./pages/customer/Restaurantpage";
import Orders from "./pages/customer/Orders";
import Checkout from "./pages/customer/Checkout";
import Profile from "./pages/customer/profile";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Menu from "./pages/admin/Menu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PublicLayout />}>
        <Route path="/auth" element={<Auth />} />
        <Route path="/food" element={<PartnerPage />} />
      </Route>
      <Route path="/customer" element={<CustomerLayout />}>
        <Route path="/customer/restaurant/:id" element={<Restaurant />} />
        <Route path="/customer/restaurants" element={<Restaurants />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/customer/order-details" element={<OrderDetails />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/checkout" element={<Checkout />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/restaurant" element={<Restaurant />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/profile" element={<Profile />} />
     
      </Route>
    </Routes>
  );
}

export default App;
