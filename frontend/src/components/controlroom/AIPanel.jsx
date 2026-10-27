import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SEGMENT_LABELS } from "../../hooks/usePersonas"

// AI generates insights from real persona data
function generateInsights(kpis, personas) {
  const insights = []

  const students = personas.filter((p) => p.segment_id === "students")
  const studentAdoption = students.length
    ? ((students.filter((p) => p.state.status === "user").length / students.length) * 100).toFixed(1)
    : 0

  const highBudget = personas.filter((p) => p.traits.budget > 1000 && p.state.status === "dormant")
  const highInfluence = personas.filter((p) => p.traits.influence > 0.7 && p.state.status === "user")
  const priceSensitive = personas.filter((p) => p.traits.price_sensitivity > 0.7 && p.state.status === "considering")

  insights.push({
    type: "observation",
    icon: "🎓",
    title: "Student Segment Signal",
    body: `Student adoption at ${studentAdoption}%. ${studentAdoption < 5 ? "Budget mismatch likely — avg student budget ₹" + Math.round(students.reduce((s, p) => s + p.traits.budget, 0) / (students.length || 1)) : "Strong traction forming."}`,
    color: "#F4B942",
  })

  if (highInfluence.length > 0) {
    insights.push({
      type: "momentum",
      icon: "⚡",
      title: "Referral Momentum",
      body: `${highInfluence.length} high-influence users active. Virality potential elevated — consider amplifying referral incentives.`,
      color: "#22C55E",
    })
  }

  if (priceSensitive.length > 10) {
    insights.push({
      type: "risk",
      icon: "⚠️",
      title: "Price Friction Detected",
      body: `${priceSensitive.length} price-sensitive personas stuck in Considering. Lowering entry price or offering a trial may unlock conversion.`,
      color: "#FF6B6B",
    })
  }

  if (highBudget.length > 20) {
    insights.push({
      type: "opportunity",
      icon: "💡",
      title: "Untapped Premium Segment",
      body: `${highBudget.length} high-budget personas still dormant. Targeted premium campaign could drive ₹${(highBudget.length * 2000).toLocaleString()} revenue.`,
      color: "#8B5CF6",
    })
  }

  insights.push({
    type: "suggestion",
    icon: "🎯",
    title: "Suggested Action",
    body: kpis.churnRate > 5
      ? "Churn exceeds 5%. Activate retention campaign targeting lapsed users with re-engagement offers."
      : "Launch referral program — high-trust personas (trust_recs > 0.7) are most likely to refer.",
    color: "#FFD36B",
  })

  return insights
}

function InsightCard({ insight, index }) {
  const typeLabels = {
    observation: "Observation",
    momentum:    "Momentum",
    risk:        "Risk",
    opportunity: "Opportunity",
    suggestion:  "Action",
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        padding: "14px 16px",
        background: `${insight.color}09`,
        border: `1px solid ${insight.color}25`,
        borderRadius: 12,
        marginBottom: 10,
        borderLeft: `3px solid ${insight.color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 14 }}>{insight.icon}</span>
        <span style={{ fontSize: 9, fontWeight: 800, color: insight.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {typeLabels[insight.type]}
        </span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{insight.title}</div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.6 }}>{insight.body}</div>
    </motion.div>
  )
}

// Segment breakdown mini chart
function SegmentBreakdown({ personas }) {
  const counts = personas.reduce((acc, p) => {
    acc[p.segment_id] = (acc[p.segment_id] || 0) + 1
    return acc
  }, {})
  const total = personas.length || 1

  const COLORS = {
    students: "#8B5CF6",
    young_professionals: "#F4B942",
    freelancers: "#22C55E",
    mid_career: "var(--text-primary)",
    outside_target: "var(--text-muted)",
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>
        Segment Coverage
      </div>
      {Object.entries(counts).map(([seg, cnt]) => (
        <div key={seg} style={{ marginBottom: 7 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{SEGMENT_LABELS[seg] || seg}</span>
            <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: COLORS[seg] || "#888" }}>{cnt}</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${(cnt / total) * 100}%` }}
              style={{ height: "100%", background: COLORS[seg] || "#888", borderRadius: 2 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AIPanel({ kpis, personas, day }) {
  const insights = useMemo(() => generateInsights(kpis, personas), [kpis, personas.length])

  return (
    <div style={{
      padding: 16,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      maxHeight: "55%",
      overflowY: "auto",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E", animation: "pulse-ring 2s infinite" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#F4B942", textTransform: "uppercase", letterSpacing: "0.09em" }}>
          AI Market Analyst
        </span>
      </div>

      {/* Segment breakdown from real data */}
      <SegmentBreakdown personas={personas} />

      {/* AI Insights */}
      <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>
        Intelligence Feed — Day {day}
      </div>

      <AnimatePresence mode="popLayout">
        {insights.map((insight, i) => (
          <InsightCard key={insight.title} insight={insight} index={i} />
        ))}
      </AnimatePresence>
    </div>
  )
}
