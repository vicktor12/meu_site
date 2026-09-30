const row1 = ['React', 'Node.js', 'PostgreSQL', 'React Native', 'Expo', 'Docker', 'REST APIs', 'Tailwind', 'Vite', 'Git']
const row2 = ['Automação', 'CNAB', 'PDF', 'Excel', 'Cron Jobs', 'Dashboards', 'SLA / TMA', 'Deploy', 'Suporte Remoto', 'IA Generativa']

function Row({ items, rev }) {
  const list = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div className={`marquee ${rev ? 'rev' : ''}`}>
        {list.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-display text-2xl font-medium uppercase tracking-tight text-transparent md:text-4xl" style={{ WebkitTextStroke: '1px rgba(147,197,253,0.35)' }}>
            {t}
            <span className="mx-6 text-lg text-neon md:mx-10" style={{ WebkitTextStroke: 0 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative space-y-3 overflow-hidden border-y border-white/5 bg-ink-900 py-8" aria-hidden="true">
      <Row items={row1} />
      <Row items={row2} rev />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
    </div>
  )
}
