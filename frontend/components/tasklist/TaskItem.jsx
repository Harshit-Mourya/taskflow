"use client";
import Link from "next/link";
import { useTaskActions } from "@/hooks/useTaskActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubtaskList from "./SubtaskList";
import { formatDate } from "@/utils/formatDate";
import { getDueStatus, getTaskStyles } from "@/utils/taskStyling";

export default function TaskItem({ task }) {
  const { toggleTaskCompletion, deleteTask, toggleSubtaskStatus } =
    useTaskActions();

  const status = getDueStatus(task.dueDate, task.completed);
  const taskStyles = getTaskStyles(status);

  return (
    // <li className="bg-gray-800 sm:p-4 p-2 rounded shadow-md flex justify-between items-center border-2 border-gray-600">
    <li
      className={`sm:p-4 p-2 rounded shadow-md flex justify-between items-center border-2 ${taskStyles}`}
    >
      <div className="flex">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task._id)}
            className="sm:mr-2 mr-1 sm:w-5 sm:h-5 w-4 h-4 accent-green-600 border-2 border-gray-600 rounded focus:ring-2 focus:ring-green-500 transition-all"
          />
        </div>
        <div>
          {/* <div className="flex gap-2 items-center "> */}
          <h2
            className={`text-base sm:text-xl font-semibold ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
            <span
              className={`w-3 h-3 rounded-full ml-2 inline-block ${
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }`}
              title={task.priority}
            ></span>
          </h2>
          {/* <span
              className={`w-3 h-3 rounded-full inline-block ${
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }`}
              title={task.priority} // Optional: shows tooltip on hover
            ></span> */}
          {/* <span
              className={`text-xs px-2 py-1 rounded font-semibold ${
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-500"
              }`}
            >
              {task.priority}
            </span> */}
          {/* </div> */}
          <p className="text-sm text-gray-400 mt-1">
            Due:&nbsp;{formatDate(task.dueDate)}
          </p>
          {task.details && (
            <p className="text-sm text-gray-300 mt-1">
              Details:&nbsp;{task.details}
            </p>
          )}
          <SubtaskList
            taskId={task._id}
            subtasks={task.subtasks}
            onToggle={toggleSubtaskStatus}
          />
        </div>
      </div>
      <div className="space-x-2">
        <Link href={`/edit/${task._id}`}>
          <button
            className={`inline-flex items-center xl:px-3 px-2 xl:py-1 py-2 rounded text-sm transition-all  ${
              task.completed
                ? "bg-gray-600 cursor-not-allowed opacity-60"
                : "bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
            }`}
            disabled={task.completed}
          >
            <FontAwesomeIcon icon={faEdit} />
            <span className="xl:block hidden ml-1">Edit</span>
          </button>
        </Link>
        <button
          className="bg-red-600 hover:bg-red-700 inline-flex items-center xl:px-3 px-2 xl:py-1 py-2 rounded text-sm cursor-pointer "
          onClick={() => deleteTask(task._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
          <span className="xl:block hidden ml-1">Delete</span>
        </button>
      </div>
    </li>
  );
}
