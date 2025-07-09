export default function Loader() {
  return (
    <div className="min-h-[92vh] flex items-center justify-center bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500"></div>
      <span className="ml-4 text-lg">Loading...</span>
    </div>
  );
}
