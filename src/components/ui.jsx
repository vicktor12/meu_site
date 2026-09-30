import { useEffect, useRef, useState } from 'react'

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}

/** Aparece ao entrar na viewport */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const [ref, seen] = useInView()
  return (
    <Tag ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

/** Card com spotlight que segue o mouse */
export function Spot({ children, className = '', as: Tag = 'div', ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag className={`spot ${className}`} onMouseMove={onMove} {...rest}>
      {children}
    </Tag>
  )
}

/** Palavras entram uma a uma com blur */
export function Words({ text, delay = 0, step = 70, className = '' }) {
  return (
    <span aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" className={`word ${className}`} style={{ animationDelay: `${delay + i * step}ms` }}>
          {w}
          {' '}
        </span>
      ))}
    </span>
  )
}

const GLYPHS = '01<>/\\{}[]#$%&*+=?ABCDEFGHIJKLMNOPQRSTUVWXYZ'
/** Texto "decodificando" (usar só em textos curtos, mono) */
export function Scramble({ text, delay = 0, duration = 900, className = '' }) {
  const [out, setOut] = useState(() => (reducedMotion() ? text : ''))
  const [ref, seen] = useInView(0.4)
  useEffect(() => {
    if (!seen || reducedMotion()) {
      if (reducedMotion()) setOut(text)
      return
    }
    let raf
    const t0 = setTimeout(() => {
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration)
        const n = Math.floor(p * text.length)
        let r = ''
        for (let i = 0; i < text.length; i++) r += i < n || text[i] === ' ' ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        setOut(r)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(t0)
      cancelAnimationFrame(raf)
    }
  }, [seen, text, delay, duration])
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out || ' '}</span>
    </span>
  )
}

export function Counter({ to, suffix = '', prefix = '', duration = 1600 }) {
  const [ref, seen] = useInView(0.5)
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (reducedMotion()) return setV(to)
    let raf
    const s = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - s) / duration)
      setV(Math.round((1 - Math.pow(1 - p, 4)) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration])
  return (
    <span ref={ref}>
      {prefix}
      {v}
      {suffix}
    </span>
  )
}

/** Botão magnético: acompanha o mouse levemente */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`
  }
  const leave = () => (ref.current.style.transform = '')
  return (
    <span ref={ref} onMouseMove={move} onMouseLeave={leave} className={`inline-block transition-transform duration-200 ease-out ${className}`}>
      {children}
    </span>
  )
}

export function SectionTag({ n, children }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-neon/80">
      <span className="text-white/30">{n}</span>
      <span className="h-px w-10 bg-gradient-to-r from-neon/70 to-transparent" />
      <Scramble text={children} />
    </div>
  )
}

export const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
