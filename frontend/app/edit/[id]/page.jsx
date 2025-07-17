"use client";
import { useRouter, useParams } from "next/navigation";
import useEditTask from "@/hooks/useEditTask";
import useTaskForm from "@/hooks/useTaskForm";
import TaskForm from "@/components/TaskForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import { useMemo } from "react";

export default function EditTask() {
  const router = useRouter();
  const { id } = useParams();
  const { form: initialData, updateTask, loading, updating } = useEditTask(id);

  const handleEdit = async (updatedForm) => {
    await updateTask(updatedForm, () => router.push("/dashboard"));
  };

  // const memoizedInitialData = useMemo(() => {
  //   return loading ? initialData : {};
  // }, [loading, initialData]);

  // const taskForm = useTaskForm(memoizedInitialData, handleEdit);

  const taskForm = useTaskForm(initialData, handleEdit);

  const { form, handleChange, handleSubmit } = taskForm;

  return (
    <ProtectedRoute>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-[92vh] flex items-center justify-center bg-gray-900 text-white px-4">
          <TaskForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitLabel="Edit Task"
            submittingLabel="Editing Task..."
            submitting={updating}
          />
        </div>
      )}
    </ProtectedRoute>
  );
}
