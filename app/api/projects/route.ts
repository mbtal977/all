import { db, id, addMemoryThread } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function GET() {
  return ok(db.projects);
}

export async function POST(req: Request) {
  const body = await readJson(req);
  const project = {
    id: id('pr'),
    company_id: String(body.company_id ?? ''),
    title: String(body.title ?? 'New Project'),
    description: String(body.description ?? ''),
    status: String(body.status ?? 'active'),
    created_at: new Date().toISOString()
  };
  db.projects.unshift(project);
  addMemoryThread(project.company_id, project.id, 'project', `Project created: ${project.title}`, { project_id: project.id });
  return ok(project, 201);
}
