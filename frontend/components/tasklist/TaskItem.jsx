"use client";

import { useState, useRef, useEffect } from "react";

import Link from "next/link";
import { useTaskActions } from "@/hooks/useTaskActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEllipsisV,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import SubtaskList from "./SubtaskList";
import { formatDate } from "@/utils/formatDate";
import { getDueStatus, getTaskStyles } from "@/utils/taskStyling";

export default function TaskItem({ task }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showRepeatInfo, setShowRepeatInfo] = useState(false);

  const { toggleTaskCompletion, deleteTask, toggleSubtaskStatus } =
    useTaskActions();

  const status = getDueStatus(task.dueDate, task.completed);
  const taskStyles = getTaskStyles(status, task.repeat);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li
      className={`sm:p-4 p-2 rounded shadow-md flex justify-between items-center relative border-2 ${taskStyles}`}
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

          <p className="text-sm text-gray-400 mt-1">
            Due:&nbsp;{formatDate(task.dueDate)}
          </p>
          {task.details && (
            <p className="text-sm text-gray-300 mt-1 2xl:max-w-md xl:max-w-xs lg:max-w-2xs md:max-w-lg max-w-xs">
              Details:&nbsp;{task.details}
            </p>
          )}
          {task.subtasks && task.subtasks.length > 0 && (
            <SubtaskList
              taskId={task._id}
              subtasks={task.subtasks}
              onToggle={toggleSubtaskStatus}
            />
          )}
        </div>
      </div>

      {task.repeat && task.repeat !== "none" && (
        <div className="absolute top-1 right-8 text-white">
          <FontAwesomeIcon
            icon={faRepeat}
            className="text-blue-400 hover:text-blue-300 cursor-pointer p-2"
            title={`Repeats ${task.repeat} on this day.`}
            onClick={() => {
              setShowRepeatInfo(true);
              setTimeout(() => setShowRepeatInfo(false), 5000);
            }}
          />
          {showRepeatInfo && (
            <div className="absolute right-1  bg-gray-800 text-white text-sm px-3 py-2 rounded shadow-lg z-50 whitespace-nowrap">
              Repeats <b className=" text-blue-400">{task.repeat}</b>&nbsp;on
              this day.
            </div>
          )}
        </div>
      )}

      <div
        className="absolute top-1 right-1  text-white rounded-full px-1.5 py-0.5 hover:bg-gray-600 transition duration-200"
        ref={dropdownRef}
      >
        <FontAwesomeIcon
          icon={faEllipsisV}
          className="w-4 h-4"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      </div>

      {dropdownOpen && (
        <div
          className="absolute right-4 top-8 w-25 bg-transparent rounded-md shadow-lg  z-50 space-y-1"
          ref={dropdownRef}
        >
          <Link href={`/edit/${task._id}`}>
            <button
              className={`w-full flex items-center justify-start gap-2 px-4 py-2 text-sm rounded-t-md transition-colors ${
                task.completed
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed opacity-60"
                  : "bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer"
              }`}
              disabled={task.completed}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span>Edit</span>
            </button>
          </Link>

          <button
            className="w-full flex items-center justify-start gap-2 px-4 py-2 text-sm rounded-b-md bg-red-600 hover:bg-red-700 text-white transition-colors"
            onClick={() => deleteTask(task._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </li>
  );
}
