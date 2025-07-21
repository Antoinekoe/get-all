import { ArrowUp } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mt-20">
      <div
        className="flex justify-center items-center gap-1 bg-[#EAE4D5] w-full text-center py-10 text-4xl cursor-pointer"
        onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp /> Go up <ArrowUp />
      </div>
      <div className="flex flex-col gap-30 bg-[#B6B09F] w-full justify-center items-center py-10">
        <div className="flex text-white gap-30">
          <div className="flex flex-col">
            <h3 className="font-bold text-3xl">About</h3>
            <ul>
              <li className="text-2xl font-light">Link 1</li>
              <li className="text-2xl font-light">Link 2</li>
              <li className="text-2xl font-light">Link 3</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-3xl">About</h3>
            <ul>
              <li className="text-2xl font-light">Link 1</li>
              <li className="text-2xl font-light">Link 2</li>
              <li className="text-2xl font-light">Link 3</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-3xl">About</h3>
            <ul>
              <li className="text-2xl font-light">Link 1</li>
              <li className="text-2xl font-light">Link 2</li>
              <li className="text-2xl font-light">Link 3</li>
            </ul>
          </div>
        </div>
        <div className="flex text-white">
          <span>
            Copyright © 2025 getALL. - Terms and conditions of sale - Terms of
            use
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
