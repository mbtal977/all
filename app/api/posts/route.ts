import { db, id, addMemoryThread } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function GET() {
  return ok(db.posts);
}

export async function POST(req: Request) {
  const body = await readJson(req);
  const post = {
    id: id('po'),
    author_id: String(body.author_id ?? 'u1'),
    company_id: body.company_id ? String(body.company_id) : null,
    content: String(body.content ?? ''),
    media_url: body.media_url ? String(body.media_url) : null,
    likes: 0,
    created_at: new Date().toISOString()
  };
  db.posts.unshift(post);
  addMemoryThread(post.company_id ?? 'public', null, 'post', post.content, { post_id: post.id });
  return ok(post, 201);
}
