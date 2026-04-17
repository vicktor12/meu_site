import { Cpu, Wrench, Lightbulb } from 'lucide-react'

const pilares = [
  {
    icon: Wrench,
    titulo: 'Raízes no suporte',
    texto:
      'Trabalho com suporte técnico e entendo na prática as dores de quem depende de TI para operar. Cada solução nasceu de um problema real vivido no dia a dia.',
    accent: 'text-brand-300',
    iconBg: 'bg-brand-500/10 border-brand-500/20',
  },
  {
    icon: Cpu,
    titulo: 'IA como ferramenta',
    texto:
      'Uso Inteligência Artificial como alavanca de desenvolvimento. Todos os projetos — incluindo este site — foram construídos com IA, combinando visão humana e poder computacional.',
    accent: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Lightbulb,
    titulo: 'Solução sob medida',
    texto:
      'Não entrego produtos genéricos. Entendo o fluxo, identifico o gargalo e construo exatamente o que vai eliminar o retrabalho do seu time.',
    accent: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
  },
]

export default function Sobre() {
  return (
    <section id="sobre" className="py-24 bg-space-900 relative overflow-hidden">
      {/* dot matrix */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #93C5FD 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-brand-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center text-brand-300 bg-brand-500/10 border border-brand-500/20 font-semibold text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full">
            Sobre
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-white to-brand-300 bg-clip-text text-transparent">
            Quem está por trás da Brains Tech
          </h2>
          <p className="mt-4 text-white/50 text-lg leading-relaxed">
            Sou Victor, profissional de suporte técnico que usa{' '}
            <span className="text-brand-300 font-semibold">Inteligência Artificial</span> como ferramenta
            de desenvolvimento. Não sou um desenvolvedor tradicional — sou alguém que conhece as dores do
            usuário final e usa IA para transformá-las em software funcional. Todos os projetos que você
            vê aqui, incluindo este site, foram construídos com o auxílio de IA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pilares.map(({ icon: Icon, titulo, texto, accent, iconBg }) => (
            <div
              key={titulo}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all backdrop-blur-sm"
            >
              <div className={`w-12 h-12 rounded-xl border ${iconBg} flex items-center justify-center mb-5`}>
                <Icon className={`w-6 h-6 ${accent}`} />
              </div>
              <h3 className="font-bold text-white text-lg mb-3">{titulo}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
