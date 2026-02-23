import { db } from '@/lib/store';
import { ok } from '@/lib/response';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const pkg = db.handoverPackages.find((h) => h.id === params.id || h.project_id === params.id);
  return pkg ? ok(pkg) : ok({ error: 'Handover package not found' }, 404);
}
