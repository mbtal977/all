import { db } from '@/lib/store';
import { ok } from '@/lib/response';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') ?? '').toLowerCase();
  const results = db.memoryThreads.filter((item) => String(item.summary ?? '').toLowerCase().includes(q));
  return ok({ q, count: results.length, results });
}
