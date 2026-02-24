import { db } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const project = db.projects.find((p) => p.id === params.id);
  return project ? ok(project) : ok({ error: 'Project not found' }, 404);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const project = db.projects.find((p) => p.id === params.id) as Record<string, unknown> | undefined;
  if (!project) return ok({ error: 'Project not found' }, 404);
  const body = await readJson(req);
  Object.assign(project, body);
  return ok(project);
}
