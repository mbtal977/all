const sections = [
  {
    title: 'Company Setup',
    description: 'Create companies, define ownership, and configure collaboration settings.',
    metric: '4 spaces'
  },
  {
    title: 'Team Invitations',
    description: 'Invite members with role-based permissions for projects, tasks, and meetings.',
    metric: '12 pending'
  },
  {
    title: 'Private Collaboration',
    description: 'Manage internal updates, attach files, and keep organizational memory searchable.',
    metric: '86 threads'
  }
] as const;

export default function WorkspacePage() {
  return (
    <section className="space-y-4">
      <header className="glass-card glass-interactive">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Workspace</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Company Workspace</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-300">
              Centralize company operations with structured teams, project visibility, and controlled access.
            </p>
          </div>
          <button className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/10">
            Create Workspace
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <article key={section.title} className="glass-card glass-interactive">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{section.metric}</p>
            <h3 className="mt-1 text-base font-semibold text-white">{section.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{section.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
