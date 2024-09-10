import React from "react";
import { scroller } from "react-scroll";

const NewPage = ({ currentPage, handlePageChange }) => {
  const scrollTo = (page) => {
    scroller.scrollTo(`card-${page}`, { // Use the correct ID format
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
    handlePageChange(page);
  };

  return (
    <div className="pagination flex justify-center ml-[32rem] text-xs space-x-4 mt-4">
      <button
        className={`px-4 py-2 rounded-full border 
          ${currentPage === 0 ? " border-red-500" : "bg-transparent text-gray-300"} 
          transition duration-300 ease-in-out transform hover:scale-110`}
        onClick={() => scrollTo(0)}
      >
        Book 1
      </button>
      <button
        className={`px-4 py-2 rounded-full border 
          ${currentPage === 1 ? " border-red-500" : "bg-transparent text-gray-300"} 
          transition duration-300 ease-in-out transform hover:scale-110`}
        onClick={() => scrollTo(1)}
      >
        Book 2
      </button>
      <button
        className={`px-4 py-2 rounded-full border 
          ${currentPage === 2 ? " border-red-500" : "bg-transparent text-gray-300"} 
          transition duration-300 ease-in-out transform hover:scale-110`}
        onClick={() => scrollTo(2)}
      >
        Book 3
      </button>
    </div>
  );
};

export default NewPage;
