import { useState } from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tempHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div className="navbar flex justify-between items-center p-4 bg-green-700 text-white px-50">
      <h1 className="text-xl font-bold"><Link to="/">My app</Link></h1>
      <nav className="flex ">
        {!isLoggedIn ? (
          <ul className="flex justify-between items-center gap-4 px-4">
           
            <li className=" font-bold border hover:border-white border-2  border-green-700 p-2 px-5 rounded-lg text-white">
              <Link to="/food">partner with us</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <button onClick={() => tempHandler()} className="bg-black font-bold  border border-black hover:bg-green-700 border-2 p-2 px-5 rounded-lg text-white hover:text-black">
                Sign in 
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex justify-between items-center gap-4 px-4">
       
            <li>
              <Link to="/customer/restaurants">Restaurants</Link>
            </li>
            <li>
              <Link to="/customer/cart">Cart</Link>
            </li>
            <li>
              <Link to="/customer/orders">Orders</Link>
            </li>
            <li>
              <button onClick={() => tempHandler()}>Sign out button</button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
export default NavBar;
