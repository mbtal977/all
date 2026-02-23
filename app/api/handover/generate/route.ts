import { db, id } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function POST(req: Request) {
  const body = await readJson(req);
  const projectId = String(body.project_id ?? '');
  const project = db.projects.find((p) => p.id === projectId) as Record<string, unknown> | undefined;
  const tasks = db.tasks.filter((t) => t.project_id === projectId);
  const memory = db.memoryThreads.filter((m) => m.project_id === projectId);

  const handover = {
    id: id('hp'),
    company_id: String(body.company_id ?? 'unknown'),
    project_id: projectId,
    owner_id: String(body.owner_id ?? 'u1'),
    package_json: {
      project,
      active_tasks: tasks,
      memory_highlights: memory.slice(0, 8),
      stakeholders: body.stakeholders ?? [],
      generated_at: new Date().toISOString()
    },
    export_url: `/api/handover/${projectId}`,
    created_at: new Date().toISOString()
  };

  db.handoverPackages.unshift(handover);
  return ok(handover, 201);
}
