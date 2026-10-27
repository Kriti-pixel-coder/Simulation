import { useEffect, useRef, useCallback } from "react"
import { STATUS_COLORS } from "../../hooks/usePersonas"

const ADOPTER_SIZE = {
  innovator:       9,
  early_adopter:   7,
  early_majority:  5,
  late_majority:   4,
  laggard:         3,
}

export default function MarketNetwork({ personas, onSelect, selected, simStatus }) {
  const canvasRef   = useRef(null)
  const posRef      = useRef({})   // { id: {x, y, vx, vy} }
  const animRef     = useRef(null)
  const particlesRef= useRef([])

  // Initialise positions once personas load
  useEffect(() => {
    if (!personas.length) return
    personas.forEach((p) => {
      if (!posRef.current[p.id]) {
        posRef.current[p.id] = {
          x:  0.1 + Math.random() * 0.8,
          y:  0.1 + Math.random() * 0.8,
          vx: (Math.random() - 0.5) * 0.0004,
          vy: (Math.random() - 0.5) * 0.0004,
          pulse: Math.random() * Math.PI * 2,
        }
      }
    })
  }, [personas.length])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const W = canvas.width
    const H = canvas.height

    ctx.clearRect(0, 0, W, H)

    // Update particles
    const pts = particlesRef.current
    for (let i = pts.length - 1; i >= 0; i--) {
      pts[i].t += pts[i].speed
      if (pts[i].t >= 1) { pts.splice(i, 1) }
    }

    // Spawn referral particles occasionally
    if (simStatus === "running" && Math.random() < 0.05 && personas.length > 1) {
      const users = personas.filter((p) => p.state.status === "user")
      if (users.length > 0) {
        const from = users[Math.floor(Math.random() * users.length)]
        const to   = personas[Math.floor(Math.random() * personas.length)]
        if (from.id !== to.id) {
          pts.push({ fromId: from.id, toId: to.id, t: 0, speed: 0.006 + Math.random() * 0.006 })
        }
      }
    }

    // Draw edges (only between near nodes in user / considering state for performance)
    const visibleUsers = personas.filter((p) => p.state.status === "user" || p.state.status === "considering")
    for (let i = 0; i < Math.min(visibleUsers.length, 80); i++) {
      const pi = posRef.current[visibleUsers[i].id]
      if (!pi) continue
      for (let j = i + 1; j < Math.min(visibleUsers.length, 80); j++) {
        const pj = posRef.current[visibleUsers[j].id]
        if (!pj) continue
        const dx = (pi.x - pj.x) * W
        const dy = (pi.y - pj.y) * H
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          const alpha = (1 - dist / 80) * 0.18
          ctx.strokeStyle = `rgba(244,185,66,${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(pi.x * W, pi.y * H)
          ctx.lineTo(pj.x * W, pj.y * H)
          ctx.stroke()
        }
      }
    }

    // Draw referral particles
    pts.forEach((pt) => {
      const fp = posRef.current[pt.fromId]
      const tp = posRef.current[pt.toId]
      if (!fp || !tp) return
      const px = (fp.x + (tp.x - fp.x) * pt.t) * W
      const py = (fp.y + (tp.y - fp.y) * pt.t) * H
      const alpha = Math.sin(pt.t * Math.PI)
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = "#F4B942"
      ctx.shadowBlur = 8
      ctx.shadowColor = "#F4B942"
      ctx.beginPath()
      ctx.arc(px, py, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // Draw personas
    personas.forEach((p) => {
      const pos = posRef.current[p.id]
      if (!pos) return
      pos.pulse += 0.025
      const x = pos.x * W
      const y = pos.y * H
      const r = (ADOPTER_SIZE[p.traits?.adopter_type] || 5)
      const color = STATUS_COLORS[p.state.status] || "#ACB8CC"
      const isSelected = selected && selected.id === p.id

      // Halo for user nodes
      if (p.state.status === "user") {
        ctx.save()
        ctx.globalAlpha = 0.12 + Math.sin(pos.pulse) * 0.06
        ctx.fillStyle = color
        ctx.shadowBlur = 20
        ctx.shadowColor = color
        ctx.beginPath()
        ctx.arc(x, y, r * 3.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // Selection ring
      if (isSelected) {
        ctx.save()
        ctx.strokeStyle = "#FFD36B"
        ctx.lineWidth = 2
        ctx.shadowBlur = 12
        ctx.shadowColor = "#FFD36B"
        ctx.beginPath()
        ctx.arc(x, y, r + 5, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // Node
      ctx.save()
      ctx.fillStyle = color
      ctx.shadowBlur = p.state.status === "dormant" ? 4 : 12
      ctx.shadowColor = color
      const pulseMult = p.state.status === "user" ? 1 + Math.sin(pos.pulse) * 0.15 : 1
      ctx.beginPath()
      ctx.arc(x, y, r * pulseMult, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Move
      if (simStatus === "running") {
        pos.x += pos.vx
        pos.y += pos.vy
        if (pos.x < 0.02 || pos.x > 0.98) pos.vx *= -1
        if (pos.y < 0.02 || pos.y > 0.98) pos.vy *= -1
      }
    })

    animRef.current = requestAnimationFrame(draw)
  }, [personas, selected, simStatus])

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  // Animation loop
  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  // Click to select persona
  const handleClick = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = (e.clientX - rect.left)
    const my = (e.clientY - rect.top)
    let best = null, bestDist = 20

    personas.forEach((p) => {
      const pos = posRef.current[p.id]
      if (!pos) return
      const dx = pos.x * canvas.width  - mx
      const dy = pos.y * canvas.height - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < bestDist) { bestDist = dist; best = p }
    })
    onSelect(best)
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Legend */}
      <div style={{
        position: "absolute", top: 12, left: 12, zIndex: 10,
        display: "flex", gap: 10, flexWrap: "wrap",
        padding: "6px 12px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
        borderRadius: 8,
      }}>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}` }} />
            <span style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 600, textTransform: "capitalize" }}>{status}</span>
          </div>
        ))}
      </div>

      {/* Persona count */}
      <div style={{
        position: "absolute", bottom: 12, left: 12, zIndex: 10,
        padding: "5px 12px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
        borderRadius: 8,
        fontSize: 10.5, color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace",
      }}>
        {personas.length} personas rendered · click to inspect
      </div>

      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ width: "100%", height: "100%", cursor: "crosshair", display: "block" }}
      />
    </div>
  )
}
