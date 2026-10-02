import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import CustomerLayout from "./layouts/customerLayout";
import Auth from "./pages/AuthPage";
import Restaurants from "./pages/customer/Restaurants";
import Cart from "./pages/customer/Cart";
import Home from "./pages/Home";
import "./App.css";
import PartnerPage from "./pages/Partner";
import Restaurant from "./pages/customer/Restaurantpage";
import Orders from "./pages/customer/Orders";
import Checkout from "./pages/customer/Checkout";
import Profile from "./pages/customer/profile";
import AdminLayout from "./layouts/AdminLayout";
import AdminDetailDisplay from "./pages/admin/AdminDetailDisplay";
import Menu from "./pages/admin/Menu";
import AdminHome from "./pages/admin/AdminHome";
import AdminRestaurant from "./pages/admin/AdminRestaurant";
import AdminItems from "./pages/admin/AdminItems";
import AdminSettings from "./pages/admin/AdminSettings";

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
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/payments" element={<Checkout />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
      <Route path="/admin" element={<AdminHome />}/>
        <Route path="/admin/services" element={<AdminDetailDisplay />} />
        <Route path="/admin/restaurant" element={<AdminRestaurant />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path= "/admin/items" element={<AdminItems/>}/>
        <Route path= "/admin/settings" element={<AdminSettings/>}/>
        <Route path="/admin/profile" element={<Profile />} />
     
      </Route>
    </Routes>
  );
}

export default App;
