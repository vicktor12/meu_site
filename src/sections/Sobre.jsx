import { Wrench, Cpu, Lightbulb } from 'lucide-react'
import { Reveal, SectionTag } from '../components/ui'

const pilares = [
  { icon: Wrench, t: 'Raízes no suporte', d: 'Vivo o dia a dia de quem depende de TI para operar. Cada solução nasce de um problema real.' },
  { icon: Cpu, t: 'IA como alavanca', d: 'Uso IA para construir rápido — mas eu decido a arquitetura, reviso e respondo pelo resultado.' },
  { icon: Lightbulb, t: 'Sob medida', d: 'Sem produto genérico: entendo o fluxo, acho o gargalo e elimino o retrabalho do seu time.' },
]

export default function Sobre() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-ink-900 py-28 md:py-36">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* HUD do operador */}
        <Reveal className="mx-auto">
          <div className="relative flex h-72 w-72 items-center justify-center md:h-96 md:w-96">
            <div className="absolute inset-0 rounded-full border border-dashed border-neon/30" style={{ animation: 'rot 40s linear infinite' }} />
            <div className="absolute inset-6 rounded-full border border-white/10" style={{ animation: 'rotr 28s linear infinite' }}>
              <i className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_#22E5FF]" />
              <i className="absolute -bottom-1 left-1/3 h-2 w-2 rounded-full bg-amber-signal shadow-[0_0_12px_#FFB547]" />
            </div>
            <div className="absolute inset-16 rounded-full border border-neon/20" style={{ animation: 'rot 18s linear infinite' }}>
              <i className="absolute right-0 top-1/2 h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_#22E5FF]" />
            </div>
            <div className="absolute inset-24 rounded-full bg-neon/10 blur-2xl" />
            <img src="/logo-white.png" alt="Brains Tech" className="relative h-32 w-32 object-contain md:h-40 md:w-40" style={{ animation: 'float 6s ease-in-out infinite', filter: 'drop-shadow(0 0 28px rgba(34,229,255,.7))' }} />
            <span className="absolute -bottom-2 rounded-full border border-neon/30 bg-void px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-neon">operador: victor</span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionTag n="06">Quem opera</SectionTag>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-4xl">
              Um profissional de TI <span className="text-grad">no comando da IA.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/55">
              Sou Victor. Trabalho com suporte técnico e uso Inteligência Artificial como ferramenta de desenvolvimento. Não escrevo cada linha na mão — e não escondo isso:
              todos os projetos, <span className="text-white">incluindo este site</span>, foram construídos com IA. O que eu trago é o que a IA não tem: conhecimento de TI, visão do problema do usuário e responsabilidade pelo que vai ao ar.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {pilares.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 120}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Icon size={20} className="text-neon" />
                  <h3 className="mt-4 font-display text-sm font-semibold text-white">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
