import React, { useEffect } from "react";
import Menu from "../components/Layout/Menu";
import Footer from "../components/Layout/Footer";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Menu />
      <div className="pt-10 md:pt-20">
        <h1 className="font-medium text-3xl md:text-4xl lg:text-6xl text-center my-15">
          Contact us
        </h1>
        <form className="flex flex-col shadow-uniform justify-center items-center w-4/5 lg:w-1/3 m-auto rounded-2xl p-7 gap-8">
          <div className="flex justify-center items-center gap-5 w-full">
            <input
              type="text"
              placeholder="Last name"
              name="lName"
              className="form-button w-full"
              required
            />
            <input
              type="text"
              placeholder="First name"
              name="fName"
              className="form-button w-full"
              required
            />
          </div>
          <div className="flex justify-center items-center gap-5 w-full">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="form-button w-full"
              required
            />
            <input
              type="text"
              placeholder="Phone number"
              name="phone"
              className="form-button w-full"
              required
            />
          </div>
          <select className="w-full border-gray-300 self-end focus:outline-none form-button">
            <option value="" className="rounded">
              Subject
            </option>
            <option value="information">Information</option>
          </select>
          <textarea rows="4" className="form-button w-full" />
          <button className="flex justify-center items-center cursor-pointer li-item-active self-start w-1/6 hover:shadow-lg">
            Send
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
