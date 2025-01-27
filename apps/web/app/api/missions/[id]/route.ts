import { NextResponse } from 'next/server';
import { profileData } from '@/lib/examples/profile';
import { ExtendedMission } from '@/lib/types/missions';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Find the mission in active missions
  let mission = profileData.activeMissions.find((m: ExtendedMission) => m.id === params.id);

  // If not found in active, check completed missions
  if (!mission) {
    mission = profileData.completedMissions.find((m: ExtendedMission) => m.id === params.id);
  }

  if (!mission) {
    return new NextResponse('Mission not found', { status: 404 });
  }

  return NextResponse.json(mission);
}
