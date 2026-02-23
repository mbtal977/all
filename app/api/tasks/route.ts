import { db, id, addMemoryThread } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function GET() {
  return ok(db.tasks);
}

export async function POST(req: Request) {
  const body = await readJson(req);
  const task = {
    id: id('ta'),
    project_id: String(body.project_id ?? ''),
    title: String(body.title ?? 'New Task'),
    description: String(body.description ?? ''),
    assignee_id: String(body.assignee_id ?? 'u1'),
    priority: String(body.priority ?? 'medium'),
    status: String(body.status ?? 'todo'),
    due_date: body.due_date ? String(body.due_date) : null,
    created_at: new Date().toISOString()
  };
  db.tasks.unshift(task);
  addMemoryThread(String(body.company_id ?? 'unknown'), task.project_id, 'task', `Task: ${task.title}`, { task_id: task.id });
  return ok(task, 201);
}
