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
  const { form: initialData, updateTask, ready } = useEditTask(id);

  const handleEdit = async (updatedForm) => {
    await updateTask(updatedForm, () => router.push("/dashboard"));
  };

  const memoizedInitialData = useMemo(() => {
    return ready ? initialData : {};
  }, [ready, initialData]);

  const taskForm = useTaskForm(memoizedInitialData, handleEdit);

  const { form, handleChange, handleSubmit } = taskForm;

  // const handleChange = (e) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await updateTask(() => router.push("/dashboard"));
  // };

  return (
    <ProtectedRoute>
      {!ready ? (
        <Loader />
      ) : (
        <div className="min-h-[92vh] flex items-center justify-center bg-gray-900 text-white px-4">
          <TaskForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitLabel="Edit Task"
          />
        </div>
      )}
    </ProtectedRoute>
  );
}
