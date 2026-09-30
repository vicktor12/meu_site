import { useState } from 'react'
import { Mail, MessageCircle, Send, Copy, Check } from 'lucide-react'
import { Reveal, SectionTag } from '../components/ui'
import { EMAIL, WHATSAPP } from '../config'

const field = 'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-neon/60 focus:bg-neon/[0.04] focus:shadow-[0_0_30px_-10px_rgba(34,229,255,0.7)]'

export default function Contato() {
  const [copied, setCopied] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = `Olá, Victor! Sou ${f.get('nome')}.\n\nO que quero resolver:\n${f.get('dor')}\n\nMeu contato: ${f.get('contato')}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Novo projeto — ' + f.get('nome'))}&body=${encodeURIComponent(body)}`
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-void py-28 md:py-36">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[160px]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <SectionTag n="07">Contato</SectionTag>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
            Me conta o problema. <span className="text-shimmer">Eu descubro o resto.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/55">
            Descreva com as suas palavras, do jeito que sair. Eu volto com as perguntas certas e um orçamento sem compromisso.
          </p>

          <div className="mt-10 space-y-3">
            <div className="flex items-center gap-3">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white/80 transition hover:border-neon/50 hover:text-white">
                <Mail size={16} className="text-neon" /> {EMAIL}
              </a>
              <button onClick={copy} aria-label="Copiar e-mail" className="rounded-full border border-white/10 p-3 text-white/60 transition hover:border-neon/50 hover:text-neon">
                {copied ? <Check size={16} className="text-neon" /> : <Copy size={16} />}
              </button>
            </div>
            {WHATSAPP && (
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white/80 transition hover:border-emerald-400/50 hover:text-white">
                <MessageCircle size={16} className="text-emerald-400" /> WhatsApp
              </a>
            )}
            <p className="pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">{'// resposta em até 24h nos dias úteis'}</p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <form onSubmit={submit} className="relative rounded-3xl border border-white/10 bg-ink-900/80 p-6 shadow-[0_40px_120px_-40px_rgba(34,229,255,0.4)] backdrop-blur-xl md:p-8">
            <div className="hud-line absolute inset-x-8 top-0" />
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-neon">{'> novo_briefing'}</div>
            <div className="space-y-4">
              <input name="nome" required placeholder="Seu nome" className={field} />
              <input name="contato" required placeholder="E-mail ou WhatsApp para retorno" className={field} />
              <textarea name="dor" required rows={5} placeholder="O que está travando o seu negócio? Pode ser bagunçado, eu organizo." className={`${field} resize-none`} />
            </div>
            <button type="submit" className="btn-solid mt-6 w-full justify-center">
              Enviar briefing <Send size={16} />
            </button>
            <p className="mt-4 text-center text-[11px] text-white/30">Abre o seu app de e-mail com a mensagem pronta.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
