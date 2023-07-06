import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { Cart } from "../pages/Cart";
import { Login } from "../pages/Login";
import { Menu } from "../pages/Menu";
import { Payment } from "../pages/Payment";
import { Register } from "../pages/Register";
import Home from "../pages/Home";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />

			<Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
