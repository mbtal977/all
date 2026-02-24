import { ok, readJson } from '@/lib/response';

export async function POST(req: Request) {
  const body = await readJson(req);
  const text = String(body.text ?? '');
  const summary = text.length > 140 ? `${text.slice(0, 140)}...` : text;
  return ok({ summary });
}
