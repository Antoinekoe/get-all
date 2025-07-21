import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Page404 from "./pages/Page404";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:search" element={<Products />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/*" element={<Page404 />}></Route>
      </Routes>
    </>
  );
}

export default App;
