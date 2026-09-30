import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import NeuralCanvas from '../components/NeuralCanvas'
import { Words, Counter, Magnetic, scrollToId } from '../components/ui'
import { HERO_DELAY } from '../config'

const stats = [
  { to: 2, suffix: '', label: 'sistemas em produção' },
  { to: 5, suffix: '', label: 'frentes de atuação' },
  { to: 24, prefix: '≤', suffix: 'h', label: 'para responder' },
  { to: 100, suffix: '%', label: 'do briefing ao deploy' },
]

function Clock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('pt-BR', { hour12: false }))
    f()
    const id = setInterval(f, 1000)
    return () => clearInterval(id)
  }, [])
  return <span>{t}</span>
}

export default function Hero() {
  const d = HERO_DELAY
  return (
    <section className="relative min-h-screen overflow-hidden bg-void">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-volt/20 blur-[140px]" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-neon/10 blur-[160px]" />
      <div className="floor" />
      <div className="absolute inset-0 opacity-45 lg:opacity-100">
        <NeuralCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 lg:bg-gradient-to-r from-void via-void/60 to-transparent lg:via-void/40" />
      <div className="scanlines pointer-events-none absolute inset-0" />

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-10 mx-auto hidden max-w-6xl justify-between px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 lg:flex">
        <span>lat −23.55 · lon −46.63</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" style={{ animation: 'ping-slow 1.8s cubic-bezier(0,0,.2,1) infinite' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
          </span>
          aceitando novos projetos · <Clock />
        </span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-40 pt-32">
        <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-neon/25 bg-neon/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neon backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-signal shadow-[0_0_10px_#FFB547]" />
          TI de verdade <span className="text-white/30">×</span> IA de ponta
        </div>

        <h1 className="max-w-4xl font-display text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem]" style={{ perspective: 800 }}>
          <Words text="Qualquer um usa IA." delay={d} />
          <br />
          <Words text="Poucos sabem" delay={d + 350} className="text-grad" />
          <br />
          <Words text="o que construir." delay={d + 700} className="text-shimmer" />
        </h1>

        <p className="reveal in mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg" style={{ animation: `wordIn 1s ${d + 1300}ms both`, opacity: 0 }}>
          Sou profissional de TI. Escuto o que o seu negócio <em className="not-italic text-white">realmente</em> precisa — inclusive o que você ainda não sabe dizer —
          e uso IA para entregar sistemas, apps e automações que funcionam <span className="text-neon">em produção, não só na demo.</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4" style={{ animation: `wordIn 1s ${d + 1600}ms both`, opacity: 0 }}>
          <Magnetic>
            <button onClick={() => scrollToId('contato')} className="btn-solid">
              Iniciar meu projeto <ArrowRight size={18} />
            </button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <button onClick={() => scrollToId('projetos')} className="btn-beam">
              <span>Ver portfólio</span>
            </button>
          </Magnetic>
        </div>

        <div className="mt-6 hidden items-center gap-4 font-mono sm:flex text-[10px] uppercase tracking-[0.2em] text-white/35" style={{ animation: `wordIn 1s ${d + 1900}ms both`, opacity: 0 }}>
          <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-neon" /> nó de IA</span>
          <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-amber-signal" /> decisão humana</span>
        </div>
      </div>

      {/* stats */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-void/60 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-6 py-5 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="md:border-l md:border-white/10 md:pl-6 md:first:border-0 md:first:pl-0">
              <div className="font-display text-2xl font-semibold text-white md:text-3xl">
                <Counter to={s.to} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <ChevronDown className="absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce text-white/30 lg:block" size={20} />
    </section>
  )
}
