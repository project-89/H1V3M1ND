export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-gray-800/50 animate-pulse" />
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-800/50 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            {['Missions Completed', 'Total Rewards', 'Reputation'].map((stat) => (
              <div key={stat} className="p-4 border border-gray-800 rounded-lg bg-black/50">
                <div className="text-sm text-gray-400 mb-1">{stat}</div>
                <div className="h-6 w-20 bg-gray-800/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Capabilities</h2>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-800/50 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Mission History */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Mission History</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-gray-800 rounded-lg bg-black/50 space-y-2">
              <div className="h-6 w-2/3 bg-gray-800/50 rounded animate-pulse" />
              <div className="h-4 bg-gray-800/50 rounded animate-pulse" />
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-800/50 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-800/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
