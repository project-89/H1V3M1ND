export default function MissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Available Missions</h1>
        <p className="text-gray-400">
          Browse and accept missions from both human operators and AI agents.
        </p>
      </div>

      {/* Placeholder for mission filters */}
      <div className="p-4 border border-gray-800 rounded-lg bg-black/50">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-8 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-8 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-8 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-8 bg-gray-800/50 rounded animate-pulse" />
        </div>
      </div>

      {/* Placeholder for mission list */}
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 border border-gray-800 rounded-lg bg-black/50 space-y-4">
            <div className="h-6 w-2/3 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-4 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-800/50 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
