import { useEffect, useRef } from 'react'

function mulberry32(a) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Cérebro 3D feito de nós e sinapses, com pulsos de dados e reação ao mouse.
// Nós âmbar = decisões humanas; nós ciano = IA.
export default function NeuralCanvas({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.innerWidth < 768
    const N = mobile ? 260 : 560
    const rnd = mulberry32(11)

    // ---- geometria ----
    const nodes = []
    while (nodes.length < N) {
      const side = nodes.length % 2 ? 1 : -1
      const u = rnd() * 2 - 1
      const t = rnd() * Math.PI * 2
      const s = Math.sqrt(1 - u * u)
      let x = s * Math.cos(t)
      let y = u
      let z = s * Math.sin(t)
      const shell = rnd() < 0.74 ? 1 : Math.cbrt(rnd()) * 0.85
      const fold = 1 + 0.1 * Math.sin(x * 7 + y * 5) * Math.cos(z * 6) + 0.05 * Math.sin(y * 11 + z * 4)
      const k = shell * fold
      x = x * 0.52 * k
      y = y * 0.62 * k
      z = z * 0.88 * k
      if (y < -0.3) y *= 0.72
      x = side * 0.5 + x
      if (side * x < 0.05) x = side * (0.05 + rnd() * 0.03)
      nodes.push({ x, y, z, flash: 0, human: rnd() < 0.09, sx: 0, sy: 0, sz: 0 })
    }

    const edges = []
    const seen = new Set()
    for (let i = 0; i < N; i++) {
      const a = nodes[i]
      const near = []
      for (let j = 0; j < N; j++) {
        if (i === j) continue
        const b = nodes[j]
        const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2
        near.push([d, j])
      }
      near.sort((p, q) => p[0] - q[0])
      for (let k = 0; k < 3; k++) {
        const [d, j] = near[k]
        if (d > 0.05) continue
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) continue
        seen.add(key)
        edges.push([i, j])
      }
    }

    const pulses = []
    const mouse = { x: 0, y: 0, px: -999, py: -999 }
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let last = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduced) frame(performance.now())
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.px = e.clientX - r.left
      mouse.py = e.clientY - r.top
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    let ax = 0
    let ay = 0
    function frame(now) {
      const dt = Math.min(48, now - last)
      last = now
      ctx.clearRect(0, 0, w, h)

      const wide = w >= 1024
      const cx = wide ? w * 0.7 : w * 0.5
      const cy = wide ? h * 0.47 : h * 0.4
      const R = wide ? Math.min(w * 0.2, h * 0.42) : Math.min(w * 0.62, h * 0.3)

      ay += reduced ? 0 : dt
      const tx = mouse.x * 0.45
      const ty = mouse.y * 0.28
      const rotY = 1.35 + (reduced ? 0 : Math.sin(ay * 0.00032) * 0.75) + tx
      const rotX = -0.12 + ty
      const cY = Math.cos(rotY), sY = Math.sin(rotY)
      const cX = Math.cos(rotX), sX = Math.sin(rotX)

      for (const n of nodes) {
        let x = n.x * cY + n.z * sY
        let z = -n.x * sY + n.z * cY
        const y = n.y * cX - z * sX
        z = n.y * sX + z * cX
        const p = 3 / (3 - z)
        n.sx = cx + x * R * p
        n.sy = cy + y * R * p
        n.sz = z
        n.p = p
        if (n.flash > 0) n.flash = Math.max(0, n.flash - dt * 0.0016)
        const dx = n.sx - mouse.px
        const dy = n.sy - mouse.py
        const d = Math.hypot(dx, dy)
        if (d < 110) n.flash = Math.max(n.flash, 1 - d / 110)
      }

      ctx.globalCompositeOperation = 'lighter'
      ctx.lineWidth = 1
      for (const [i, j] of edges) {
        const a = nodes[i]
        const b = nodes[j]
        const depth = (a.sz + b.sz) * 0.5 + 1
        const boost = Math.max(a.flash, b.flash)
        const alpha = 0.05 + depth * 0.09 + boost * 0.5
        ctx.strokeStyle = `rgba(80,200,255,${alpha})`
        ctx.beginPath()
        ctx.moveTo(a.sx, a.sy)
        ctx.lineTo(b.sx, b.sy)
        ctx.stroke()
      }

      if (!reduced) {
        if (pulses.length < (mobile ? 9 : 18) && Math.random() < 0.18) {
          pulses.push({ e: edges[(Math.random() * edges.length) | 0], t: 0, v: 0.0009 + Math.random() * 0.0012, rev: Math.random() < 0.5 })
        }
        for (let k = pulses.length - 1; k >= 0; k--) {
          const pu = pulses[k]
          pu.t += dt * pu.v * 3
          if (pu.t >= 1) {
            const end = nodes[pu.rev ? pu.e[0] : pu.e[1]]
            end.flash = 1
            // propaga para uma aresta vizinha (efeito de sinapse em cadeia)
            if (Math.random() < 0.55) {
              const nb = edges.filter((e) => e[0] === (pu.rev ? pu.e[0] : pu.e[1]) || e[1] === (pu.rev ? pu.e[0] : pu.e[1]))
              if (nb.length) pulses.push({ e: nb[(Math.random() * nb.length) | 0], t: 0, v: pu.v, rev: Math.random() < 0.5 })
            }
            pulses.splice(k, 1)
            continue
          }
          const a = nodes[pu.e[pu.rev ? 1 : 0]]
          const b = nodes[pu.e[pu.rev ? 0 : 1]]
          const x = a.sx + (b.sx - a.sx) * pu.t
          const y = a.sy + (b.sy - a.sy) * pu.t
          const g = ctx.createRadialGradient(x, y, 0, x, y, 9)
          g.addColorStop(0, 'rgba(255,255,255,0.95)')
          g.addColorStop(0.3, 'rgba(34,229,255,0.6)')
          g.addColorStop(1, 'rgba(34,229,255,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(x, y, 9, 0, 6.2832)
          ctx.fill()
        }
      }

      for (const n of nodes) {
        const depth = (n.sz + 1) / 2
        const r = (0.9 + depth * 1.7) * n.p + n.flash * 3.2
        const col = n.human ? '255,181,71' : '34,229,255'
        const a = 0.35 + depth * 0.55 + n.flash * 0.4
        if (n.human || n.flash > 0.25) {
          ctx.fillStyle = `rgba(${col},${0.12 + n.flash * 0.25})`
          ctx.beginPath()
          ctx.arc(n.sx, n.sy, r * 4, 0, 6.2832)
          ctx.fill()
        }
        ctx.fillStyle = `rgba(${col},${Math.min(1, a)})`
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, r, 0, 6.2832)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = (now) => {
      if (visible) frame(now)
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className={`w-full h-full block ${className}`} aria-hidden="true" />
}
