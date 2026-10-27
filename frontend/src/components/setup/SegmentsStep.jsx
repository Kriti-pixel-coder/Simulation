import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SEGMENT_COLORS = {
  Students: "#8B5CF6",
  Professionals: "#F4B942",
  Founders: "#22C55E",
  Enterprises: "var(--text-primary)",
  Others: "var(--text-muted)",
}

function MarketWheel({ segments }) {
  const canvasRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  const keys = Object.keys(segments)
  const total = Object.values(segments).reduce((a, b) => a + b, 0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const r = Math.min(cx, cy) - 20

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let startAngle = -Math.PI / 2
    keys.forEach((key) => {
      const pct = segments[key] / total
      const endAngle = startAngle + pct * 2 * Math.PI
      const color = SEGMENT_COLORS[key] || "#888"
      const isHovered = hovered === key

      // Slice
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, isHovered ? r + 8 : r, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = isHovered ? 1 : 0.8
      ctx.shadowBlur = isHovered ? 24 : 8
      ctx.shadowColor = color
      ctx.fill()
      ctx.restore()

      // Gap line
      ctx.save()
      ctx.strokeStyle = "rgba(38,18,50,0.9)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + r * Math.cos(startAngle), cy + r * Math.sin(startAngle))
      ctx.stroke()
      ctx.restore()

      // Label
      const midAngle = startAngle + (pct * 2 * Math.PI) / 2
      if (pct > 0.06) {
        const lx = cx + (r * 0.65) * Math.cos(midAngle)
        const ly = cy + (r * 0.65) * Math.sin(midAngle)
        ctx.save()
        ctx.fillStyle = "#fff"
        ctx.font = "bold 11px Inter, sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(key, lx, ly)
        ctx.fillStyle = "rgba(255,255,255,0.7)"
        ctx.font = "600 10px Inter, sans-serif"
        ctx.fillText(`${segments[key]}%`, lx, ly + 14)
        ctx.restore()
      }

      startAngle = endAngle
    })

    // Center circle
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(38,18,50,0.95)"
    ctx.fill()
    ctx.restore()

    // Center text
    ctx.fillStyle = "var(--text-primary)"
    ctx.font = "bold 24px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("100%", cx, cy - 8)
    ctx.fillStyle = "var(--text-muted)"
    ctx.font = "600 10px Inter, sans-serif"
    ctx.fillText("Coverage", cx, cy + 14)
  }, [segments, hovered])

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const r = Math.min(cx, cy) - 20

    const mx = (e.clientX - rect.left) * (canvas.width / rect.width)
    const my = (e.clientY - rect.top) * (canvas.height / rect.height)
    const dx = mx - cx
    const dy = my - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > r * 0.35 && dist < r + 10) {
      let angle = Math.atan2(dy, dx) + Math.PI / 2
      if (angle < 0) angle += Math.PI * 2

      let startAngle = 0
      for (const key of keys) {
        const pct = segments[key] / total
        const slice = pct * 2 * Math.PI
        if (angle >= startAngle && angle < startAngle + slice) {
          setHovered(key)
          return
        }
        startAngle += slice
      }
    }
    setHovered(null)
  }

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: "pointer" }}
      />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "absolute",
              top: 8,
              right: -120,
              padding: "10px 14px",
              background: "rgba(58,30,74,0.95)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${SEGMENT_COLORS[hovered]}40`,
              borderRadius: 10,
              minWidth: 110,
            }}
          >
            <div style={{ fontSize: 12, color: SEGMENT_COLORS[hovered], fontWeight: 700 }}>{hovered}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>{segments[hovered]}%</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SegmentsStep({ data, onChange }) {
  const handleSlider = (key, val) => {
    const parsed = Number(val)
    const others = Object.entries(data).filter(([k]) => k !== key)
    const otherTotal = others.reduce((a, [, v]) => a + v, 0)
    const diff = parsed - data[key]
    const newData = { ...data, [key]: parsed }
    if (otherTotal > 0) {
      others.forEach(([k, v]) => {
        newData[k] = Math.max(0, Math.round(v - diff * (v / otherTotal)))
      })
    }
    // Normalize to 100
    const newTotal = Object.values(newData).reduce((a, b) => a + b, 0)
    if (newTotal !== 100) {
      const delta = 100 - newTotal
      const lastKey = Object.keys(newData).filter((k) => k !== key).at(-1)
      if (lastKey) newData[lastKey] = Math.max(0, newData[lastKey] + delta)
    }
    onChange(newData)
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
      {/* Left: Sliders */}
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8, color: "var(--text-primary)" }}>
          Market Segments
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: 15 }}>
          Define how your total addressable market is distributed across segments.
        </p>

        {Object.entries(data).map(([key, val]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ marginBottom: 24 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: SEGMENT_COLORS[key], boxShadow: `0 0 8px ${SEGMENT_COLORS[key]}80` }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{key}</span>
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: SEGMENT_COLORS[key], fontFamily: "JetBrains Mono, monospace" }}>
                {val}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={80}
              value={val}
              onChange={(e) => handleSlider(key, e.target.value)}
              style={{
                width: "100%",
                accentColor: SEGMENT_COLORS[key],
                height: 6,
                cursor: "pointer",
              }}
            />
            <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <motion.div
                animate={{ width: `${val}%` }}
                style={{ height: "100%", background: `linear-gradient(90deg, ${SEGMENT_COLORS[key]}, ${SEGMENT_COLORS[key]}80)`, borderRadius: 2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right: Wheel */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "sticky",
        top: 100,
        padding: 32,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F4B942", marginBottom: 24 }}>
          Market Share Distribution
        </span>
        <MarketWheel segments={data} onChange={onChange} />
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 20, textAlign: "center" }}>
          Hover slices to inspect · Drag sliders to adjust
        </p>
      </div>
    </div>
  )
}
