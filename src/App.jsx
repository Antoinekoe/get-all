import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Page404 from "./pages/Page404";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import CheckoutCart from "./pages/CheckoutCart";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/search/" element={<Products />}></Route>
        <Route path="/products/search/:search" element={<Products />}></Route>
        <Route path="/products/category/" element={<Products />}></Route>
        <Route
          path="/products/category/:category"
          element={<Products />}
        ></Route>
        <Route
          path="/products/details/:id"
          element={<ProductDetails />}
        ></Route>
        <Route path="/checkoutcart" element={<CheckoutCart />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<Page404 />}></Route>
      </Routes>
    </>
  );
}

export default App;
