import Link from 'next/link';
import { ReactNode } from 'react';

const nav = [
  ['Home', '/'],
  ['Network', '/network'],
  ['Workspace', '/workspace'],
  ['Projects', '/projects'],
  ['Tasks', '/tasks'],
  ['Meetings', '/meetings'],
  ['Memory', '/memory'],
  ['Handover', '/handover'],
  ['Analytics', '/analytics'],
  ['Settings', '/settings']
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[220px_1fr_320px] gap-4 p-4">
      <aside className="card space-y-3">
        <h1 className="text-lg font-semibold">ALLoul One</h1>
        <p className="text-xs text-slate-300">Social + Work + AI</p>
        <nav className="space-y-2 pt-2 text-sm">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded-lg px-3 py-2 hover:bg-white/10">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="space-y-4">{children}</main>
      <aside className="card space-y-4">
        <h2 className="font-medium">AI Assistant</h2>
        <p className="text-sm text-slate-300">Daily summary and quick insights appear here.</p>
        <div className="rounded-xl bg-slate-900/60 p-3 text-sm text-slate-200">
          <p>• 3 tasks at risk this week</p>
          <p>• 2 new partnership leads</p>
          <p>• Handover package ready for Project Orion</p>
        </div>
      </aside>
    </div>
  );
}
