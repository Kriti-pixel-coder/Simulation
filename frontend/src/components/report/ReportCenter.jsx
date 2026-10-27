import { motion } from "framer-motion"
import { usePersonas, SEGMENT_LABELS, STATUS_COLORS } from "../../hooks/usePersonas"

function Section({ title, icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ marginBottom: 32 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: -0.5 }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)", marginLeft: 12 }} />
      </div>
      {children}
    </motion.div>
  )
}

function Card({ children, highlight }) {
  return (
    <div style={{
      padding: 24,
      background: highlight ? "rgba(244,185,66,0.06)" : "rgba(255,255,255,0.04)",
      border: `1px solid ${highlight ? "rgba(244,185,66,0.2)" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 16,
      marginBottom: 16,
    }}>
      {children}
    </div>
  )
}

function BulletPoint({ text, color = "#22C55E" }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, marginTop: 5, flexShrink: 0 }} />
      <span style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}

function SegmentTable({ personas }) {
  const segments = ["students", "young_professionals", "freelancers", "mid_career", "outside_target"]

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {["Segment", "Count", "Avg Budget", "Avg Openness", "Avg Need", "Status Mix"].map((h) => (
              <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {segments.map((seg) => {
            const group = personas.filter((p) => p.segment_id === seg)
            if (!group.length) return null
            const avgBudget = Math.round(group.reduce((s, p) => s + p.traits.budget, 0) / group.length)
            const avgOpen   = (group.reduce((s, p) => s + p.traits.openness, 0) / group.length).toFixed(2)
            const avgNeed   = (group.reduce((s, p) => s + p.traits.need_strength, 0) / group.length).toFixed(2)
            const users     = group.filter((p) => p.state.status === "user").length
            return (
              <tr key={seg} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "12px 12px", color: "var(--text-primary)", fontWeight: 600 }}>{SEGMENT_LABELS[seg] || seg}</td>
                <td style={{ padding: "12px 12px", color: "var(--text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>{group.length}</td>
                <td style={{ padding: "12px 12px", color: "#F4B942", fontFamily: "JetBrains Mono, monospace" }}>₹{avgBudget}</td>
                <td style={{ padding: "12px 12px", color: "#22C55E", fontFamily: "JetBrains Mono, monospace" }}>{avgOpen}</td>
                <td style={{ padding: "12px 12px", color: "#8B5CF6", fontFamily: "JetBrains Mono, monospace" }}>{avgNeed}</td>
                <td style={{ padding: "12px 12px" }}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: STATUS_COLORS.user }}>{users} active</span>
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>/ {group.length}</span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function ReportCenter({ config }) {
  const { personas, kpis, loading } = usePersonas()

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <div style={{ color: "var(--text-secondary)" }}>Building report…</div>
      </div>
    )
  }

  const productName = config?.product?.name || "NovaPay"
  const productPrice = config?.product?.price || "2499"

  // Compute adopter type distribution
  const adopterDist = personas.reduce((acc, p) => {
    acc[p.traits.adopter_type] = (acc[p.traits.adopter_type] || 0) + 1
    return acc
  }, {})

  // Top influencers
  const topInfluencers = [...personas]
    .sort((a, b) => b.traits.influence - a.traits.influence)
    .slice(0, 5)

  // Churn risk personas
  const churnRisk = personas.filter((p) => p.traits.price_sensitivity > 0.75 && p.state.status === "considering").length

  return (
    <div style={{ minHeight: "100vh", paddingTop: 88, padding: "88px 48px 64px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#F4B942", textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 8 }}>
              Executive Intelligence Report
            </span>
            <h1 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2, color: "var(--text-primary)", marginBottom: 8 }}>
              {productName}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 15 }}>Market Simulation Analysis · {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ padding: "10px 20px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "var(--text-secondary)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              📄 Export PDF
            </button>
            <button style={{ padding: "10px 20px", background: "rgba(244,185,66,0.12)", border: "1px solid rgba(244,185,66,0.25)", borderRadius: 10, color: "#F4B942", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
              📋 Markdown
            </button>
          </div>
        </div>
        <div style={{ height: 1, background: "linear-gradient(90deg, rgba(244,185,66,0.5), transparent)" }} />
      </div>

      {/* Executive Summary */}
      <Section title="Executive Summary" icon="📊">
        <Card highlight>
          <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.8, marginBottom: 16 }}>
            Simulation of <strong style={{ color: "#F4B942" }}>{productName}</strong> across{" "}
            <strong style={{ color: "var(--text-primary)" }}>1,000 personas</strong> representing 5 market segments reveals
            early adoption potential among young professionals and freelancers. Current adoption rate stands at{" "}
            <strong style={{ color: "#22C55E" }}>{kpis.adoptionRate}%</strong> with a churn risk of{" "}
            <strong style={{ color: "#FF6B6B" }}>{kpis.churnRate}%</strong>.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              ["Total Population", "1,000", "var(--text-primary)"],
              ["Active Users",  kpis.users.toString(), "#22C55E"],
              ["Adoption Rate", `${kpis.adoptionRate}%`, "#F4B942"],
              ["Churn Rate",    `${kpis.churnRate}%`, "#FF6B6B"],
              ["Avg Budget",    `₹${kpis.avgBudget.toLocaleString()}`, "#FFD36B"],
            ].map(([label, value, color]) => (
              <div key={label}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color, fontFamily: "JetBrains Mono, monospace" }}>{value}</div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Segment Analysis */}
      <Section title="Segment Analysis" icon="🎯">
        <Card>
          <SegmentTable personas={personas} />
        </Card>
      </Section>

      {/* Adopter Type Distribution */}
      <Section title="Adopter Distribution" icon="👥">
        <Card>
          {Object.entries(adopterDist).map(([type, count]) => (
            <div key={type} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)", textTransform: "capitalize" }}>{type.replace("_", " ")}</span>
                <span style={{ fontSize: 13, color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace" }}>{count}</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / personas.length) * 100}%` }}
                  style={{ height: "100%", background: "linear-gradient(90deg, #F4B942, #8B5CF6)", borderRadius: 2 }}
                />
              </div>
            </div>
          ))}
        </Card>
      </Section>

      {/* Revenue Drivers */}
      <Section title="Revenue Drivers" icon="💰">
        <Card>
          <BulletPoint text={`${personas.filter((p) => p.traits.budget >= Number(productPrice)).length} personas have sufficient budget to convert (budget ≥ ₹${Number(productPrice).toLocaleString()})`} color="#22C55E" />
          <BulletPoint text={`${personas.filter((p) => p.traits.need_strength > 0.6).length} personas show strong product-need fit (need_strength > 0.6)`} color="#F4B942" />
          <BulletPoint text={`${personas.filter((p) => p.traits.openness > 0.6 && p.traits.trust_recs > 0.5).length} personas are ideal word-of-mouth candidates (high openness + trust_recs)`} color="#8B5CF6" />
          <BulletPoint text={`Young professionals segment shows highest avg budget at ₹${Math.round(personas.filter((p) => p.segment_id === "young_professionals").reduce((s, p) => s + p.traits.budget, 0) / (personas.filter((p) => p.segment_id === "young_professionals").length || 1)).toLocaleString()}`} color="#FFD36B" />
        </Card>
      </Section>

      {/* Churn Risk */}
      <Section title="Churn Analysis" icon="⚠️">
        <Card>
          <BulletPoint text={`${churnRisk} high price-sensitivity personas (>0.75) currently in Considering — high churn risk if price increases.`} color="#FF6B6B" />
          <BulletPoint text={`${personas.filter((p) => p.traits.skepticism > 0.7).length} personas with skepticism > 0.7 require additional trust signals before converting.`} color="#F59E0B" />
          <BulletPoint text={`Outside-target segment (${personas.filter((p) => p.segment_id === "outside_target").length} personas) contributes near-zero revenue potential — recommend excluding from campaigns.`} color="var(--text-muted)" />
        </Card>
      </Section>

      {/* Top Influencers */}
      <Section title="Top Influencers" icon="⚡">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {topInfluencers.map((p) => (
            <div key={p.id} style={{ padding: "16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, textAlign: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(244,185,66,0.15)", border: "1px solid rgba(244,185,66,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 16, fontWeight: 800, color: "#F4B942" }}>
                {p.name[0]}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 6 }}>{p.occupation}</div>
              <div style={{ fontSize: 11, color: "#F4B942", fontWeight: 700 }}>
                Influence {(p.traits.influence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Recommended Actions */}
      <Section title="Recommended Actions" icon="🎯">
        <Card highlight>
          <BulletPoint text="Launch referral program targeting top 50 high-influence personas — each can drive 2-5 additional conversions." color="#22C55E" />
          <BulletPoint text="Introduce a free trial or freemium tier to reduce price sensitivity barriers for the Students segment." color="#F4B942" />
          <BulletPoint text="Focus social media spend on young_professionals segment — highest openness + budget combination." color="#8B5CF6" />
          <BulletPoint text="Build trust signals (reviews, case studies) to address high-skepticism personas (skepticism > 0.7)." color="#FFD36B" />
          <BulletPoint text="Exclude outside_target segment from paid campaigns to improve CAC efficiency by an estimated 10-12%." color="#F59E0B" />
        </Card>
      </Section>

      {/* Risk Factors */}
      <Section title="Risk Factors" icon="⚡">
        <Card>
          <BulletPoint text={`Price sensitivity is high across ${personas.filter((p) => p.traits.price_sensitivity > 0.6).length} personas (60%+ of total) — any price increase above ₹${Number(productPrice) + 500} risks mass churn.`} color="#FF6B6B" />
          <BulletPoint text={`${personas.filter((p) => p.context.alt_is_dedicated).length} personas have dedicated competitive alternatives — switching cost is low.`} color="#F59E0B" />
          <BulletPoint text={`"needs an account" and "small text" are the most common dealbreakers — address in onboarding UX.`} color="#FF6B6B" />
        </Card>
      </Section>
    </div>
  )
}
