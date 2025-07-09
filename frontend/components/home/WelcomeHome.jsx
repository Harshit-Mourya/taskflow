"use client";

export default function WelcomeHome() {
  return (
    <div className="mb-6 text-center  flex flex-col justify-center items-center">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 ">
        Welcome to <span className="text-purple-500">TaskFlow</span>
      </h1>

      <p className={"text-lg text-gray-300 sm:max-w-md max-w-sm"}>
        Effortlessly manage your tasks, stay organized, and boost productivity
        with our minimalist task tracker.
      </p>
    </div>
  );
}
