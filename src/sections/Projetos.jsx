import { ExternalLink, Map, DollarSign, LayoutDashboard } from 'lucide-react'

const projetos = [
  {
    id: 'financas',
    icon: DollarSign,
    gradient: 'from-brand-700/80 to-brand-500/50',
    border: 'border-brand-500/30',
    iconColor: 'text-brand-300',
    destaque: true,
    nome: 'Finanças Pessoais',
    tipo: 'Sistema Web + App Android',
    desc:
      'Sistema self-hosted de controle financeiro pessoal com lançamentos, importação de extratos (OFX/PDF), recorrentes, automações, dashboard e app Android. Em produção.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'React Native', 'Expo'],
    links: [
      { label: 'Abrir Web App', icon: ExternalLink, href: 'https://financas.brainstech.com.br', primary: true },
    ],
  },
  {
    id: 'umbler',
    icon: LayoutDashboard,
    gradient: 'from-purple-900/80 to-purple-700/50',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-300',
    destaque: false,
    nome: 'Dashboard Umbler',
    tipo: 'Dashboard de Atendimento',
    desc:
      'Painel de métricas operacionais de suporte integrado à plataforma Umbler — TMA, SLA, volume de tickets e desempenho de atendentes em tempo real.',
    stack: ['HTML5', 'JavaScript', 'CSS3', 'API REST'],
    links: [],
  },
  {
    id: 'ets2',
    icon: Map,
    gradient: 'from-slate-800/80 to-slate-600/50',
    border: 'border-white/10',
    iconColor: 'text-slate-300',
    destaque: false,
    nome: 'Waze para ETS2',
    tipo: 'Mod / Dashboard Mobile',
    desc:
      'Dashboard de telemetria em tempo real para Euro Truck Simulator 2, exibido no celular como GPS — velocidade, RPM, carga e rota.',
    stack: ['HTML5', 'JavaScript', 'Cordova', 'WebSocket'],
    links: [],
  },
]

function ProjetoCard({ projeto }) {
  const { icon: Icon, gradient, border, iconColor, destaque, nome, tipo, desc, stack, links } = projeto

  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-white/20 hover:bg-white/[0.07] transition-all ${
        destaque ? 'md:col-span-2' : ''
      }`}
    >
      {/* header */}
      <div className={`bg-gradient-to-br ${gradient} border-b ${border} p-6 flex items-center gap-4`}>
        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">{tipo}</p>
          <h3 className="text-white font-bold text-lg leading-tight">{nome}</h3>
        </div>
      </div>

      {/* body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-white/50 text-sm leading-relaxed mb-5">{desc}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] font-medium bg-white/5 border border-white/10 text-white/50 px-2.5 py-1 rounded"
            >
              {s}
            </span>
          ))}
        </div>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-auto">
            {links.map(({ label, icon: LinkIcon, href, primary }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                  primary
                    ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/30'
                    : 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </div>
        )}

        {links.length === 0 && (
          <p className="font-mono text-white/25 text-xs mt-auto">// projeto pessoal · sem demo pública</p>
        )}
      </div>
    </div>
  )
}

export default function Projetos() {
  return (
    <section id="projetos" className="py-24 bg-space-900 relative overflow-hidden">
      {/* dot matrix */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #93C5FD 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-brand-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="inline-flex items-center text-brand-300 bg-brand-500/10 border border-brand-500/20 font-semibold text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full">
            Projetos
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-brand-300 bg-clip-text text-transparent">
            O que já construí
          </h2>
          <p className="mt-3 text-white/40 max-w-xl mx-auto">
            Projetos reais — alguns em produção, outros por pura curiosidade técnica. Todos desenvolvidos com IA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projetos.map((p) => (
            <ProjetoCard key={p.id} projeto={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
