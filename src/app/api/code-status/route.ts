import { activeCodes, previousCodes, expiredCodes } from '@/data/volleyball';
import { codeDataRevision } from '@/data/codes-automation';
export const dynamic = 'force-static';
export function GET() {
  return Response.json({ revision: codeDataRevision, active: activeCodes.map(c => ({ code: c.code, reward: c.reward })), previous: previousCodes.map(c => c.code), expired: expiredCodes.map(c => c.code) });
}
