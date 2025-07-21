import React from "react";
import Menu from "./Menu";
import Searchbar from "./Searchbar";

const Hero = () => {
  return (
    <div className="bg-[#EAE4D5] min-h-screen">
      <Menu />
      <div className="flex flex-col gap-10 justify-center items-center flex-1 min-h-[80vh]">
        <h1 className="font-medium text-9xl">getALL.</h1>
        <span className="font-light text-6xl">(in one place)</span>
        <Searchbar />
      </div>
    </div>
  );
};

export default Hero;
