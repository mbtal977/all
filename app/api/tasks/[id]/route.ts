import { db } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const task = db.tasks.find((t) => t.id === params.id) as Record<string, unknown> | undefined;
  if (!task) return ok({ error: 'Task not found' }, 404);
  const body = await readJson(req);
  Object.assign(task, body);
  return ok(task);
}
