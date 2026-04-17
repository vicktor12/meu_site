import { Mail, MessageCircle } from 'lucide-react'

export default function Contato() {
  return (
    <section id="contato" className="py-24 bg-space-800 relative overflow-hidden">
      {/* circuit grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#93C5FD 1px, transparent 1px), linear-gradient(90deg, #93C5FD 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <span className="inline-flex items-center text-brand-300 bg-brand-500/10 border border-brand-500/20 font-semibold text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full">
          Contato
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-brand-300 bg-clip-text text-transparent leading-tight">
          Tem um problema para resolver?
        </h2>
        <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
          Me conta o que está travando o seu time. Se eu conseguir ajudar, faço um orçamento sem compromisso.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:vicktor492@gmail.com"
            className="inline-flex items-center justify-center gap-2.5 bg-brand-500 hover:bg-blue-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50"
          >
            <Mail className="w-4 h-4" />
            vicktor492@gmail.com
          </a>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-green-500/50 bg-white/5 backdrop-blur-sm text-white/70 hover:text-white hover:bg-green-500/10 font-semibold px-8 py-3.5 rounded-xl transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        <p className="mt-8 text-white/25 text-sm font-mono">
          // respondo em até 24h nos dias úteis
        </p>
      </div>
    </section>
  )
}
