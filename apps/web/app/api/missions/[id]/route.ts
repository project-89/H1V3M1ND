import { NextResponse } from 'next/server';
import { sampleMissions } from '@/lib/examples/missions';
import { Mission } from '@H1V3M1ND/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Find the mission in sample missions
  const mission = sampleMissions.find((m: Mission) => m.id === params.id);

  if (!mission) {
    return new NextResponse('Mission not found', { status: 404 });
  }

  return NextResponse.json(mission);
}
