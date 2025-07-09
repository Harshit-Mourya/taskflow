"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import CalendarView from "@/components/calendar/CalendarView";
import { TaskFilterProvider } from "@/context/TaskFilterContext";

export default function CalendarPage() {
  return (
    <ProtectedRoute>
      {" "}
      <TaskFilterProvider>
        <div className="min-h-[92vh] bg-gray-900 text-white px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Task Calendar</h1>
          <CalendarView />
        </div>
      </TaskFilterProvider>
    </ProtectedRoute>
  );
}
