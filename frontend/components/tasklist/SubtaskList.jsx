"use client";

import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import SubtaskItem from "./SubtaskItem";

export default function SubtaskList({ taskId, subtasks, onToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  if (!subtasks || subtasks.length === 0) return null;

  return (
    <div className="mt-2 bg-gray-700 rounded p-2">
      <div ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2"
        >
          <p className="text-sm font-semibold text-gray-300 mb-1">Subtasks</p>

          <FontAwesomeIcon
            icon={dropdownOpen ? faChevronUp : faChevronDown}
            className="w-2 h-2"
          />
        </button>
      </div>
      {dropdownOpen && (
        <ul className="space-y-1">
          {subtasks.map((sub, idx) => (
            <SubtaskItem
              key={idx}
              subtask={sub}
              index={idx}
              taskId={taskId}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
