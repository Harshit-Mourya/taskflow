"use client";

import { useEffect } from "react";
import CalendarView from "../calendar/CalendarView";
import { useTaskFilter } from "@/context/TaskFilterContext.jsx";
import WelcomeHome from "./WelcomeHome";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  const { taskData, loadTasks } = useTaskFilter();
  const { pendingTasks } = taskData;

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 text-white px-4 py-8 sm:px-6">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <WelcomeHome />

        {user ? (
          <>
            <p className="text-xl text-green-400 font-medium mt-2">
              Welcome back, {user.username || user.email.split("@")[0]} 👋
            </p>
            <p className="mb-6 text-lg">Let’s get you back on track!</p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 hover:bg-purple-600 rounded border border-purple-600 transition"
            >
              Go to Dashboard
            </Link>
          </>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              href="/register"
              className="px-6 py-3 border border-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Login
            </Link>
          </div>
        )}

        <CalendarView />

        {/* {pendingTasks.length > 0 && (
          <div className="mt-8 w-full">
            <TaskList tasks={pendingTasks} title="🕒 Pending Tasks" />
          </div>
        )} */}
      </div>
    </div>
  );
}

// "use client";

// import { useEffect } from "react";
// import TaskList from "@/components/tasklist/TaskList";
// import { useTaskFilter } from "@/context/TaskFilterContext.jsx";
// import WelcomeHome from "./WelcomeHome";

// import Link from "next/link";
// import useAuth from "@/hooks/useAuth";

// export default function Home() {
//   const { user } = useAuth();
//   const { taskData, loadTasks } = useTaskFilter();
//   const { pendingTasks } = taskData;

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   return (
//     <div className="min-h-screen  flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 text-white px-4 py-8 sm:px-6">
//       <WelcomeHome />

//       {user ? (
//         <>
//           <p className="text-xl text-green-400 font-medium mb-2">
//             Welcome back, {user.username || user.email.split("@")[0]} 👋
//           </p>
//           <p className="mb-6 text-xl">Let’s get you back on track!</p>
//           <Link
//             href="/dashboard"
//             className="px-6 py-3 hover:bg-purple-600 rounded border border-purple-600 transition"
//           >
//             Go to Dashboard
//           </Link>
//         </>
//       ) : (
//         <>
//           <div className="space-x-4 mt-6">
//             <Link
//               href="/register"
//               className="px-6 py-3 border border-purple-600 rounded-lg hover:bg-purple-700 transition"
//             >
//               Register
//             </Link>
//             <Link
//               href="/login"
//               className="px-6 py-3 border border-purple-600 rounded-lg hover:bg-purple-700 transition"
//             >
//               Login
//             </Link>
//           </div>
//         </>
//       )}
//       <div className="mt-6 w-full">
//         {pendingTasks.length > 0 && (
//           <TaskList tasks={pendingTasks} title="🕒 Pending Tasks" />
//         )}
//       </div>
//     </div>
//   );
// }
