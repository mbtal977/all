export type Entity = Record<string, unknown>;

const now = () => new Date().toISOString();

export const db = {
  users: [{ id: 'u1', name: 'Demo User', email: 'demo@alloul.one', created_at: now() }],
  companies: [] as Entity[],
  companyMembers: [] as Entity[],
  posts: [] as Entity[],
  comments: [] as Entity[],
  projects: [] as Entity[],
  projectMembers: [] as Entity[],
  tasks: [] as Entity[],
  messages: [] as Entity[],
  files: [] as Entity[],
  meetings: [] as Entity[],
  decisions: [] as Entity[],
  memoryThreads: [] as Entity[],
  handoverPackages: [] as Entity[]
};

export function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function addMemoryThread(company_id: string, project_id: string | null, type: string, summary: string, links_json: Entity = {}) {
  const thread = {
    id: id('mem'),
    company_id,
    project_id,
    type,
    summary,
    links_json,
    embedding_ref: null,
    created_at: now()
  };
  db.memoryThreads.unshift(thread);
  return thread;
}
