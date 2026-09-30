import { useEffect, useState } from 'react'

const LOGS = ['carregando núcleo neural', 'sincronizando sinapses', 'calibrando IA + TI', 'sistema online']

export default function Loader() {
  const [pct, setPct] = useState(0)
  const [out, setOut] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const s = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - s) / 1500)
      setPct(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => setOut(true), 150)
        setTimeout(() => {
          setGone(true)
          document.body.style.overflow = ''
        }, 900)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null
  const log = LOGS[Math.min(LOGS.length - 1, Math.floor((pct / 100) * LOGS.length))]

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void transition-all duration-700 ${
        out ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-neon/30 blur-3xl animate-pulse" />
        <img src="/logo-white.png" alt="" className="relative h-24 w-24 object-contain" style={{ filter: 'drop-shadow(0 0 24px rgba(34,229,255,.8))' }} />
      </div>
      <div className="relative mt-10 w-64">
        <div className="h-px w-full bg-white/10">
          <div className="h-px bg-neon shadow-[0_0_12px_#22E5FF]" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-neon/80">
          <span>{log}</span>
          <span>{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
