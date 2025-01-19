import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export function MissionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-glow-pink">Active Missions</h1>
        <Link href="/missions/create">
          <Button className="bg-neon-pink hover:bg-neon-pink/80 text-black font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Create Mission
          </Button>
        </Link>
      </div>

      {/* ... existing code ... */}
    </div>
  );
}
