"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function DashboardHeader() {
  const router = useRouter();

  const handleAddClick = () => {
    router.push("/add-task");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <button
        onClick={handleAddClick}
        className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition cursor-pointer"
      >
        <FontAwesomeIcon icon={faPlus} />
        &nbsp;Add Task
      </button>
    </div>
  );
}
