import { Globe, Smartphone, Zap, BarChart2, Headphones } from 'lucide-react'

const servicos = [
  {
    icon: Globe,
    titulo: 'Desenvolvimento Web Full-Stack',
    desc: 'Sistemas sob medida, painéis administrativos e APIs REST. Do banco de dados até a interface, construído com IA do início ao fim.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    accent: 'text-brand-300',
    glow: 'hover:shadow-brand-500/15',
    iconBg: 'bg-brand-500/10 border-brand-500/20',
  },
  {
    icon: Smartphone,
    titulo: 'Aplicativos Android',
    desc: 'Apps nativos para Android com React Native e Expo, entregues como APK prontos para uso. Apenas Android por enquanto.',
    tags: ['React Native', 'Expo', 'Android'],
    accent: 'text-green-400',
    glow: 'hover:shadow-green-500/15',
    iconBg: 'bg-green-500/10 border-green-500/20',
  },
  {
    icon: Zap,
    titulo: 'Automação de Processos',
    desc: 'Eliminação de tarefas manuais repetitivas: integração de arquivos, jobs agendados, parsing de CNAB, PDF e Excel.',
    tags: ['Node.js', 'Cron', 'CNAB / PDF'],
    accent: 'text-yellow-400',
    glow: 'hover:shadow-yellow-500/15',
    iconBg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: BarChart2,
    titulo: 'Dashboards & BI',
    desc: 'Painéis de indicadores operacionais, SLA, TMA e relatórios exportáveis — do zero ou sobre sua base de dados.',
    tags: ['Chart.js', 'Recharts', 'KPIs'],
    accent: 'text-purple-400',
    glow: 'hover:shadow-purple-500/15',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Headphones,
    titulo: 'Suporte Remoto',
    desc: 'Atendimento técnico à distância, resolução de incidentes, configuração de ambientes e acompanhamento de sistemas.',
    tags: ['Remoto', 'Incidentes', 'TI'],
    accent: 'text-cyan-400',
    glow: 'hover:shadow-cyan-500/15',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
  },
]

export default function Servicos() {
  return (
    <section id="servicos" className="py-24 bg-space-800 relative overflow-hidden">
      {/* circuit grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#93C5FD 1px, transparent 1px), linear-gradient(90deg, #93C5FD 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-brand-500/8 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="inline-flex items-center text-brand-300 bg-brand-500/10 border border-brand-500/20 font-semibold text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full">
            Serviços
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-brand-300 bg-clip-text text-transparent">
            O que eu ofereço
          </h2>
          <p className="mt-3 text-white/40 max-w-xl mx-auto">
            Cada serviço moldado por problemas reais de TI, entregue com o auxílio de Inteligência Artificial.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicos.map(({ icon: Icon, titulo, desc, tags, accent, glow, iconBg }) => (
            <div
              key={titulo}
              className={`group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-xl ${glow} transition-all cursor-default backdrop-blur-sm`}
            >
              <div className={`w-11 h-11 rounded-xl border ${iconBg} flex items-center justify-center mb-5`}>
                <Icon className={`w-5 h-5 ${accent}`} />
              </div>
              <h3 className="font-bold text-white text-base mb-2">{titulo}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] font-medium bg-white/5 border border-white/10 text-white/50 px-2.5 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
