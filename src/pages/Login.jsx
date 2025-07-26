import React, { useState } from "react";
import Menu from "../components/Layout/Menu";
import Footer from "../components/Layout/Footer";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { logIn } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await logIn(formData.username, formData.password);

      if (response && response.success === true) {
        navigate("/");
      } else if (response && response.success === false) {
        setError(response.error);
        setFormData((prev) => ({ ...prev, password: "" }));
      }
    } catch (error) {
      setError("Network error, please try again.");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <div className="pt-20">
        <h1 className="font-medium text-6xl text-center my-15">Login</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col min-h-[27rem] w-4/6 xl:w-2/7 mx-auto rounded-2xl px-6 py-8 gap-5 border-1 border-[#B6B09F]"
      >
        <img src={logo} alt="Logo" className="w-15 mx-auto" />
        <label>Username</label>
        <input
          type="text"
          className="border-1 border-[#B6B09F] rounded-2xl h-8 px-4"
          placeholder="Enter your username"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <label>Password</label>
        <input
          type="password"
          className="border-1 border-[#B6B09F] rounded-2xl h-8 px-4"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button className="flex justify-center items-center cursor-pointer li-item-active self-start w-full hover:shadow-lg">
          Send
        </button>
        {error && (
          <div className="flex flex-col">
            <span className="text-red-600 text-sm text-center">{error}</span>
          </div>
        )}
      </form>
      <Footer />
    </div>
  );
};

export default Login;
