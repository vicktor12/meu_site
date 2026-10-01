import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, ChevronLeft, ChevronRight, BookOpen, FileSpreadsheet, BarChart3, Plug, Target, DollarSign, PenTool, HeartPulse } from 'lucide-react'
import { Reveal, SectionTag, Spot } from '../components/ui'

// Para adicionar um projeto, inclua um objeto neste array.
// categoria: 'Profissional' | 'Pessoal' — andamento: true = "Em andamento", false = "Finalizado"
const projetos = [
  {
    id: 'base-conhecimento',
    icon: BookOpen,
    hue: '255,181,71',
    categoria: 'Profissional',
    andamento: true,
    nome: 'Base de Conhecimento',
    tipo: 'Dados + IA local',
    desc: 'Normaliza e sanitiza todo o histórico de chats de atendimento para virar a base de um agente de suporte. Captura 100% das conversas via API, categoriza problema e solução com um modelo local e gera artigos de consulta.',
    stack: ['Node.js', 'SQLite', 'Ollama', 'RAG', 'n8n'],
    links: [],
  },
  {
    id: 'bot-pauma',
    icon: FileSpreadsheet,
    hue: '34,229,255',
    categoria: 'Profissional',
    andamento: false,
    nome: 'Bot Pauma',
    tipo: 'Automação de processos',
    desc: 'Monitora uma pasta, lê arquivos de retorno bancário (.RET) e planilhas Excel, valida clientes no ERP e gera as planilhas de importação de contas a receber — sem digitação manual.',
    stack: ['Node.js', 'Oracle', 'Excel', 'CNAB'],
    links: [],
  },
  {
    id: 'utalk-analytics',
    icon: BarChart3,
    hue: '167,139,250',
    categoria: 'Profissional',
    andamento: false,
    nome: 'UTalk Analytics',
    tipo: 'Dashboard de atendimento',
    desc: 'Painel de gestão do suporte via WhatsApp: KPIs de volume, SLA, TMA e TMR, produtividade por analista, mapa de calor de picos e sincronização automática com a API.',
    stack: ['Node.js', 'Express', 'SQLite', 'Chart.js'],
    links: [],
  },
  {
    id: 'mcp-server',
    icon: Plug,
    hue: '59,130,246',
    categoria: 'Pessoal',
    andamento: false,
    nome: 'Browser MCP Server',
    tipo: 'Servidor MCP · Open source',
    desc: 'Servidor MCP que permite à IA controlar o Chrome: navegar, clicar, preencher formulários, ler páginas e tirar screenshots usando as sessões já logadas.',
    stack: ['Node.js', 'MCP SDK', 'Playwright'],
    links: [{ label: 'Ver no GitHub', icon: Github, href: 'https://github.com/vicktor12/browser-mcp-server' }],
  },
  {
    id: 'apostas',
    icon: Target,
    hue: '52,211,153',
    categoria: 'Pessoal',
    andamento: false,
    live: true,
    nome: 'Controle de Apostas',
    tipo: 'Sistema Web + App Android',
    desc: 'Gestão de apostas esportivas: registro, controle de banca por casa, transferências entre reserva e casas, estatísticas e gráficos de evolução.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'React Native', 'Expo'],
    links: [{ label: 'Abrir App', icon: ExternalLink, href: 'https://controledeapostas.com.br' }],
  },
  {
    id: 'financas',
    icon: DollarSign,
    hue: '34,229,255',
    categoria: 'Pessoal',
    andamento: false,
    live: true,
    nome: 'Finanças Pessoais',
    tipo: 'Sistema Web + App Android',
    desc: 'Controle financeiro self-hosted com lançamentos, importação de extratos (OFX/PDF), recorrentes, automações, dashboard e app Android.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'React Native', 'Expo'],
    links: [{ label: 'Abrir App', icon: ExternalLink, href: 'https://financas.brainstech.com.br' }],
  },
  {
    id: 'excaliburr',
    icon: PenTool,
    hue: '244,114,182',
    categoria: 'Pessoal',
    andamento: false,
    live: true,
    nome: 'Excaliburr',
    tipo: 'Webapp de diagramas + IA',
    desc: 'Quadro de diagramação estilo Excalidraw pensado para tablet, com chat de IA (Claude) integrado, auto-save local e exportação de arquivos .excalidraw, SVG e PNG.',
    stack: ['JavaScript', 'Canvas', 'Supabase', 'Claude API'],
    links: [{ label: 'Abrir App', icon: ExternalLink, href: 'https://app.excaliburr.brainstech.com.br' }],
  },
  {
    id: 'my-health',
    icon: HeartPulse,
    hue: '251,113,133',
    categoria: 'Pessoal',
    andamento: false,
    nome: 'My Health',
    tipo: 'Sistema Web',
    desc: 'Acompanhamento de saúde da família: medições, medicamentos, gráficos e relatórios para vários pacientes, com login multiusuário.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Recharts'],
    links: [{ label: 'Abrir App', icon: ExternalLink, href: 'https://saude.brainstech.com.br' }],
  },
]

const filtros = ['Todos', 'Profissional', 'Pessoal']

function Pulse({ hue }) {
  return (
    <svg viewBox="0 0 300 60" className="h-12 w-full" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 40 L40 40 L55 12 L75 52 L95 28 L120 40 L170 40 L185 8 L205 50 L225 30 L250 40 L300 40" stroke={`rgb(${hue})`} strokeWidth="1.6" strokeDasharray="8 6" style={{ animation: 'dash 5s linear infinite', filter: `drop-shadow(0 0 4px rgb(${hue}))` }} />
    </svg>
  )
}

function ProjetoCard({ projeto }) {
  const { icon: Icon, hue, categoria, andamento, live, nome, tipo, desc, stack, links } = projeto
  const dot = andamento ? '#FFB547' : live ? '#34d399' : `rgb(${hue})`
  return (
    <Spot className="group flex w-[84vw] max-w-[380px] shrink-0 snap-start flex-col sm:w-[380px]">
      <div className="relative border-b border-white/10 p-6" style={{ background: `linear-gradient(135deg, rgba(${hue},0.16), transparent 70%)` }}>
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-black/30 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ borderColor: `rgba(${hue},0.4)` }}>
            <Icon size={22} style={{ color: `rgb(${hue})` }} />
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60">
            <i className={`h-1.5 w-1.5 rounded-full ${andamento || live ? 'animate-pulse' : ''}`} style={{ background: dot }} />
            {andamento ? 'Em andamento' : 'Finalizado'}
          </span>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {categoria} · {tipo}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold text-white">{nome}</h3>
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
  )
}

export default function Projetos() {
  const [filtro, setFiltro] = useState('Todos')
  const [pos, setPos] = useState({ prog: 0, start: true, end: false })
  const trilho = useRef(null)

  const lista = filtro === 'Todos' ? projetos : projetos.filter((p) => p.categoria === filtro)
  const contagem = (f) => (f === 'Todos' ? projetos.length : projetos.filter((p) => p.categoria === f).length)

  const atualiza = () => {
    const el = trilho.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setPos({ prog: max > 0 ? el.scrollLeft / max : 1, start: el.scrollLeft < 8, end: el.scrollLeft >= max - 8 })
  }

  useEffect(() => {
    trilho.current?.scrollTo({ left: 0 })
    atualiza()
    window.addEventListener('resize', atualiza)
    return () => window.removeEventListener('resize', atualiza)
  }, [filtro])

  const mover = (dir) => {
    const el = trilho.current
    if (!el) return
    const passo = (el.firstElementChild?.getBoundingClientRect().width ?? 380) + 20
    el.scrollBy({ left: dir * passo, behavior: 'smooth' })
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') mover(1)
    if (e.key === 'ArrowLeft') mover(-1)
  }

  return (
    <section id="projetos" className="relative overflow-hidden bg-void py-28 md:py-36">
      <div className="absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-volt/15 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <SectionTag n="05">Portfólio</SectionTag>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl">
            Sistemas <span className="text-grad">no ar</span>, não slides.
          </h2>
          <p className="mt-5 text-lg text-white/55">Projetos reais, profissionais e pessoais. Todos construídos com IA, sob direção técnica minha.</p>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar projetos">
            {filtros.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filtro === f}
                onClick={() => setFiltro(f)}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  filtro === f ? 'border-neon/60 bg-neon/10 text-neon' : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'
                }`}
              >
                {f} <span className="ml-1 opacity-60">{contagem(f)}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={() => mover(-1)} disabled={pos.start} aria-label="Projetos anteriores" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-neon/60 hover:text-neon disabled:pointer-events-none disabled:opacity-30">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => mover(1)} disabled={pos.end} aria-label="Próximos projetos" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-neon/60 hover:text-neon disabled:pointer-events-none disabled:opacity-30">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div
          ref={trilho}
          onScroll={atualiza}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label="Carrossel de projetos"
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingInline: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))', scrollPaddingInline: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))' }}
        >
          {lista.map((p) => (
            <ProjetoCard key={p.id} projeto={p} />
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-6 max-w-6xl px-6">
        <div className="h-px w-full bg-white/10">
          <div className="h-px bg-neon transition-[width] duration-300" style={{ width: `${Math.max(12, pos.prog * 100)}%`, boxShadow: '0 0 8px #22E5FF' }} />
        </div>
      </div>
    </section>
  )
}
