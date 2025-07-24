import React from "react";
import Menu from "../Layout/Menu";
import Searchbar from "../ui/Searchbar";

// Main hero section with navigation and search
const Hero = () => {
  return (
    <div className="bg-[#EAE4D5] min-h-screen">
      <Menu />
      <div className="flex flex-col gap-10 justify-center items-center flex-1 min-h-[80vh] px-4">
        <h1 className="font-medium text-7xl lg:text-9xl text-center">
          getALL.
        </h1>
        <span className="font-light text-2xl md:text-4xl lg:text-6xl text-center">
          (in one place)
        </span>
        <Searchbar />
      </div>
    </div>
  );
};

export default Hero;
