export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-t-blue-500 border-4 border-gray-700 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">Connecting to blockchain...</p>
    </div>
  );
}
