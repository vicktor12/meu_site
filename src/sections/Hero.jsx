import { Bot } from 'lucide-react'

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex flex-col bg-space-900 overflow-hidden">
      {/* circuit grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#93C5FD 1px, transparent 1px), linear-gradient(90deg, #93C5FD 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img src="/logo-white.png" alt="Brains Tech" className="h-9 w-9 object-contain" />
          <span className="text-white font-bold text-lg tracking-tight">Brains Tech</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-brand-300 font-medium">
          {['sobre', 'servicos', 'projetos', 'contato'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hover:text-white transition-colors capitalize"
            >
              {id === 'servicos' ? 'Serviços' : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo('contato')}
          className="hidden md:flex items-center gap-2 bg-brand-500/20 hover:bg-brand-500 border border-brand-500/40 hover:border-brand-500 text-brand-300 hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
        >
          Contratar
        </button>
      </nav>

      {/* hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        {/* AI badge */}
        <div className="mb-8 inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
          <Bot className="w-3.5 h-3.5 text-brand-500" />
          Desenvolvimento 100% assistido por Inteligência Artificial
        </div>

        <img
          src="/logo-white.png"
          alt="Brains Tech"
          className="h-24 w-24 object-contain mb-8"
          style={{ filter: 'drop-shadow(0 0 32px rgba(59,130,246,0.5))' }}
        />

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
          <span className="bg-gradient-to-r from-white via-brand-300 to-brand-500 bg-clip-text text-transparent">
            Soluções tecnológicas que nascem de quem{' '}
          </span>
          <span className="bg-gradient-to-r from-brand-300 to-cyan-400 bg-clip-text text-transparent">
            vive o problema
          </span>
        </h1>

        <p className="mt-6 text-white/50 text-lg md:text-xl max-w-xl leading-relaxed">
          Desenvolvimento web, apps Android, automação de processos e suporte técnico —
          tudo construído com IA e experiência prática de TI.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('projetos')}
            className="bg-brand-500 hover:bg-blue-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-base shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50"
          >
            Ver Projetos
          </button>
          <button
            onClick={() => scrollTo('contato')}
            className="border border-white/20 hover:border-brand-300/60 bg-white/5 backdrop-blur-sm text-white/70 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-base"
          >
            Entrar em Contato
          </button>
        </div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-900 to-transparent pointer-events-none" />
    </section>
  )
}
