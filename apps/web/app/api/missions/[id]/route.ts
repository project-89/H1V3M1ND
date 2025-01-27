import { profileData } from '@/lib/examples/profile';
import { ExtendedMission } from '@/lib/types/missions';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const mission = [...profileData.activeMissions, ...profileData.completedMissions].find(
    (m) => m.id === params.id
  );

  if (!mission) {
    return new Response('Mission not found', { status: 404 });
  }

  return Response.json(mission);
}
