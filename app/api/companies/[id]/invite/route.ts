import { db, id } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await readJson(req);
  const member = {
    id: id('cm'),
    company_id: params.id,
    user_id: String(body.user_id ?? id('u')),
    role: String(body.role ?? 'member'),
    permissions: body.permissions ?? ['projects:read', 'tasks:write']
  };
  db.companyMembers.unshift(member);
  return ok(member, 201);
}
