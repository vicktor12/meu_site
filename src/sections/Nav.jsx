import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { scrollToId } from '../components/ui'

const links = [
  ['metodo', 'Método'],
  ['servicos', 'Serviços'],
  ['projetos', 'Projetos'],
  ['sobre', 'Sobre'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 40)
      setProgress(max > 0 ? window.scrollY / max : 0)
      let cur = ''
      for (const [id] of [...links, ['contato']]) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 md:px-5 ${
          scrolled || open ? 'border-white/10 bg-void/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3" aria-label="Topo">
          <img src="/logo-white.png" alt="Brains Tech" className="h-8 w-8 object-contain" />
          <span className="font-display text-sm font-semibold tracking-wide text-white">
            BRAINS<span className="text-neon">TECH</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                active === id ? 'bg-neon/10 text-neon' : 'text-white/55 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go('contato')}
            className="hidden rounded-full bg-neon px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-void shadow-[0_0_30px_-4px_rgba(34,229,255,0.8)] transition hover:brightness-110 md:block"
          >
            Iniciar projeto
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 text-white md:hidden" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className="absolute bottom-0 left-6 right-6 h-px overflow-hidden rounded-full">
          <div className="h-full origin-left bg-gradient-to-r from-neon to-volt" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-void/90 p-4 backdrop-blur-xl md:hidden">
          {[...links, ['contato', 'Contato']].map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="block w-full rounded-xl px-4 py-3 text-left font-mono text-sm uppercase tracking-widest text-white/80 hover:bg-white/5">
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
