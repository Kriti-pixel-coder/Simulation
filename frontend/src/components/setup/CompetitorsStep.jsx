import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const COLORS = ["#8B5CF6", "#F4B942", "#22C55E", "#FF6B6B", "var(--text-primary)"]

function RadarChart({ strength, color }) {
  const axes = ["Price", "Brand", "Features", "Support", "Growth"]
  const vals = axes.map((_, i) => {
    const seed = strength + i * 13
    return 30 + (seed % 50)
  })
  const cx = 70, cy = 70, r = 55
  const angleStep = (2 * Math.PI) / axes.length

  const points = axes.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2
    const v = vals[i] / 100
    return {
      x: cx + r * v * Math.cos(angle),
      y: cy + r * v * Math.sin(angle),
      gx: cx + r * Math.cos(angle),
      gy: cy + r * Math.sin(angle),
    }
  })

  const polyStr = points.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((frac) => (
        <polygon
          key={frac}
          points={axes.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2
            return `${cx + r * frac * Math.cos(angle)},${cy + r * frac * Math.sin(angle)}`
          }).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      ))}
      {/* Axes */}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.gx} y2={p.gy} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      ))}
      {/* Data polygon */}
      <polygon
        points={polyStr}
        fill={`${color}25`}
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
      ))}
    </svg>
  )
}

function CompetitorCard({ comp, color, onRemove, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.08 }}
      style={{
        padding: 24,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 20,
        alignItems: "start",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}20`, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color }}>{comp.name[0]}</span>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{comp.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{comp.position}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Price</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#F4B942" }}>₹{comp.price}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Strength</div>
            <div style={{ fontSize: 18, fontWeight: 800, color }}>
              {comp.strength}
              <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)" }}>/100</span>
            </div>
          </div>
        </div>

        <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: 12 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${comp.strength}%` }}
            style={{ height: "100%", background: `linear-gradient(90deg, ${color}, ${color}70)`, borderRadius: 2 }}
          />
        </div>

        {comp.notes && (
          <p style={{ fontSize: 12, color: "var(--text-secondary)", fontStyle: "italic" }}>"{comp.notes}"</p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <RadarChart strength={comp.strength} color={color} />
        <button
          onClick={onRemove}
          style={{ padding: "4px 12px", background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 999, color: "#FF6B6B", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
        >
          Remove
        </button>
      </div>
    </motion.div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  color: "var(--text-primary)",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
}

export default function CompetitorsStep({ data, onChange }) {
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ name: "", price: "", strength: 70, position: "Challenger", notes: "" })

  const add = () => {
    if (!draft.name) return
    onChange([...data, { ...draft }])
    setDraft({ name: "", price: "", strength: 70, position: "Challenger", notes: "" })
    setAdding(false)
  }

  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8, color: "var(--text-primary)" }}>
            Competitor Intelligence
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
            Map your competitive landscape with precision.
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #F4B942, #FFD36B)",
            border: "none",
            borderRadius: 999,
            color: "#261232",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          + Add Competitor
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              padding: 24,
              background: "rgba(244,185,66,0.06)",
              border: "1px solid rgba(244,185,66,0.2)",
              borderRadius: 16,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#F4B942", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              New Competitor
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
              <input style={inputStyle} placeholder="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              <input style={inputStyle} placeholder="Price (₹)" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
              <select style={{ ...inputStyle, cursor: "pointer" }} value={draft.position} onChange={(e) => setDraft({ ...draft, position: e.target.value })}>
                {["Market Leader", "Challenger", "Niche", "Premium Segment", "Budget Option"].map((p) => (
                  <option key={p} style={{ background: "#3A1E4A" }}>{p}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, display: "block", marginBottom: 6 }}>
                Strength Score: {draft.strength}
              </label>
              <input type="range" min={10} max={100} value={draft.strength} onChange={(e) => setDraft({ ...draft, strength: Number(e.target.value) })} style={{ width: "100%", accentColor: "#F4B942" }} />
            </div>
            <input style={{ ...inputStyle, marginBottom: 16 }} placeholder="Strategic notes..." value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={add} style={{ padding: "10px 24px", background: "#F4B942", border: "none", borderRadius: 999, color: "#261232", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>
                Add
              </button>
              <button onClick={() => setAdding(false)} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, color: "var(--text-secondary)", cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 20 }}>
        <AnimatePresence>
          {data.map((comp, i) => (
            <CompetitorCard key={comp.name + i} comp={comp} color={COLORS[i % COLORS.length]} onRemove={() => remove(i)} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
