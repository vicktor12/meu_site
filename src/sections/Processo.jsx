import { Ear, Compass, Cpu, Rocket } from 'lucide-react'
import { Reveal, SectionTag, Spot } from '../components/ui'

const etapas = [
  { icon: Ear, n: '01', t: 'Escuta', d: 'Conversa guiada para achar a dor real por trás do pedido. Sem jargão, sem pressa.' },
  { icon: Compass, n: '02', t: 'Blueprint', d: 'Escopo, telas, dados e arquitetura desenhados e aprovados por você antes de qualquer código.' },
  { icon: Cpu, n: '03', t: 'Build com IA', d: 'IA acelera a construção; eu reviso, testo e decido. Entregas curtas que você acompanha.' },
  { icon: Rocket, n: '04', t: 'Deploy & Suporte', d: 'No ar, monitorado e com quem entende de suporte do seu lado depois da entrega.' },
]

export default function Processo() {
  return (
    <section className="relative overflow-hidden bg-void py-28 md:py-36">
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <SectionTag n="03">O caminho</SectionTag>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl">
            Da conversa ao <span className="text-grad">ar</span> em quatro passos.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent lg:block" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {etapas.map(({ icon: Icon, n, t, d }, i) => (
              <Reveal key={n} delay={i * 130}>
                <Spot className="h-full p-6">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neon/30 bg-neon/10 shadow-[0_0_30px_-6px_rgba(34,229,255,0.7)]">
                      <Icon size={22} className="text-neon" />
                    </span>
                    <span className="font-display text-4xl font-semibold text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>{n}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{d}</p>
                </Spot>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
