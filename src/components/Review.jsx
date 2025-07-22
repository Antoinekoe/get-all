import React from "react";
import { Star } from "lucide-react";
import Rating from "./Rating";

const Review = ({ review }) => {
  return (
    <div className="flex flex-col gap-2 pb-6 border-b-[1px] border-b-gray-300">
      <div className="flex gap-1">
        <span className="font-bold">{review.reviewerName}</span>
        <span>-</span>
        <span>{new Date(review.date).toLocaleDateString()}</span>
      </div>
      <div className="flex">
        <Rating rating={review.rating} />
      </div>
      <span>{review.comment}</span>
    </div>
  );
};

export default Review;
