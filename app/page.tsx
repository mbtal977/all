import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="card">
        <h2 className="text-xl font-semibold">Hybrid Feed</h2>
        <p className="mt-2 text-sm text-slate-300">Actionable social + company updates in one stream.</p>
        <form className="mt-4 space-y-2" action="/api/posts" method="post">
          <textarea name="content" className="w-full rounded-xl bg-slate-900 p-3 text-sm" placeholder="Share an update..." />
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium">Create Post</button>
        </form>
      </section>
      <section className="grid grid-cols-2 gap-4">
        <article className="card">
          <h3 className="font-medium">MVP Modules</h3>
          <ul className="mt-2 list-disc pl-6 text-sm text-slate-300">
            <li>Public feed with engagement</li>
            <li>Company workspace with projects/tasks</li>
            <li>AI chat + memory search</li>
            <li>Handover Studio v1</li>
          </ul>
        </article>
        <article className="card">
          <h3 className="font-medium">Quick Actions</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <Link className="rounded-lg bg-emerald-600 px-3 py-2" href="/workspace">Create Company</Link>
            <Link className="rounded-lg bg-indigo-600 px-3 py-2" href="/projects">Create Project</Link>
            <Link className="rounded-lg bg-fuchsia-600 px-3 py-2" href="/handover">Generate Handover</Link>
          </div>
        </article>
      </section>
    </>
  );
}
