'use client';

import Link from 'next/link';
import { ReactNode, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type PlatformMode = 'public' | 'company';

type NavItem = {
  label: string;
  href: string;
  icon: string;
  group: 'main' | 'workspace';
};

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: '⌂', group: 'main' },
  { label: 'Network', href: '/network', icon: '◎', group: 'main' },
  { label: 'Workspace', href: '/workspace', icon: '▦', group: 'workspace' },
  { label: 'Projects', href: '/projects', icon: '◇', group: 'workspace' },
  { label: 'Tasks', href: '/tasks', icon: '✓', group: 'workspace' },
  { label: 'Meetings', href: '/meetings', icon: '◍', group: 'workspace' },
  { label: 'Memory', href: '/memory', icon: '◌', group: 'workspace' },
  { label: 'Handover', href: '/handover', icon: '↗', group: 'workspace' },
  { label: 'Analytics', href: '/analytics', icon: '◬', group: 'workspace' },
  { label: 'Settings', href: '/settings', icon: '⚙', group: 'workspace' }
] as const;

function LogoMark() {
  return (
    <motion.div
      initial={{ opacity: 0.8, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      className="group inline-flex items-center gap-2"
    >
      <motion.div
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-sm font-semibold"
        animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0.0)', '0 0 16px rgba(59,130,246,0.35)', '0 0 0px rgba(59,130,246,0.0)'] }}
        transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.5 }}
      >
        A1
      </motion.div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">ALLoul One</p>
        <p className="text-sm font-medium text-white">Command Hub</p>
      </div>
    </motion.div>
  );
}

function ModeSwitch({ mode, setMode }: { mode: PlatformMode; setMode: (mode: PlatformMode) => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-white/20 bg-white/10 p-1 text-xs">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 36 }}
        className={[
          'absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full',
          mode === 'public' ? 'left-1 bg-sky-400/35' : 'left-[calc(50%+3px)] bg-violet-400/35'
        ].join(' ')}
      />
      <button onClick={() => setMode('public')} className="relative z-10 rounded-full px-3 py-1.5 text-slate-200">
        Public Platform
      </button>
      <button onClick={() => setMode('company')} className="relative z-10 rounded-full px-3 py-1.5 text-slate-200">
        Company Workspace
      </button>
    </div>
  );
}

function NavSection({ title, items, pathname, mode }: { title: string; items: readonly NavItem[]; pathname: string; mode: PlatformMode }) {
  return (
    <section className="space-y-2">
      <h2 className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</h2>
      <div className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
          return (
            <Link
              key={item.href}
              href={item.href as never}
              className={[
                'group glass-interactive flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                active
                  ? mode === 'public'
                    ? 'accent-ring bg-sky-300/25 text-slate-100'
                    : 'accent-ring bg-violet-300/25 text-slate-100'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              ].join(' ')}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center text-[13px] text-slate-300" aria-hidden>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<PlatformMode>('public');

  const mainItems = useMemo(() => nav.filter((item) => item.group === 'main'), []);
  const workspaceItems = useMemo(() => nav.filter((item) => item.group === 'workspace'), []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`mx-auto grid min-h-screen w-full max-w-[1600px] gap-4 px-3 py-4 sm:px-4 lg:grid-cols-[260px_1fr_320px] ${
        mode === 'public' ? 'mode-public' : 'mode-company'
      }`}
    >
      <aside className="glass-card sticky top-4 hidden h-[calc(100vh-2rem)] flex-col p-4 lg:flex">
        <div className="mb-4 border-b border-white/10 pb-4">
          <LogoMark />
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          <NavSection title="Main" items={mainItems} pathname={pathname} mode={mode} />
          <NavSection title="Workspace" items={workspaceItems} pathname={pathname} mode={mode} />
        </div>

        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
          <button className="glass-interactive w-full rounded-xl bg-white py-2 text-sm font-semibold text-slate-900">Create Post</button>
          <div className="rounded-xl border border-white/15 bg-white/10 p-2.5">
            <p className="text-sm font-medium text-slate-100">Demo User</p>
            <p className="text-xs text-slate-400">demo@alloul.one</p>
          </div>
        </div>
      </aside>

      <div className="space-y-4 pb-6">
        <header className="glass-card flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="w-full max-w-md rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-300">Search anything in platform...</div>
          <ModeSwitch mode={mode} setMode={setMode} />
        </header>
        <motion.main key={mode} initial={{ opacity: 0.88, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="space-y-4">
          {children}
        </motion.main>
      </div>

      <aside className="glass-card sticky top-4 hidden h-[calc(100vh-2rem)] space-y-4 overflow-y-auto p-4 lg:block">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">AI Assistant</h3>
          <p className="mt-2 text-sm text-slate-300">
            {mode === 'public' ? 'Community and social insights in real time.' : 'Company execution insights and team momentum.'}
          </p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/[0.08] p-3 text-sm text-slate-200">
          <p>• 3 tasks at risk this week</p>
          <p>• 2 new partnership leads</p>
          <p>• Handover package ready for Project Orion</p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/[0.08] p-3 text-sm text-slate-300">
          <p className="font-medium text-slate-100">Recommended next step</p>
          <p className="mt-1 text-xs leading-5">Schedule a 15-minute project sync and assign owners for pending blockers.</p>
        </div>
      </aside>
    </motion.div>
  );
}
