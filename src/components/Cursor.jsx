import { useEffect, useRef } from 'react'

// Brilho + anel que seguem o mouse (só em dispositivos com ponteiro fino)
export default function Cursor() {
  const glow = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let x = -200, y = -200, rx = -200, ry = -200, raf
    let big = false
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      big = !!e.target.closest?.('a, button, input, textarea, [data-hover]')
    }
    const tick = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (glow.current) glow.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`
      if (ring.current) ring.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px) scale(${big ? 1.9 : 1})`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={glow}
        className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[600px] w-[600px] rounded-full opacity-70 pointer-fine:block"
        style={{ background: 'radial-gradient(circle, rgba(34,229,255,0.07), transparent 60%)' }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-8 w-8 rounded-full border border-neon/60 mix-blend-screen transition-[scale] duration-200 pointer-fine:block"
        style={{ transition: 'transform 0.05s linear' }}
      />
    </>
  )
}
