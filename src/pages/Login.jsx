import React from "react";
import Menu from "../components/Layout/Menu";
import Footer from "../components/Layout/Footer";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <div className="pt-20">
        <h1 className="font-medium text-6xl text-center my-15">Login</h1>
      </div>

      <form
        action="https://dummyjson.com/user/login"
        method="POST"
        className="flex flex-col flex-1 w-4/6 xl:w-2/7 mx-auto rounded-2xl px-6 py-8 gap-5 justify-center border-1 border-[#B6B09F]"
      >
        <img src={logo} alt="Logo" className="w-15 mx-auto" />
        <label>Username</label>
        <input
          type="text"
          className="border-1 border-[#B6B09F] rounded-2xl h-8 px-4"
          placeholder="Enter your username"
          name="username"
        />
        <label>Password</label>
        <input
          type="text"
          className="border-1 border-[#B6B09F] rounded-2xl h-8 px-4"
          placeholder="Enter your password"
          name="password"
        />
        <button className="flex justify-center items-center cursor-pointer li-item-active self-start w-full hover:shadow-lg">
          Send
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
