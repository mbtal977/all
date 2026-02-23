import { db } from '@/lib/store';
import { ok } from '@/lib/response';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const post = db.posts.find((p) => p.id === params.id) as { likes?: number } | undefined;
  if (!post) return ok({ error: 'Post not found' }, 404);
  post.likes = (post.likes ?? 0) + 1;
  return ok(post);
}
