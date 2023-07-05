import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { Cart } from "../components/Cart";
import { Login } from "../components/Login";
import { Menu } from "../components/Menu";
import { Payment } from "../components/Payment";
import { Register } from "../components/Register";
import Home from "../pages/Home";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
