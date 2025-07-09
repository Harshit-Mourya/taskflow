"use client";

import FilterComponent from "@/components/FilterComponent";
import SearchBox from "@/components/SearchBox";
import ViewAllTaskButton from "@/components/ViewAllTaskButton";
import { useTaskFilter } from "@/context/TaskFilterContext.jsx";

export default function DashboardToolbar() {
  const { loadTasks, resetSignal, handleViewAll } = useTaskFilter();

  return (
    <div className="flex flex-col  gap-6 items-center mb-6">
      <div className="flex items-center  w-full  justify-around sm:justify-between xl:justify-start">
        <h2 className="text-xl font-semibold mr-2 xl:mr-4">Sort by:</h2>
        <FilterComponent onFilterChange={loadTasks} resetSignal={resetSignal} />
      </div>
      <div className="flex gap-2 items-center  w-full ">
        <div className="flex-grow">
          <SearchBox onSearch={loadTasks} resetSignal={resetSignal} />
        </div>
        <div>
          <ViewAllTaskButton getAllTask={handleViewAll} />
        </div>
      </div>
    </div>
  );
}
