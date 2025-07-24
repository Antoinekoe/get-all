import React from "react";
import { Star } from "lucide-react";
import Rating from "./Rating";

const Review = ({ review }) => {
  return (
    <div className="flex flex-col gap-2 pb-6 border-b-[1px] border-b-gray-300 w-full max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
      <div className="flex justify-center lg:justify-start gap-1">
        <span className="font-bold">{review.reviewerName}</span>
        <span>-</span>
        <span>{new Date(review.date).toLocaleDateString()}</span>
      </div>
      <div className="flex justify-center lg:justify-start">
        <Rating rating={review.rating} />
      </div>
      <span className="text-center lg:text-left">{review.comment}</span>
    </div>
  );
};

export default Review;
