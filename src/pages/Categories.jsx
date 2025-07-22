import React from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";

const Categories = () => {
  return (
    <>
      <Menu />
      <div className="pt-20">
        <h1 className="font-medium text-6xl text-center my-15">
          Choose your category
        </h1>
        <div className="grid grid-cols-3 grid-rows-2 gap-10 w-1/2 mx-auto">
          <div className="bg-amber-300 col-span-2 h-80">
            <Link to="/products/test">1</Link>
          </div>
          <div className="bg-amber-800 row-span-2">2</div>
          <div className="bg-black col-span-2">3</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Categories;
