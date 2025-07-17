"use client";

import TaskForm from "@/components/TaskForm";
import useTaskForm from "@/hooks/useTaskForm";
import useAddTask from "@/hooks/useAddTask";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddTaskPage() {
  const { form: initialData, addTask, creating } = useAddTask();

  const handleAdd = async (form) => {
    await addTask(form);
  };

  const { form, handleChange, handleSubmit } = useTaskForm(
    initialData,
    handleAdd
  );

  return (
    <ProtectedRoute>
      <div className="min-h-[92vh] flex items-center justify-center bg-gray-900 text-white px-4">
        <TaskForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitLabel="Add Task"
          submittingLabel="Creating Task..."
          submitting={creating}
        />
      </div>
    </ProtectedRoute>
  );
}
