import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import NavBar from "./Components/NavBar";
import ProtectedRoute from "./Components/ProtectedRoute";
import StoreProvider from "./store";
import ShopScreen from "./Screens/ShopScreen";
import CartScreen from "./Screens/CartScreen";
import CheckoutScreen from "./Screens/CheckoutScreen";
import OrdersScreen from "./Screens/OrdersScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import ErrorScreen from "./Screens/ErrorScreen";

function App() {
  return (
    <div className="flex  flex-col w-screen h-screen bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E]">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/products" element={<ShopScreen />} />
          <Route path="/search" element={<ShopScreen />} />

          <Route path="/product/:slug" element={<ProductsScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/orders" element={<OrdersScreen />} />
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
