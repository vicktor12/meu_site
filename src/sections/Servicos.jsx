import { Globe, Smartphone, Zap, BarChart2, Headphones } from 'lucide-react'
import { Reveal, SectionTag, Spot } from '../components/ui'

const servicos = [
  {
    icon: Globe,
    titulo: 'Desenvolvimento Web Full-Stack',
    desc: 'Sistemas sob medida, painéis administrativos e APIs REST. Do banco de dados até a interface — arquitetado por quem entende de infraestrutura e construído com IA.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    span: 'lg:col-span-4 lg:row-span-2',
    big: true,
  },
  {
    icon: Smartphone,
    titulo: 'Aplicativos Android',
    desc: 'Apps com React Native e Expo, entregues prontos para instalar. Apenas Android, feito direito.',
    tags: ['React Native', 'Expo'],
    span: 'lg:col-span-2',
  },
  {
    icon: Zap,
    titulo: 'Automação de Processos',
    desc: 'Chega de tarefa manual: integração de arquivos, jobs agendados, CNAB, PDF e Excel.',
    tags: ['Node.js', 'Cron', 'CNAB / PDF'],
    span: 'lg:col-span-2',
  },
  {
    icon: BarChart2,
    titulo: 'Dashboards & BI',
    desc: 'Indicadores, SLA, TMA e relatórios exportáveis — do zero ou sobre a sua base.',
    tags: ['Recharts', 'Chart.js', 'KPIs'],
    span: 'lg:col-span-3',
  },
  {
    icon: Headphones,
    titulo: 'Suporte Remoto',
    desc: 'Atendimento técnico à distância, incidentes, configuração de ambientes e acompanhamento.',
    tags: ['Remoto', 'Incidentes', 'TI'],
    span: 'lg:col-span-3',
  },
]

export default function Servicos() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-ink-900 py-28 md:py-36">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-neon/10 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <SectionTag n="04">Serviços</SectionTag>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl">
            O que eu <span className="text-grad">construo</span> para você.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {servicos.map(({ icon: Icon, titulo, desc, tags, span, big }, i) => (
            <Reveal key={titulo} delay={i * 90} className={span}>
              <Spot className={`group h-full p-6 md:p-8 ${big ? 'flex flex-col justify-between' : ''}`}>
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neon/25 bg-neon/10 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                      <Icon size={22} className="text-neon" />
                    </span>
                    <span className="font-mono text-[10px] text-white/25">0{i + 1}</span>
                  </div>
                  <h3 className={`font-display font-semibold text-white ${big ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{titulo}</h3>
                  <p className={`mt-3 leading-relaxed text-white/50 ${big ? 'max-w-md text-base' : 'text-sm'}`}>{desc}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neon/80">
                      {t}
                    </span>
                  ))}
                </div>
                {big && (
                  <svg viewBox="0 0 400 90" className="mt-8 w-full opacity-60" fill="none" aria-hidden="true">
                    <path d="M0 70 C40 70 50 20 90 30 S150 80 200 45 S280 10 320 35 S380 60 400 20" stroke="url(#g)" strokeWidth="2" strokeDasharray="6 8" style={{ animation: 'dash 4s linear infinite' }} />
                    <defs>
                      <linearGradient id="g" x1="0" x2="1">
                        <stop stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#22E5FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </Spot>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
