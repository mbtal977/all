import { db, addMemoryThread } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function GET() {
  return ok(db.memoryThreads);
}

export async function POST(req: Request) {
  const body = await readJson(req);
  const thread = addMemoryThread(
    String(body.company_id ?? 'unknown'),
    body.project_id ? String(body.project_id) : null,
    String(body.type ?? 'note'),
    String(body.summary ?? ''),
    body.links_json ?? {}
  );
  return ok(thread, 201);
}
