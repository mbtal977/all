import { NextResponse } from 'next/server';

export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export async function readJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}
