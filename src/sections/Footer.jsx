export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-space-950 border-t border-white/5 text-white/30 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/logo-white.png" alt="Brains Tech" className="h-7 w-7 object-contain opacity-60" />
          <span className="text-white/60 font-semibold text-sm">Brains Tech</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          {['sobre', 'servicos', 'projetos', 'contato'].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="capitalize hover:text-white transition-colors"
            >
              {id === 'servicos' ? 'Serviços' : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>

        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-xs">© {new Date().getFullYear()} Brains Tech. Todos os direitos reservados.</p>
          <p className="font-mono text-[10px] text-white/20">Desenvolvido com IA</p>
        </div>
      </div>
    </footer>
  )
}
