import { ExternalLink, Map, DollarSign, LayoutDashboard, Target } from 'lucide-react'
import { Reveal, SectionTag, Spot } from '../components/ui'

// Para adicionar um projeto, inclua um objeto neste array.
const projetos = [
  {
    id: 'financas',
    icon: DollarSign,
    hue: '34,229,255',
    destaque: true,
    status: 'Em produção',
    live: true,
    nome: 'Finanças Pessoais',
    tipo: 'Sistema Web + App Android',
    desc: 'Sistema self-hosted de controle financeiro pessoal com lançamentos, importação de extratos (OFX/PDF), recorrentes, automações, dashboard e app Android.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'React Native', 'Expo'],
    links: [{ label: 'Abrir Web App', icon: ExternalLink, href: 'https://financas.brainstech.com.br', primary: true }],
  },
  {
    id: 'umbler',
    icon: LayoutDashboard,
    hue: '167,139,250',
    destaque: false,
    status: 'Uso interno',
    nome: 'Dashboard Umbler',
    tipo: 'Dashboard de Atendimento',
    desc: 'Painel de métricas de suporte integrado à Umbler — TMA, SLA, volume de tickets e desempenho de atendentes em tempo real.',
    stack: ['HTML5', 'JavaScript', 'CSS3', 'API REST'],
    links: [],
  },
  {
    id: 'apostas',
    icon: Target,
    hue: '59,130,246',
    destaque: true,
    status: 'Em produção',
    live: true,
    nome: 'Controle de Apostas',
    tipo: 'Sistema Web + App Android',
    desc: 'Gestão de apostas esportivas: registro, controle de banca por casa, transferências entre reserva e casas, estatísticas e gráficos de evolução.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'React Native', 'Expo'],
    links: [{ label: 'Acessar App', icon: ExternalLink, href: 'https://controledeapostas.com.br', primary: true }],
  },
  {
    id: 'ets2',
    icon: Map,
    hue: '255,181,71',
    destaque: false,
    status: 'Projeto pessoal',
    nome: 'Waze para ETS2',
    tipo: 'Mod / Dashboard Mobile',
    desc: 'Telemetria em tempo real do Euro Truck Simulator 2 no celular, como um GPS — velocidade, RPM, carga e rota.',
    stack: ['HTML5', 'JavaScript', 'Cordova', 'WebSocket'],
    links: [],
  },
]

function Pulse({ hue }) {
  return (
    <svg viewBox="0 0 300 60" className="h-14 w-full" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 40 L40 40 L55 12 L75 52 L95 28 L120 40 L170 40 L185 8 L205 50 L225 30 L250 40 L300 40" stroke={`rgb(${hue})`} strokeWidth="1.6" strokeDasharray="8 6" style={{ animation: 'dash 5s linear infinite', filter: `drop-shadow(0 0 4px rgb(${hue}))` }} />
    </svg>
  )
}

function ProjetoCard({ projeto, i }) {
  const { icon: Icon, hue, destaque, status, live, nome, tipo, desc, stack, links } = projeto
  return (
    <Reveal delay={(i % 2) * 120} className={destaque ? 'md:col-span-2' : ''}>
      <Spot className="group flex h-full flex-col">
        <div className="relative border-b border-white/10 p-6" style={{ background: `linear-gradient(135deg, rgba(${hue},0.16), transparent 70%)` }}>
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-black/30 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ borderColor: `rgba(${hue},0.4)` }}>
              <Icon size={22} style={{ color: `rgb(${hue})` }} />
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60">
              <i className={`h-1.5 w-1.5 rounded-full ${live ? 'animate-pulse' : ''}`} style={{ background: live ? '#34d399' : `rgb(${hue})` }} />
              {status}
            </span>
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{tipo}</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-white md:text-2xl">{nome}</h3>
          <div className="mt-2 opacity-70">
            <Pulse hue={hue} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm leading-relaxed text-white/55">{desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/55">{s}</span>
            ))}
          </div>
          <div className="mt-auto pt-6">
            {links.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {links.map(({ label, icon: L, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn-solid !px-5 !py-2.5 !text-[13px]">
                    <L size={15} /> {label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="font-mono text-[11px] text-white/25">{'// sem demo pública'}</p>
            )}
          </div>
        </div>
      </Spot>
    </Reveal>
  )
}

export default function Projetos() {
  return (
    <section id="projetos" className="relative overflow-hidden bg-void py-28 md:py-36">
      <div className="absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-volt/15 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <SectionTag n="05">Portfólio</SectionTag>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl">
            Sistemas <span className="text-grad">no ar</span>, não slides.
          </h2>
          <p className="mt-5 text-lg text-white/55">Projetos reais — dá para abrir, usar e testar. Todos construídos com IA, sob direção técnica minha.</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {projetos.map((p, i) => (
            <ProjetoCard key={p.id} projeto={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
