import { useEffect, useRef, useState } from 'react'
import { MessageSquareQuote } from 'lucide-react'
import { Reveal, SectionTag, reducedMotion } from '../components/ui'

// Simulação ilustrativa do método de extração de requisitos
const cenarios = [
  {
    id: 'sistema',
    fala: 'Preciso de um sistema pra controlar as coisas da empresa.',
    linhas: [
      ['in', 'entrada: "controlar as coisas da empresa"'],
      ['sys', 'ambiguidade detectada em "coisas" — nível alto'],
      ['ask', 'O que se perde hoje? Quem lança? Quem cobra o resultado?'],
      ['ok', 'dor real: ordens de serviço espalhadas em planilha e WhatsApp'],
      ['ok', 'usuários: técnicos em campo (celular) + gestor (painel)'],
      ['ok', 'entrega: app Android + painel web + relatório semanal automático'],
      ['ok', 'stack: React · Node.js · PostgreSQL · React Native'],
      ['out', 'blueprint pronto. Você aprova antes de eu escrever a primeira linha.'],
    ],
  },
  {
    id: 'planilha',
    fala: 'Perco horas todo mês conferindo arquivo e planilha na mão.',
    linhas: [
      ['in', 'entrada: "conferindo arquivo e planilha na mão"'],
      ['sys', 'padrão identificado: tarefa repetitiva, regra fixa'],
      ['ask', 'Qual o formato dos arquivos? Onde ficam? O que é "conferido"?'],
      ['ok', 'origem: CNAB / PDF / Excel recebidos por e-mail e pasta de rede'],
      ['ok', 'regra: cruzar valores e apontar divergências'],
      ['ok', 'entrega: robô agendado + relatório de exceções por e-mail'],
      ['ok', 'stack: Node.js · Cron · parsers de CNAB/PDF/Excel'],
      ['out', 'de horas por mês para minutos. Só as exceções chegam até você.'],
    ],
  },
  {
    id: 'dashboard',
    fala: 'Quero saber como está o meu atendimento, sem depender de relatório.',
    linhas: [
      ['in', 'entrada: "como está o meu atendimento"'],
      ['sys', 'ambiguidade: "como está" → qual métrica decide algo?'],
      ['ask', 'Você quer ver volume? Tempo de resposta? Quem está sobrecarregado?'],
      ['ok', 'decisões: escalar equipe, cobrar SLA, achar gargalo por horário'],
      ['ok', 'fonte: API da plataforma de atendimento, tempo real'],
      ['ok', 'entrega: dashboard com TMA, SLA, fila e ranking de atendentes'],
      ['ok', 'stack: React · Recharts · API REST'],
      ['out', 'você para de perguntar "como estamos" — o painel responde sozinho.'],
    ],
  },
]

const style = {
  in: { p: '›', c: 'text-white' },
  sys: { p: '◆', c: 'text-neon/70' },
  ask: { p: '?', c: 'text-amber-signal' },
  ok: { p: '✓', c: 'text-emerald-300' },
  out: { p: '→', c: 'text-neon font-bold' },
}

function Terminal({ cenario, run }) {
  const [lines, setLines] = useState([])
  const box = useRef(null)

  useEffect(() => {
    if (!run) return
    if (reducedMotion()) {
      setLines(cenario.linhas.map(([k, x]) => ({ k, x })))
      return
    }
    let dead = false
    setLines([])
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    ;(async () => {
      await sleep(350)
      for (let i = 0; i < cenario.linhas.length; i++) {
        const [k, full] = cenario.linhas[i]
        for (let c = 1; c <= full.length; c += k === 'in' ? 1 : 2) {
          if (dead) return
          const x = full.slice(0, c)
          setLines((l) => [...l.slice(0, i), { k, x }])
          await sleep(k === 'in' ? 24 : 11)
        }
        setLines((l) => [...l.slice(0, i), { k, x: full }])
        await sleep(k === 'ask' ? 650 : 280)
      }
    })()
    return () => {
      dead = true
    }
  }, [cenario, run])

  const typing = lines.length && lines.length < cenario.linhas.length

  return (
    <div ref={box} className="min-h-[21rem] space-y-2.5 p-5 font-mono text-[12.5px] leading-relaxed md:p-7 md:text-[13.5px]">
      {lines.map(({ k, x }, i) => (
        <div key={i} className={`flex gap-3 ${style[k].c}`}>
          <span className="w-4 shrink-0 text-center opacity-70">{style[k].p}</span>
          <span className={i === lines.length - 1 && typing ? 'caret' : ''}>{x}</span>
        </div>
      ))}
      {!lines.length && <span className="caret text-white/30">aguardando entrada</span>}
    </div>
  )
}

export default function Briefing() {
  const [idx, setIdx] = useState(0)
  const [run, setRun] = useState(false)
  const wrap = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setRun(true), io.disconnect()), { threshold: 0.35 })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="metodo" className="relative overflow-hidden bg-ink-900 py-28 md:py-36">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionTag n="02">O diferencial</SectionTag>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-[2.6rem]">
              Eu extraio <span className="text-shimmer">exatamente</span> o que você quer.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/55">
              Cliente quase nunca sabe explicar o que precisa — e tudo bem. Anos de suporte me ensinaram a fazer as perguntas certas até a dor real aparecer.
              Só depois disso a IA entra em ação, com um blueprint claro na mão.
            </p>
            <p className="mt-4 text-white/45">
              Escolha uma frase típica de cliente e veja como ela vira especificação:
            </p>

            <div className="mt-6 space-y-3">
              {cenarios.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setIdx(i)
                    setRun(true)
                  }}
                  className={`group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    idx === i ? 'border-neon/50 bg-neon/[0.07] shadow-[0_0_40px_-12px_rgba(34,229,255,0.6)]' : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                  }`}
                >
                  <MessageSquareQuote size={18} className={`mt-0.5 shrink-0 ${idx === i ? 'text-neon' : 'text-white/30'}`} />
                  <span className={`text-sm leading-relaxed md:text-[15px] ${idx === i ? 'text-white' : 'text-white/55 group-hover:text-white/80'}`}>“{c.fala}”</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div ref={wrap} className="overflow-hidden rounded-2xl border border-white/10 bg-void/90 shadow-[0_30px_120px_-30px_rgba(34,229,255,0.35)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex gap-2">
                  <i className="h-3 w-3 rounded-full bg-red-400/70" />
                  <i className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <i className="h-3 w-3 rounded-full bg-emerald-400/70" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">brains://decodificador-de-briefing</span>
                <span className="w-12" />
              </div>
              <Terminal key={idx} cenario={cenarios[idx]} run={run} />
              <div className="border-t border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                simulação ilustrativa do meu processo de levantamento
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
