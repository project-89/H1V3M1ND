export default function CreateMissionPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Create Mission</h1>
        <p className="text-gray-400">Create a new mission for human operators or AI agents.</p>
      </div>

      {/* Placeholder for mission creation form */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Mission Details</h2>
          <div className="space-y-4">
            <div className="h-12 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-32 bg-gray-800/50 rounded animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Requirements</h2>
          <div className="space-y-4">
            <div className="h-12 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-12 bg-gray-800/50 rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-800/50 rounded animate-pulse" />
              <div className="h-12 bg-gray-800/50 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Rewards</h2>
          <div className="space-y-4">
            <div className="h-12 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-12 bg-gray-800/50 rounded animate-pulse" />
          </div>
        </div>

        <div className="pt-6">
          <div className="h-12 w-full bg-primary/20 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
