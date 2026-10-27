import { motion } from "framer-motion"

// Sparkline mini chart
function Sparkline({ data, color }) {
  if (!data || data.length < 2) return null
  const max  = Math.max(...data)
  const min  = Math.min(...data)
  const range= max - min || 1
  const W = 64, H = 24
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * H}`).join(" ")
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" opacity={0.8} />
    </svg>
  )
}

function KPICard({ icon, label, value, sub, color, spark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, borderColor: "rgba(244, 185, 66, 0.4)", boxShadow: "0 6px 20px rgba(0,0,0,0.25)" }}
      transition={{ duration: 0.2 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 14px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        border: "1px solid var(--glass-border)",
        borderRadius: 12,
        minWidth: 130,
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9.5, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 750 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: color || "var(--text-primary)", letterSpacing: -0.5, lineHeight: 1.2, fontFamily: "JetBrains Mono, monospace" }}>
          {value}
        </div>
        {sub && <div style={{ fontSize: 9.5, color: "var(--text-muted)", marginTop: 1, fontFamily: "JetBrains Mono, monospace" }}>{sub}</div>}
      </div>
      {spark && (
        <div style={{ opacity: 0.65 }}>
          <Sparkline data={spark} color={color || "var(--text-primary)"} />
        </div>
      )}
    </motion.div>
  )
}

export default function KPIBar({ kpis }) {
  const cards = [
    { icon: "👥", label: "Active Users",   value: kpis.users.toLocaleString(),         color: "#22C55E", sub: `of ${kpis.total}` },
    { icon: "📈", label: "Adoption Rate",  value: `${kpis.adoptionRate}%`,             color: "#F4B942" },
    { icon: "👁",  label: "Awareness Rate", value: `${kpis.awarenessRate}%`,            color: "#8B5CF6" },
    { icon: "💸", label: "Churn Rate",     value: `${kpis.churnRate}%`,               color: "#FF6B6B" },
    { icon: "💡", label: "Considering",    value: kpis.considering.toLocaleString(),   color: "#8B5CF6" },
    { icon: "💰", label: "Avg Budget",     value: `₹${kpis.avgBudget.toLocaleString()}`, color: "#FFD36B" },
    { icon: "⚡", label: "Avg Influence",  value: kpis.avgInfluence,                  color: "var(--text-primary)" },
    { icon: "😴", label: "Dormant",        value: kpis.dormant.toLocaleString(),       color: "#ACB8CC" },
  ]

  return (
    <div style={{
      display: "flex", gap: 8,
      margin: "0 16px 8px",
      padding: "6px 12px",
      overflowX: "auto",
      background: "var(--glass-bg)",
      backdropFilter: "blur(16px)",
      border: "1px solid var(--glass-border)",
      borderRadius: 12,
      scrollbarWidth: "none",
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
    }}>
      {cards.map((c) => (
        <KPICard key={c.label} {...c} />
      ))}
    </div>
  )
}
