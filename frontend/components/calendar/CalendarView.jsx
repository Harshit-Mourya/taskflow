"use client";
import { useEffect, useState } from "react";
import { useTaskFilter } from "@/context/TaskFilterContext";
import { getMonthDates, getTasksForDate } from "@/utils/calendarUtils";
import useCalendar from "@/hooks/useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarTaskList from "./CalendarTaskList";
import Loader from "../Loader";

export default function CalendarView() {
  const { taskData, loadTasks, loading } = useTaskFilter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { selectedDate, handleDateClick, setSelectedDate } = useCalendar();

  useEffect(() => {
    loadTasks({ filters: {} });
  }, [loadTasks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" bg-gray-900 text-white p-4 rounded w-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <CalendarHeader
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />

        {/* Calendar Grid */}
        <CalendarGrid
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          handleDateClick={handleDateClick}
          taskData={taskData}
          getMonthDates={getMonthDates}
          getTasksForDate={getTasksForDate}
        />

        {/* Task List for Selected Date */}
        {selectedDate && (
          <CalendarTaskList
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            taskData={taskData}
            getTasksForDate={getTasksForDate}
          />
        )}
      </div>
    </div>
  );
}
