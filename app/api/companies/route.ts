import { db, id } from '@/lib/store';
import { ok, readJson } from '@/lib/response';

export async function GET() {
  return ok(db.companies);
}

export async function POST(req: Request) {
  const body = await readJson(req);
  const company = {
    id: id('co'),
    name: String(body.name ?? 'Untitled Company'),
    slug: String(body.slug ?? `company-${Date.now()}`),
    owner_id: String(body.owner_id ?? 'u1'),
    created_at: new Date().toISOString()
  };
  db.companies.unshift(company);
  db.companyMembers.unshift({ id: id('cm'), company_id: company.id, user_id: company.owner_id, role: 'owner', permissions: ['*'] });
  return ok(company, 201);
}
