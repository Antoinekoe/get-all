import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

const Pagination = ({ changePage, isFirstPage, isLastPage, totalPages }) => {
  return (
    <div className="flex justify-center gap-5 text-2xl mt-10">
      {/* Previous button - only show if not on first page and multiple pages exist */}
      {!isFirstPage && totalPages > 1 && (
        <button
          onClick={() => changePage("-")}
          className="flex justify-center gap-2 items-center hover:text-[#B6B09F] hover:cursor-pointer"
        >
          <ArrowLeft />
          Previous
        </button>
      )}

      {/* Next button - only show if not on last page and multiple pages exist */}
      {!isLastPage && totalPages > 1 && (
        <button
          onClick={() => changePage("+")}
          className="flex justify-center gap-2 items-center hover:text-[#B6B09F] hover:cursor-pointer"
        >
          Next
          <ArrowRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
