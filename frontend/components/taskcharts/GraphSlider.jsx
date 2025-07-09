"use client";

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import TasksCreatedVsCompleted from "./TasksCreatedVsCompleted";
import TasksByPriorityPie from "./TasksByPriorityPie";

export default function GraphSlider() {
  const sliderRef = useRef(null);
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-transparent hover:bg-gray-600 text-white flex items-center justify-center shadow-md transition"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-transparent hover:bg-gray-600 text-white flex items-center justify-center shadow-md transition"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-white" />
      </button>

      {/* Scrollable Graph Container */}

      <div
        ref={sliderRef}
        className="overflow-x-auto whitespace-nowrap flex snap-x snap-mandatory scroll-smooth py-2"
      >
        <div className="snap-start min-w-full">
          <TasksCreatedVsCompleted />
        </div>
        <div className="snap-start min-w-full">
          <TasksByPriorityPie />
        </div>
      </div>

      {/* <div
        ref={sliderRef}
        className="overflow-x-auto whitespace-nowrap flex space-x-4 px-10 scroll-smooth"
      >
        <div className="w-[100vw] max-w-full shrink-0">
          <TasksCreatedVsCompleted />
        </div>
        <div className="w-[100vw] max-w-full shrink-0">
          <TasksByPriorityPie />
        </div>
      </div> */}
    </div>
  );

  return (
    <div className="overflow-x-auto whitespace-nowrap flex snap-x snap-mandatory scroll-smooth py-2">
      <div className="snap-start min-w-full">
        <TasksCreatedVsCompleted />
      </div>
      <div className="snap-start min-w-full">
        <TasksByPriorityPie />
      </div>
    </div>
  );
}
