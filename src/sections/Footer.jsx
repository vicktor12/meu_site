import { scrollToId } from '../components/ui'

const links = [['metodo', 'Método'], ['servicos', 'Serviços'], ['projetos', 'Portfólio'], ['sobre', 'Sobre'], ['contato', 'Contato']]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-void pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo-white.png" alt="" className="h-7 w-7 object-contain opacity-70" />
          <span className="font-display text-sm font-semibold text-white/70">BRAINS<span className="text-neon">TECH</span></span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
          {links.map(([id, l]) => (
            <button key={id} onClick={() => scrollToId(id)} className="transition-colors hover:text-neon">{l}</button>
          ))}
        </nav>
        <div className="text-center md:text-right">
          <p className="text-xs text-white/35">© {new Date().getFullYear()} Brains Tech</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/25">construído com IA · dirigido por TI</p>
        </div>
      </div>
      <div className="pointer-events-none mt-10 select-none text-center font-display text-[17vw] font-bold leading-[0.8] text-transparent" style={{ WebkitTextStroke: '1px rgba(34,229,255,0.16)', maskImage: 'linear-gradient(to bottom, #000 30%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, #000 30%, transparent)' }} aria-hidden="true">
        BRAINSTECH
      </div>
    </footer>
  )
}
