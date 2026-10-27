import { motion } from "framer-motion"

const CHANNELS = ["Social", "Search", "Ads", "App Store", "Referral"]
const CHANNEL_COLORS = {
  Social: "#F4B942",
  Search: "#22C55E",
  Ads: "#FF6B6B",
  "App Store": "#8B5CF6",
  Referral: "var(--text-primary)",
}
const CHANNEL_ICONS = {
  Social: "📱",
  Search: "🔍",
  Ads: "📢",
  "App Store": "🏪",
  Referral: "🔗",
}

export default function GTMStep({ data, onChange }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0)

  const handleSlider = (key, val) => {
    const parsed = Number(val)
    const diff   = parsed - data[key]
    const others = CHANNELS.filter((k) => k !== key)
    const otherTotal = others.reduce((s, k) => s + data[k], 0)
    const newData = { ...data, [key]: parsed }
    if (otherTotal > 0) {
      others.forEach((k) => {
        newData[k] = Math.max(0, Math.round(data[k] - diff * (data[k] / otherTotal)))
      })
    }
    // Normalise
    const newTot = Object.values(newData).reduce((s, v) => s + v, 0)
    if (newTot !== 100) {
      const lastKey = others.at(-1)
      if (lastKey) newData[lastKey] = Math.max(0, newData[lastKey] + (100 - newTot))
    }
    onChange(newData)
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
      {/* Left: Sliders */}
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8, color: "var(--text-primary)" }}>
          Go-To-Market Strategy
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: 15 }}>
          Allocate your marketing budget across channels. Total must equal 100%.
        </p>

        {CHANNELS.map((ch) => (
          <div key={ch} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{CHANNEL_ICONS[ch]}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{ch}</span>
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: CHANNEL_COLORS[ch], fontFamily: "JetBrains Mono, monospace" }}>
                {data[ch]}%
              </span>
            </div>
            <input
              type="range" min={0} max={80} value={data[ch]}
              onChange={(e) => handleSlider(ch, e.target.value)}
              style={{ width: "100%", accentColor: CHANNEL_COLORS[ch], cursor: "pointer" }}
            />
          </div>
        ))}

        <div style={{
          padding: "12px 16px",
          background: total === 100 ? "rgba(34,197,94,0.08)" : "rgba(255,107,107,0.08)",
          border: `1px solid ${total === 100 ? "rgba(34,197,94,0.2)" : "rgba(255,107,107,0.2)"}`,
          borderRadius: 10,
          display: "flex", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Total Allocation</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: total === 100 ? "#22C55E" : "#FF6B6B", fontFamily: "JetBrains Mono, monospace" }}>
            {total}%
          </span>
        </div>
      </div>

      {/* Right: Visual budget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          position: "sticky", top: 100,
          padding: 32,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F4B942", marginBottom: 24, display: "block" }}>
          Budget Allocation Preview
        </span>

        {/* Stacked bar */}
        <div style={{ height: 24, borderRadius: 12, overflow: "hidden", display: "flex", marginBottom: 20 }}>
          {CHANNELS.map((ch) => (
            <motion.div
              key={ch}
              animate={{ flex: data[ch] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ background: CHANNEL_COLORS[ch], opacity: 0.85, position: "relative" }}
              title={`${ch}: ${data[ch]}%`}
            />
          ))}
        </div>

        {/* Legend */}
        {CHANNELS.map((ch) => (
          <div key={ch} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: CHANNEL_COLORS[ch] }} />
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{ch}</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: CHANNEL_COLORS[ch] }}>{data[ch]}%</span>
          </div>
        ))}

        <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(244,185,66,0.07)", border: "1px solid rgba(244,185,66,0.15)", borderRadius: 12 }}>
          <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight: 700 }}>Top Channel</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#F4B942" }}>
            {CHANNELS.reduce((a, b) => data[a] > data[b] ? a : b)} · {Math.max(...Object.values(data))}%
          </div>
        </div>
      </motion.div>
    </div>
  )
}
