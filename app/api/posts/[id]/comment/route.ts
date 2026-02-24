import { db, id, addMemoryThread } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readJson(req);
  const comment = { id: id('co'), post_id: params.id, user_id: String(body.user_id ?? 'u1'), content: String(body.content ?? ''), created_at: new Date().toISOString() };
  db.comments.unshift(comment);
  addMemoryThread('public', null, 'comment', comment.content, { post_id: params.id, comment_id: comment.id });
  return ok(comment, 201);
}
