import { db } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function POST(req: Request) {
  const body = await readJson(req);
  const query = String(body.query ?? '');
  const context = [...db.projects, ...db.tasks, ...db.posts].slice(0, 6);
  return ok({
    answer: `AI assistant summary for: "${query}". I found ${context.length} related records in your workspace memory.`,
    context
  });
}
