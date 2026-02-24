import { ok } from '@/lib/response';

export async function GET() {
  return ok({ message: 'NextAuth endpoint placeholder. Configure providers in production.' });
}

export async function POST() {
  return ok({ message: 'Auth action placeholder' });
}
