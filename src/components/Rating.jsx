import { Star } from "lucide-react";
import React from "react";

const Rating = ({ rating }) => {
  return Array(5)
    .fill(0)
    .map((item, index) => (
      <Star
        key={index}
        fill={index < Math.floor(rating) ? "#FACF19" : "white"}
        stroke="#FACF19"
      />
    ));
};

export default Rating;
