import { X, Check } from 'lucide-react'
import { Reveal, SectionTag, Spot } from '../components/ui'

const rows = [
  ['Faz literalmente o que você pediu.', 'Descobre o que você precisa de fato — inclusive o que não soube dizer.'],
  ['Cola código gerado e torce para funcionar.', 'Entende arquitetura, banco, rede e segurança. Revisa cada linha que a IA escreve.'],
  ['Funciona na demo. Quebra com dado e usuário reais.', 'Pensado para produção desde o primeiro dia: deploy, backup, monitoramento.'],
  ['Entrega e desaparece.', 'Vem de suporte técnico: quem já atendeu o chamado sabe o que dói depois da entrega.'],
]

export default function Diferencial() {
  return (
    <section id="diferencial" className="relative overflow-hidden bg-void py-28 md:py-36">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/10 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionTag n="01">A diferença</SectionTag>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl">
            IA é a ferramenta. <span className="text-grad">Quem comanda</span> é o que muda o resultado.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/55">
            Hoje qualquer pessoa gera código com um prompt. O que separa um projeto que dá certo de um que vira dor de cabeça é quem está do outro lado do teclado.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.25rem] border border-white/[0.06] bg-white/[0.015] p-7 md:p-9">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">Quem só digita prompts</span>
                <span className="font-mono text-[10px] text-red-400/60">RISCO ALTO</span>
              </div>
              <ul className="space-y-6">
                {rows.map(([bad], i) => (
                  <li key={i} className="flex gap-4 text-white/40">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-400/20 bg-red-400/5">
                      <X size={13} className="text-red-400/70" />
                    </span>
                    <span className="leading-relaxed">{bad}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <Spot className="h-full !border-neon/30 p-7 shadow-[0_0_80px_-20px_rgba(34,229,255,0.35)] md:p-9">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon">TI que comanda a IA</span>
                <span className="font-mono text-[10px] text-neon/70">● BRAINS TECH</span>
              </div>
              <ul className="space-y-6">
                {rows.map(([, good], i) => (
                  <li key={i} className="flex gap-4 text-white/90">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neon/40 bg-neon/10">
                      <Check size={13} className="text-neon" />
                    </span>
                    <span className="leading-relaxed">{good}</span>
                  </li>
                ))}
              </ul>
            </Spot>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
