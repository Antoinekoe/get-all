import React from "react";
import Menu from "../components/Layout/Menu";
import Footer from "../components/Layout/Footer";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <div className="flex flex-col justify-center items-center flex-1 gap-5">
        <h1 className="text-8xl">404</h1>
        <span className="text-4xl">Page not found</span>
        <Link
          to="/"
          className="border rounded-2xl px-2 hover:bg-[#B6B09F] hover:text-white"
        >
          Go to home page
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Page404;
