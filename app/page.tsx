import Link from 'next/link';

const quickStats = [
  { label: 'Active teams', value: '12' },
  { label: 'Open projects', value: '27' },
  { label: 'Tasks due this week', value: '41' }
];

const filters = ['Posts', 'Job updates', 'Location', 'Most liked'] as const;

const feedPosts = [
  {
    author: 'Elon Musk',
    role: 'Product Vision Update',
    content:
      'Hiring for SpaceX! We are scaling product, engineering, and design teams for our next launch cycle. Looking for builders with strong execution mindset.',
    meta: '36m ago',
    image: 'https://images.unsplash.com/photo-1512508497404-cfa1fddc6478?auto=format&fit=crop&w=1400&q=80',
    reactions: '1,842'
  },
  {
    author: 'Your Brand',
    role: 'Internal memo',
    content:
      'New onboarding workflow is now live in the workspace. Project owners can create invite links and handover templates directly from project settings.',
    meta: '2h ago',
    image: null,
    reactions: '327'
  }
] as const;

export default function HomePage() {
  return (
    <div className="space-y-4">
      <header className="glass-card glass-interactive">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Overview</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">Hybrid Feed Dashboard</h2>
          </div>
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-slate-400">
            🔍 Search people, projects, or updates...
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {quickStats.map((stat) => (
            <article key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.08] p-3">
              <p className="text-xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </article>
          ))}
        </div>
      </header>

      <section className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <section className="glass-card glass-interactive">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Create a post</h3>
            <form className="mt-3 space-y-3" action="/api/posts" method="post">
              <textarea
                name="content"
                className="h-24 w-full rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm text-slate-100 outline-none ring-blue-500/40 transition focus:ring"
                placeholder="Share an update with your network..."
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2 text-xs text-slate-400">
                  <span className="rounded-lg bg-white/5 px-2 py-1">Media</span>
                  <span className="rounded-lg bg-white/5 px-2 py-1">Hashtag</span>
                  <span className="rounded-lg bg-white/5 px-2 py-1">Schedule</span>
                </div>
                <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900">Create Post</button>
              </div>
            </form>
          </section>

          <section className="glass-card glass-interactive">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-slate-300">Filter Feed by</p>
              {filters.map((filter) => (
                <button key={filter} className="rounded-lg border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10">
                  {filter}
                </button>
              ))}
            </div>
          </section>

          {feedPosts.map((post) => (
            <article key={post.author + post.meta} className="glass-card glass-interactive">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                  {post.author
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 text-sm">
                        <p className="font-semibold text-white">{post.author}</p>
                        <span className="text-slate-400">•</span>
                        <p className="text-slate-400">{post.meta}</p>
                      </div>
                      <p className="truncate text-xs text-slate-400">{post.role}</p>
                    </div>
                    <button className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-xs text-slate-200">+ Follow</button>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{post.content}</p>
                </div>
              </div>

              {post.image && <img src={post.image} alt="Feed media" className="mt-4 h-64 w-full rounded-xl border border-white/10 object-cover" />}

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <p className="text-xs text-slate-400">{post.reactions} reactions</p>
                <div className="flex gap-2 text-xs text-slate-300">
                  <button className="rounded-lg bg-white/5 px-3 py-1.5 hover:bg-white/10">Like</button>
                  <button className="rounded-lg bg-white/5 px-3 py-1.5 hover:bg-white/10">Comment</button>
                  <button className="rounded-lg bg-white/5 px-3 py-1.5 hover:bg-white/10">Repost</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <article className="glass-card glass-interactive">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Quick Actions</h3>
            <div className="mt-3 grid gap-2 text-sm">
              <Link className="rounded-lg border border-white/10 bg-white/[0.08] px-3 py-2 hover:bg-white/10" href="/workspace">
                Create Company
              </Link>
              <Link className="rounded-lg border border-white/10 bg-white/[0.08] px-3 py-2 hover:bg-white/10" href="/projects">
                Create Project
              </Link>
              <Link className="rounded-lg border border-white/10 bg-white/[0.08] px-3 py-2 hover:bg-white/10" href="/handover">
                Generate Handover
              </Link>
            </div>
          </article>

          <article className="glass-card glass-interactive">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Trending now</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              <li>
                <p className="font-medium text-white">China sets 34% tariffs on US goods</p>
                <p className="text-xs text-slate-400">7 hours ago • 126k readers</p>
              </li>
              <li>
                <p className="font-medium text-white">India leads in Agentic AI</p>
                <p className="text-xs text-slate-400">12 hours ago • 128k readers</p>
              </li>
              <li>
                <p className="font-medium text-white">A seismic economic moment</p>
                <p className="text-xs text-slate-400">9 hours ago • 115k readers</p>
              </li>
            </ul>
          </article>

          <article className="glass-card glass-interactive">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">You might like</h3>
            <div className="mt-3 space-y-3">
              {['Aryan Pradhan', 'Aman Kumar', 'Deepak Roy'].map((person) => (
                <div key={person} className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-2">
                  <p className="text-sm text-slate-200">{person}</p>
                  <button className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">Connect</button>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
