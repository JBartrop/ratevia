'use client';

import { useEffect, useState } from 'react';

function getSystemPrefersDark() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: light)').matches;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    (typeof window !== 'undefined' && (localStorage.getItem('theme') as 'light' | 'dark')) ||
    (getSystemPrefersDark() ? 'dark' : 'light')
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={theme === 'dark'}
      className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2
                 hover:-translate-y-0.5 transition
                 border-[rgb(var(--muted))]/30
                 bg-[rgb(var(--card))] text-[rgb(var(--fg))]"
    >
      {/* Simple icons (emoji) to keep it dependency-free */}
      <span className="text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
      <span className="text-sm">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
