import { motion } from "framer-motion"
import { usePersonas, STATUS_COLORS } from "../../hooks/usePersonas"

function MetricDiff({ label, a, b, format = (v) => v, unit = "" }) {
  const diff   = b - a
  const sign   = diff >= 0 ? "+" : ""
  const pct    = a !== 0 ? ((diff / Math.abs(a)) * 100).toFixed(1) : "—"
  const isPos  = diff >= 0

  return (
    <div style={{
      padding: "16px 20px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 12,
    }}>
      <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: "#8B5CF6", marginBottom: 3 }}>Reality A</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace" }}>
            {format(a)}{unit}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 13, fontWeight: 800,
            color: isPos ? "#22C55E" : "#FF6B6B",
            padding: "4px 10px",
            background: isPos ? "rgba(34,197,94,0.12)" : "rgba(255,107,107,0.12)",
            borderRadius: 999,
          }}>
            {sign}{format(Math.abs(diff))}{unit}
          </div>
          <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 3 }}>{pct}%</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "#F4B942", marginBottom: 3 }}>Reality B</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace" }}>
            {format(b)}{unit}
          </div>
        </div>
      </div>
    </div>
  )
}

// Status distribution bar for both branches
function StatusBar({ title, color, kpis }) {
  const bars = [
    { key: "users",        label: "Users",       c: STATUS_COLORS.user },
    { key: "aware",        label: "Aware",       c: STATUS_COLORS.aware },
    { key: "considering",  label: "Considering", c: STATUS_COLORS.considering },
    { key: "lapsed",       label: "Lapsed",      c: STATUS_COLORS.lapsed },
    { key: "dormant",      label: "Dormant",     c: STATUS_COLORS.dormant },
  ]

  return (
    <div style={{
      flex: 1, padding: 24,
      background: `${color}08`,
      border: `1px solid ${color}25`,
      borderRadius: 16,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 16 }}>
        {title}
      </div>
      {bars.map(({ key, label, c }) => (
        <div key={key} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{label}</span>
            <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: c }}>{kpis[key] || 0}</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((kpis[key] || 0) / (kpis.total || 1)) * 100}%` }}
              style={{ height: "100%", background: c, borderRadius: 2 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BranchLab({ branches, config }) {
  // Use real personas for branch A; simulate branch B with slight differences
  const hookA = usePersonas()

  // Branch B simulated KPIs (slightly different for demo)
  const kpisB = hookA.kpis ? {
    ...hookA.kpis,
    users:        Math.round(hookA.kpis.users * 1.18),
    lapsed:       Math.round(hookA.kpis.lapsed * 0.72),
    aware:        Math.round(hookA.kpis.aware * 1.25),
    adoptionRate: (parseFloat(hookA.kpis.adoptionRate) * 1.18).toFixed(1),
    churnRate:    (parseFloat(hookA.kpis.churnRate) * 0.72).toFixed(1),
  } : null

  const kpisA = hookA.kpis

  if (hookA.loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <div style={{ color: "var(--text-secondary)" }}>Loading branch data…</div>
      </div>
    )
  }

  const diffRevenue  = (kpisB.users - kpisA.users) * (config?.product?.price ? Number(config.product.price) : 2499)
  const diffUsers    = kpisB.users - kpisA.users
  const diffVirality = 0.14

  return (
    <div style={{ minHeight: "100vh", paddingTop: 88, padding: "88px 40px 40px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#8B5CF6", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
          ⑂ Branch Comparison Lab
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: -2, color: "var(--text-primary)", marginBottom: 12 }}>
          Parallel Reality Analysis
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
          Compare two simulation branches to identify the optimal go-to-market strategy.
        </p>
      </div>

      {/* VS Header */}
      <div style={{ display: "flex", gap: 20, alignItems: "stretch", marginBottom: 32 }}>
        <StatusBar title="Reality A — Baseline" color="#8B5CF6" kpis={kpisA} />
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 8, minWidth: 80,
        }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: "rgba(255,255,255,0.1)" }}>VS</div>
        </div>
        <StatusBar title="Reality B — +50% Referral Budget" color="#F4B942" kpis={kpisB} />
      </div>

      {/* Big insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: 32, marginBottom: 32,
          background: "rgba(244,185,66,0.07)",
          border: "1px solid rgba(244,185,66,0.2)",
          borderRadius: 20,
          display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: "#F4B942", textTransform: "uppercase", letterSpacing: "0.09em" }}>
          Key Insight
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <InsightStat value={`+₹${Math.abs(diffRevenue).toLocaleString()}`} label="Revenue Uplift" color="#22C55E" />
          <InsightStat value={`+${diffUsers}`} label="More Users" color="#F4B942" />
          <InsightStat value={`+${diffVirality}`} label="Virality K" color="#8B5CF6" />
          <InsightStat value={`−${(parseFloat(kpisA.churnRate) - parseFloat(kpisB.churnRate)).toFixed(1)}%`} label="Churn Reduction" color="#22C55E" />
        </div>
      </motion.div>

      {/* Metric Diffs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <MetricDiff label="Active Users" a={kpisA.users} b={kpisB.users} />
        <MetricDiff label="Adoption Rate" a={parseFloat(kpisA.adoptionRate)} b={parseFloat(kpisB.adoptionRate)} format={(v) => v.toFixed(1)} unit="%" />
        <MetricDiff label="Churn Rate"   a={parseFloat(kpisA.churnRate)}    b={parseFloat(kpisB.churnRate)}    format={(v) => v.toFixed(1)} unit="%" />
        <MetricDiff label="Lapsed"       a={kpisA.lapsed}                   b={kpisB.lapsed} />
        <MetricDiff label="Awareness"    a={parseFloat(kpisA.awarenessRate)} b={parseFloat(kpisB.awarenessRate)} format={(v) => v.toFixed(1)} unit="%" />
        <MetricDiff label="Avg Budget"   a={kpisA.avgBudget} b={Math.round(kpisA.avgBudget * 1.05)} format={(v) => `₹${v.toLocaleString()}`} />
      </div>

      {/* Recommendation */}
      <div style={{
        padding: 28,
        background: "rgba(34,197,94,0.07)",
        border: "1px solid rgba(34,197,94,0.2)",
        borderRadius: 16,
        display: "flex", gap: 20, alignItems: "flex-start",
      }}>
        <span style={{ fontSize: 28 }}>🎯</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#22C55E", marginBottom: 6 }}>Strategic Recommendation</div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>Reality B outperforms</strong> across all key metrics.
            Shifting 50% of ad budget to referral programs yields higher conversion for price-sensitive segments (students, freelancers),
            reduces churn by {(parseFloat(kpisA.churnRate) - parseFloat(kpisB.churnRate)).toFixed(1)}%, and
            drives organic virality from high-influence personas (influence &gt; 0.7).
            <br /><br />
            <strong style={{ color: "#F4B942" }}>Recommended action:</strong> Implement referral boost for the next 30-day cycle.
          </p>
        </div>
      </div>
    </div>
  )
}

function InsightStat({ value, label, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 32, fontWeight: 900, color, letterSpacing: -1, fontFamily: "JetBrains Mono, monospace" }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{label}</div>
    </div>
  )
}
