import React from "react";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { MoveRight } from "lucide-react";

const Home = () => {
  return (
    <>
      <Hero />
      <h2 className="font-medium text-6xl text-center my-10">
        Some of our products
      </h2>
      <ProductsSection />
      <h3 className="flex justify-end items-end font-medium text-3xl text-end mt-10 w-5/6">
        <Link to="/products">
          <div className="flex justify-center items-center gap-3">
            Show more
            <MoveRight />
          </div>
        </Link>
      </h3>
      <Footer />
    </>
  );
};

export default Home;
