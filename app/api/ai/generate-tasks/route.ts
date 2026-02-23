import { ok, readJson } from '@/lib/response';

export async function POST(req: Request) {
  const body = await readJson(req);
  const prompt = String(body.prompt ?? '');
  return ok({
    tasks: [
      { title: `Draft scope from: ${prompt.slice(0, 30)}`, priority: 'high' },
      { title: 'Assign owner and due date', priority: 'medium' },
      { title: 'Review risks and blockers', priority: 'medium' }
    ]
  });
}
